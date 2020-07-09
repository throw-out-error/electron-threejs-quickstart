import express, { Request, Response } from "express";
import ioserver, { Socket } from "socket.io";
import { World } from "./terrain";
import { Tensor, Vector, chunk } from "@throw-out-error/throw-out-utils";
import { Transform } from "../../common/src/transform";
import { Vector3, Vector2 } from "@math.gl/core";
import { Chunk } from "../../common/src/chunk";

const app = express();
const server = require("http").Server(app);
const io = ioserver(server);
const port = process.env.PORT || 3000;
//object? why not an array?
let players: Map<string, any> = new Map();

app.get("/", (req: Request, res: Response) => {
    res.json({ data: "hello world" });
});

let world = new World();

io.on("connection", (socket: Socket) => {
    socket.emit("news", "hello, world!");
    const playerInfo = { id: socket.id, transform: new Transform() };

    players.set(playerInfo.id, playerInfo);
    io.emit("player-info", playerInfo);
    // Initial chunk
    socket.emit("chunk", world.getChunk(playerInfo.transform.getChunkPos()));

    /*  socket.on("playerPosition", (position: any) => {
        console.log(playerInfo.transform.position)

        if (
            playerInfo.transform.position.x !== position.x &&
            playerInfo.transform.position.z !== position.z
        ) {
            socket.emit(
                "chunk",
                world.getChunk(playerInfo.transform.getChunkPos()),
            );
        }
        playerInfo.transform.position.set(position.x, position.y, position.z);
        socket.broadcast.emit("updatePlayer", {
            id: playerInfo.id,
            transform: playerInfo.transform,
        });
    }); */

    socket.on("disconnect", () => {
        socket.broadcast.emit("removePlayer", playerInfo);
        players.delete(playerInfo.id);
    });

    socket.on("playerPosition", (info: { position: number[] }) => {
        const curr = new Vector3(
            info.position[0],
            info.position[1],
            info.position[2],
        );
        const prev = playerInfo.transform.position.clone();

        if (
            Math.floor(curr.x / Chunk.SIZE.x) -
                Math.floor(prev.x / Chunk.SIZE.x) !=
                0 ||
            Math.floor(curr.z / Chunk.SIZE.z) -
                Math.floor(prev.z / Chunk.SIZE.z) !=
                0
        ) {
            console.log("player moved out of previous chunk");
            socket.emit(
                "chunk",
                world.getChunk(playerInfo.transform.getChunkPos()),
            );
        }
        let pos = new Vector3(
            info.position[0],
            info.position[1],
            info.position[2],
        );
        playerInfo.transform.position.copy(pos);

        socket.broadcast.emit("updatePlayer", {
            id: playerInfo.id,
            position: playerInfo.transform.position,
        });
    });
});

server.listen(port, () => console.log(`App listening on port ${port}!`));
