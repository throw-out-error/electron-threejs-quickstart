import { Camera, EventDispatcher, Vector3, Object3D } from "three";

export class FirstPersonControls extends EventDispatcher {
    constructor(
        camera: Camera,
        mass: number,
        playerHeight: number,
        doubleJump: boolean,
        worldObjects: Object3D[],
    );

    doubleJump: boolean;
    baseHeight: number; // The minimum plane height
    mass: number;
    originalMass: number;
    walkingSpeed: number; // Higher = slower
    speed: number; // Movement speed
    jumpFactor: number; // Jump height
    velocity: THREE.Vector3;

    jumps: number;
    firstJump: boolean;
    walking: boolean;

    // Crouched
    crouching: boolean;

    isLocked: boolean;

    minPolarAngle: number;
    maxPolarAngle: number;

    connect(): void;
    disconnect(): void;
    dispose(): void;
    getObject(): Camera;
    getDirection(v: Vector3): Vector3;
    moveForward(distance: number): void;
    moveRight(distance: number): void;
    updatePlayerHeight(height: number): void;
    updateWorldObjects(worldObjects: Object3D[]): void;
    updateControls(): void;
    jump(): void;
    crouch(value: boolean): void;
    walk(value: boolean): void;
    getPlayer(): Object3D;

    lock(): void;
    unlock(): void;
}
