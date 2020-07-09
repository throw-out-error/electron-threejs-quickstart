import {
    BoxGeometry,
    Mesh,
    MeshBasicMaterial,
    Scene,
    PerspectiveCamera,
    Camera,
    Clock,
    Vector3,
} from "THREE";
// import { FirstPersonControls } from "../controls/fps-controls";
import FirstPersonControls from "../controls/fps-controls";
import { Vector, Tensor } from "@throw-out-error/throw-out-utils";
import { Entity } from "../../../common/src/entity";
import { Game } from "../game";
import { socket } from "../socket";

export class Player extends Entity {
    mesh: Mesh;
    material: MeshBasicMaterial;
    geometry: BoxGeometry;
    constructor(game: Game, id: string) {
        super(id, "player");
        this.geometry = new BoxGeometry(0.5, 2, 0.5);
        this.material = new MeshBasicMaterial({ color: 0xff0000 });

        this.mesh = new Mesh(this.geometry, this.material);
        game.scene.add(this.mesh);
    }

    update() {
        this.transform.position.copy(this.mesh.position.toArray());
        this.transform.rotation.copy(this.mesh.rotation.toArray());
    }

    /*     getWorldPosition(): Tensor<Vector> {
        let v = new Vector3(0, 0, 0);
        this.mesh.getWorldPosition(v);
        return Tensor.from(v.x, v.y, v.z);
    } */
}

export class ClientPlayer extends Player {
    controls: FirstPersonControls;
    camera: PerspectiveCamera;
    clock: Clock;
    timer!: any;

    constructor(game: Game, id: string) {
        super(game, id);

        this.camera = new PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            10000,
        );
        this.camera.position.y = -0.5;
        this.camera.rotation.order = "YXZ"; // this is not the default
        this.controls = new FirstPersonControls(
            this.camera,
            this.mesh,
            game.renderer.domElement,
        );

        document.addEventListener("keyup", (event) => {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                if (event.key === "Escape") {
                    this.controls.toggleLock();
                }
            }, 1000);
        });
        this.clock = new Clock();
        this.clock.start();
    }

    update() {
        super.update();
        this.camera.position.copy(this.mesh.position);
        socket.emit("playerPosition", {
            position: this.transform.position.toArray(),
        });
    }
}
