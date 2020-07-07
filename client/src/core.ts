import { Tensor, Vector } from "@throw-out-error/throw-out-utils";
import { socket } from "./socket";
import { Player, ClientPlayer } from "./entities/player";
import { game } from "./game";
import { Entity } from "../../common/src/entity";
import { Block, createChunk } from "./world/chunk";

let mainPlayer: ClientPlayer;
let loadedChunks: Map<Tensor<[2]>, Block[]> = new Map();

// Called when the renderer is ready to initialize the scene
game.on("ready", () => {
    console.log("app initialized");

    // Called when the client receives a chunk from the server
    socket.on("chunk", (chunk) => {
        loadedChunks.set(chunk.pos, createChunk(game.scene, chunk.values, -3));
    });

    // Called when the client receives a request to unload a chunk
    socket.on("unload-chunk", (chunk) => {
        loadedChunks.delete(chunk);
    });

    // Called when a player has joined the game
    socket.on("player-info", (info: any) => {
        console.log(`Received player ${info.id}`);

        // Checks if the player that is joining is the same as the current client
        if (info.id === socket.id) {
            // If the player is the client, initialize a player object that contains a Camera
            mainPlayer = new ClientPlayer(game, socket.id);
            mainPlayer.transform = info.transform.clone();
            game.getEntities().push(mainPlayer);
            mainPlayer.controls.lock();
        } else {
            // The player is not the client, create his mesh and add him to the scene.
            const player = new Player(game, info.id);
            player.transform = info.transform.clone();
            game.getEntities().push(player);
        }
    });
});

game.on("update", () => {
    game.getEntities().forEach((e) => e.update());
    if (mainPlayer) game.renderer.render(game.scene, mainPlayer.camera);
});

//

//how do we get the socket stuff
