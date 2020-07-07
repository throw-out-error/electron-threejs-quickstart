import express, { Request, Response } from "express";
import ioserver, { Socket } from "socket.io";
import { World } from "./terrain";
import { Tensor } from "@throw-out-error/throw-out-utils";
import { Transform } from "../../common/src/transform";

const app = express();
const server = require("http").Server(app);
const io = ioserver(server);
const port = process.env.PORT || 3000;
//object? why not an array?
let players: any[] = [];
let playersById: Record<string, any> = {};

app.get("/", (req: Request, res: Response) => {
    res.json({ data: "hello world" });
});

let world = new World();

io.on("connection", (socket: Socket) => {
    socket.emit("news", "hello, world!");
    const playerInfo = { id: socket.id, transform: new Transform() };
    playersById[playerInfo.id] = playerInfo;
    players.push(playerInfo);
    io.sockets.emit("player-info", playerInfo);
    socket.emit(
        "chunk",
        world.getChunk(playerInfo.transform.getPos2D()),
    );
});

server.listen(port, () => console.log(`App listening on port ${port}!`));
