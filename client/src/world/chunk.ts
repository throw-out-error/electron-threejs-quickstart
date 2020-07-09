import { Scene } from "three";
import { Transform } from "../../../common/src/transform";
import { Chunk } from "../../../common/src/chunk";
import { ClientChunk, Block } from "./client-chunk";
export function createChunk(
    scene: Scene,
    generatedChunk: Chunk,
    yOffset: number,
): ClientChunk {
    const chunkData = generatedChunk.values;
    let chunk = new ClientChunk(scene);
    /*     chunk.position.set(
        generatedChunk.origin.x,
        generatedChunk.origin.y,
        generatedChunk.origin.x,
    ); */
    for (let x = 0; x < chunkData.length; x++) {
        for (let z = 0; z < chunkData[x].length; z++) {
            chunk.addBlock(
                Transform.pos(
                    x - generatedChunk.origin.x * Chunk.SIZE.x,
                    Math.round(chunkData[x][z] + yOffset),
                    z - generatedChunk.origin.x * Chunk.SIZE.z,
                ),
            );
        }
    }

    return chunk;
}
