import {
    BoxGeometry,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
} from "THREE";
import EventEmitter from "eventemitter3";
import { Entity } from "../../common/src/entity";
import { Player } from "./entities/player";
import { socket } from "./socket";

export class Game extends EventEmitter {
    renderer: WebGLRenderer;
    scene: Scene;

    private entities: Entity[] = [];
    constructor() {
        super();
        this.scene = new Scene();
        this.renderer = new WebGLRenderer({ preserveDrawingBuffer: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(this.renderer.domElement);
    }

    /**
     * Returns an array that contains all entities that are players
     */
    getPlayers() {
        return this.entities.filter((e) => e instanceof Player);
    }

    /**
     * Returns an array that contains all entities that are players
     */
    getPlayer(id: string) {
        return this.getPlayers().filter((p) => p.id === id);
    }

    /**
     * Returns an array that contains all entities in the game
     */
    getEntities() {
        return this.entities;
    }

    animate() {
        this.emit("update");
        requestAnimationFrame(this.animate.bind(this));
    }
}

export const game = new Game();
setTimeout(() => {
    game.emit("ready");
    game.animate();
}, 1000);
document.getElementById("play")!.onclick = () => {
    game.emit("reset");
};
