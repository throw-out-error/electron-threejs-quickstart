import { perlin, factories } from "@trinkets/noise";
import { Vector3, Vector2 } from "@math.gl/core";

export class Chunk {
    static get SIZE() {
        return new Vector3(16, 10, 16);
    }

    origin: Vector3;
    values: number[][];
    seed: number;

    constructor(position: Vector3) {
        this.seed = Math.random() * 100000;
        this.origin = position;
        this.values = [];
    }

    generate(): Chunk {
        for (let x = 0; x < Chunk.SIZE.x; x++) {
            this.values[x] = [];
            for (let z = 0; z < Chunk.SIZE.z; z++) {
                this.values[x][z] =
                    perlin(x + this.origin.x, z + this.origin.y, this.seed) *
                    Chunk.SIZE.y;
            }
        }
        return this;
    }
}
