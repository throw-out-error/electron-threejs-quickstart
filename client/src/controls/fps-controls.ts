import {
    Object3D,
    EventDispatcher,
    Euler,
    Vector3,
    Matrix4,
    PerspectiveCamera,
    OrthographicCamera,
    Camera,
} from "three";
import { Transform } from "../../../common/src/transform";
import EventEmitter from "eventemitter3";
export class PointerLockControls extends EventEmitter {
    domElement: HTMLElement;
    isLocked: boolean;
    camera: Object3D;
    PI_2: number;
    direction: Vector3;
    rotation: Euler;
    movementSpeed: number;
    object: Object3D;
    rotationSensitivity: number;
    constructor(
        cam: Object3D,
        movementObject: Object3D,
        domElement?: HTMLElement,
    ) {
        super();
        this.object = movementObject;
        this.domElement = domElement || document.body;
        this.isLocked = false;
        this.PI_2 = Math.PI / 2;
        this.camera = cam;
        this.direction = new Vector3(0, 0, -1);
        this.rotation = new Euler(0, 0, 0, "YXZ");
        this.movementSpeed = 0.5;
        this.rotationSensitivity = 0.002;

        this.camera.rotation.set(0, 0, 0);
        this.connect();
    }
    onMouseMove = (event: MouseEvent) => {
        if (this.isLocked === false) return;
        const mouseX = event.movementX || 0;
        const mouseY = event.movementY || 0;

        this.camera.rotation.x -= mouseY * this.rotationSensitivity;
        this.camera.rotation.y -= mouseX * this.rotationSensitivity;
        this.object.rotation.y -= mouseX * this.rotationSensitivity;
    };
    onPointerlockChange = () => {
        if (document.pointerLockElement === this.domElement) {
            this.emit("lock");
            this.isLocked = true;
        } else {
            this.emit("unlock");
            this.isLocked = false;
        }
    };
    onPointerlockError = () => {
        console.error(
            "THREE.PointerLockControls: Unable to use Pointer Lock API",
        );
    };

    connect = () => {
        document.addEventListener("mousemove", this.onMouseMove, false);
        document.addEventListener(
            "pointerlockchange",
            this.onPointerlockChange,
            false,
        );
        document.addEventListener(
            "pointerlockerror",
            this.onPointerlockError,
            false,
        );
        document.addEventListener("keydown", this.onDocumentKeyDown, false);
    };

    onDocumentKeyDown = (event) => {
        const keyCode = event.which;
        const camDir = this.getCameraDirection();
        if (keyCode == 87) {
            this.translate(new Vector3(camDir.x, 0, camDir.z));
        }
        if (keyCode == 83) {
            this.translate(new Vector3(camDir.x, 0, camDir.z));
        }
        if (keyCode == 65) {
            this.object.translateX(-this.movementSpeed);
        }
        if (keyCode == 68) {
            this.object.translateX(this.movementSpeed);
        }
    };

    disconnect = () => {
        document.removeEventListener("mousemove", this.onMouseMove, false);
        document.removeEventListener("keydown", this.onDocumentKeyDown, false);
        document.removeEventListener(
            "pointerlockchange",
            this.onPointerlockChange,
            false,
        );
        document.removeEventListener(
            "pointerlockerror",
            this.onPointerlockError,
            false,
        );
    };

    getRotationObject = () => {
        return this.camera;
    };

    getDirection = (v: Vector3) => {
        this.rotation.set(this.camera.rotation.x, this.camera.rotation.y, 0);
        v.copy(this.direction).applyEuler(this.rotation);
        return v;
    };

    translate(direction: Vector3): void {
        this.object.position.add(
            new Vector3(
                direction.x * this.movementSpeed,
                direction.y * this.movementSpeed,
                direction.z * this.movementSpeed,
            ),
        );
    }

    getCameraDirection(): Vector3 {
        let v = new Vector3();
        this.camera.getWorldDirection(v);
        return v;
    }

    lock = () => {
        this.domElement.requestPointerLock();
    };

    unlock = () => {
        document.exitPointerLock();
    };

    toggleLock = () => {
        this.isLocked ? this.unlock() : this.lock();
    };
}

export default PointerLockControls;
