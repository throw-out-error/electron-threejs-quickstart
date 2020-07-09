import { Tensor, Vector } from "@throw-out-error/throw-out-utils";
import { Vector3, Vector2 } from "@math.gl/core";
import { Chunk } from "./chunk";
/**
 * Inspired by Unity, this simple class provides
 * a position, rotation, and scale
 * for use in 3D objects/entities.
 */
export class Transform {
    position: Vector3;
    rotation: Vector3;
    scale: Vector3;

    constructor(position?: Vector3, rotation?: Vector3, scale?: Vector3) {
        this.position = position || new Vector3();
        this.rotation = rotation || new Vector3();
        this.scale = scale || new Vector3(1, 1, 1);
    }

    clone() {
        return new Transform(
            this.position.clone(),
            this.rotation.clone(),
            this.scale.clone(),
        );
    }

    getPos2D(): Vector2 {
        return new Vector2(this.position.x, this.position.y);
    }

    getChunkPos(): Vector3 {
        return new Vector3(
            Math.floor(this.position.x / Chunk.SIZE.x),
            0,
            Math.floor(this.position.z / Chunk.SIZE.z),
        );
    }

    getRot2D(): Vector2 {
        return new Vector2(this.rotation.x, this.rotation.y);
    }

    getScale2D(): Vector2 {
        return new Vector2(this.scale.x, this.scale.y);
    }

    static pos(...position: number[]) {
        return new Transform(new Vector3(position));
    }
}

/* export class Transform {
    position: Tensor<Vector>;
    rotation: Tensor<Vector>;
    scale: Tensor<Vector>;

    constructor(
        position?: Tensor<Vector>,
        rotation?: Tensor<Vector>,
        scale?: Tensor<Vector>,
    ) {
        this.position = position || Tensor.from(0, 0, 0);
        this.rotation = rotation || Tensor.from(0, 0, 0);
        this.scale = scale || Tensor.from(1, 1, 1);
    }

    clone() {
        return new Transform(
            this.position.clone(),
            this.rotation.clone(),
            this.scale.clone(),
        );
    }

    getPos2D(): Tensor<[2]> {
        return Tensor.from(this.position.x, this.position.y);
    }

    getChunkPos(): Tensor<[2]> {
        return Tensor.from(this.position.x, this.position.z);
    }

    getRot2D(): Tensor<[2]> {
        return Tensor.from(this.rotation.x, this.rotation.y);
    }

    getScale2D(): Tensor<[2]> {
        return Tensor.from(this.scale.x, this.scale.y);
    }

    static pos(...position: number[]) {
        return new Transform(new Tensor(position, [3]));
    }
}
 */
