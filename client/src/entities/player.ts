import {
    BoxGeometry,
    Mesh,
    MeshBasicMaterial,
    Scene,
    PerspectiveCamera,
    Clock,
    WebGLRenderer,
} from "THREE";
import { FirstPersonControls } from "../controls/fps-controls";
import { Vector, Tensor } from "@throw-out-error/throw-out-utils";
import { Entity } from "../../../common/src/entity";
import { Game } from "../game";

export class Player extends Entity {
    mesh: Mesh;
    material: MeshBasicMaterial;
    geometry: BoxGeometry;
    constructor(renderer: Game, id: string) {
        super(id, "player");
        this.geometry = new BoxGeometry(1, 2, 1);
        this.material = new MeshBasicMaterial({ color: 0xff0000 });

        this.mesh = new Mesh(this.geometry, this.material);
        renderer.scene.add(this.mesh);
    }
}

export class ClientPlayer extends Player {
    controls: FirstPersonControls;
    camera: PerspectiveCamera;
    clock: Clock;

    constructor(renderer: Game, id: string) {
        super(renderer, id);

        this.camera = new PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            1,
            10000,
        );
        this.camera.position.z = 10;
        this.controls = new FirstPersonControls(
            this.camera,
            70,
            2,
            false,
            renderer.scene.children
        );
        // this.controls.lock();
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                this.controls.isLocked
                    ? this.controls.unlock()
                    : this.controls.lock();
                this.controls.isLocked = !this.controls.isLocked;
            }
        });
        this.clock = new Clock();
        this.clock.start();
    }

    update() {
        this.controls.updateControls();
        this.mesh.position.copy(this.camera.position);
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.02;
    }
}
