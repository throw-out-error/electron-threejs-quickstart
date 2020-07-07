import { perlin, factories } from "@trinkets/noise";
import { Tensor } from "@throw-out-error/throw-out-utils";

export class World {
    chunks: Map<Tensor<[2]>, Chunk>;

    constructor() {
        this.chunks = new Map();
    }

    getChunk(pos: Tensor<[2]>) {
        if (!this.chunks.has(pos)) {
            this.chunks.set(pos, new Chunk(pos).generate());
        }

        return this.chunks.get(pos);
    }
}

export class Chunk {
    origin: Tensor<[2]>;
    size: number;
    maxHeight: number;
    values: number[][][];
    seed: number;

    constructor(position: Tensor<[2]>) {
        this.size = 16;
        this.seed = Math.random() * 100000;
        this.maxHeight = 10;
        this.origin = position;
        this.values = [];
    }

    generate(): Chunk {
        for (let x = 0; x < this.size; x++) {
            this.values[x] = [];
            for (let y = 0; y < this.maxHeight; y++) {
                this.values[x][y] = [];
                for (let z = 0; z < this.size; z++) {
                    this.values[x][y][z] = perlin(x, z, this.seed);
                }
            }
        }
        return this;
    }
}
