import { Tensor, Vector } from "@throw-out-error/throw-out-utils";

/**
 * Inspired by Unity, this simple class provides
 * a position, rotation, and scale
 * for use in 3D objects/entities.
 */
export class Transform {
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
