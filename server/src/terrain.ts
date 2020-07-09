import { Tensor } from "@throw-out-error/throw-out-utils";
import { Vector3, Vector2 } from "@math.gl/core";
import { Chunk } from "../../common/src/chunk";

export class World {
    chunks: Map<Vector3, Chunk>;

    constructor() {
        this.chunks = new Map();
    }

    getChunk(pos: Vector3) {
        if (!this.chunks.has(pos)) {
            this.chunks.set(pos, new Chunk(pos).generate());
        }

        return this.chunks.get(pos);
    }
}
