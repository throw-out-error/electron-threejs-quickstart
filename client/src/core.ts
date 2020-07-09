import { Vector2, Vector3 } from "@math.gl/core";
import { socket } from "./socket";
import { Player, ClientPlayer } from "./entities/player";
import { game } from "./game";
import { Entity } from "../../common/src/entity";
import { createChunk } from "./world/chunk";
import { Transform } from "../../common/src/transform";
import { BoxGeometry, Mesh, MeshBasicMaterial } from "three";
import { ClientChunk } from "./world/client-chunk";
let mainPlayer: ClientPlayer;
let loadedChunks: Map<Vector2, ClientChunk> = new Map();

function unloadChunk(v: Vector2) {
    if (loadedChunks.has(v)) {
    }
}

// Called when the renderer is ready to initialize the scene
game.on("ready", () => {
    console.log("game ready");

    let geometry = new BoxGeometry(20, 1, 20);
    let material = new MeshBasicMaterial({ color: 0x00ffff });

    let floor = new Mesh(geometry, material);
    floor.position.set(0, -20, 0);
    game.scene.add(floor);

    // Called when the client receives a chunk from the server
    socket.on("chunk", (chunk) => {
        console.log(`Recieved chunk at ${chunk.origin.toString()}`);

        unloadChunk(chunk.origin);
        loadedChunks.set(chunk.origin, createChunk(game.scene, chunk, -3));
    });

    // Called when the client receives a request to unload a chunk
    socket.on("unload-chunk", (chunk) => {
        loadedChunks.delete(chunk.origin);
    });

    mainPlayer = new ClientPlayer(game, socket.id);
    mainPlayer.transform = Transform.pos(0, 0, 0);
    game.getEntities().push(mainPlayer);
    mainPlayer.controls.toggleLock();

    // Called when a player has joined the game
    socket.on("player-info", (info: any) => {
        console.log(`Received player ${info.id}`);

        // Checks if the player that is joining is the same as the current client
        if (info.id === socket.id) {
            // If the player is the client, initialize a player object that contains a Camera
            mainPlayer = new ClientPlayer(game, socket.id);
            mainPlayer.transform.position.set(
                info.transform.position.x,
                info.transform.position.y,
                info.transform.position.z,
            );
            game.getEntities().push(mainPlayer);
            mainPlayer.controls.toggleLock();
        } else {
            // The player is not the client, create his mesh and add him to the scene.
            const player = new Player(game, info.id);
            player.transform = Transform.pos(
                info.transform.position.x,
                info.transform.position.y,
                info.transform.position.z,
            );
            game.getEntities().push(player);
        }
    });

    socket.on("updatePlayer", (info: any) => {
        if (info.id !== socket.id) {
            let player = game.getPlayers().filter((p) => p.id === info.id)[0];
            if (player) {
                player.transform.position.set(
                    info.position.x,
                    info.position.x,
                    info.position.z,
                );
            }
        }
    });

    setInterval(() => {
        if (mainPlayer) {
            console.log(mainPlayer.transform.position.toString());
        }
    }, 2500);

    game.on("reset", () => {
        mainPlayer.controls.toggleLock();
    });

    game.on("update", () => {
        game.getEntities().forEach((e) => e.update());
        game.scene.updateMatrixWorld();

        if (mainPlayer) {
            game.renderer.render(game.scene, mainPlayer.camera);
        } else console.error("Client player has not been created!");
    });
});

//

//how do we get the socket stuff
