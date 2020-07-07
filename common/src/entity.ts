import { Tensor, Vector } from "@throw-out-error/throw-out-utils";
import { Transform } from "./transform";

export class Entity {
    type: string;
    id: string;
    transform: Transform;
    constructor(id: string, type: string, transform?: Transform) {
        this.type = type;
        this.id = id;
        this.transform = transform || new Transform();
    }

    update() {}
}
