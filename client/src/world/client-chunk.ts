import * as THREE from "three";
import { Transform } from "../../../common/src/transform";
import { polar } from "../../../common/src/math";
export class Block {
    mesh: THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>;
    material: THREE.MeshBasicMaterial;
    geometry: THREE.BoxBufferGeometry;
    constructor(chunk: ClientChunk, transform: Transform) {
        this.geometry = new THREE.BoxBufferGeometry(1, 1, 1);
        this.material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
        });

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(
            transform.position.x,
            transform.position.y,
            transform.position.z,
        );
        this.mesh.rotation.set(
            transform.rotation.x,
            transform.rotation.y,
            transform.rotation.z,
        );
        this.mesh.scale.set(
            transform.scale.x,
            transform.scale.y,
            transform.scale.z,
        );
    }
}

export class ClientChunk {
    blocks: Block[] = [];
    scene: THREE.Scene;
    geometry = new THREE.BufferGeometry();
    material = new THREE.MeshBasicMaterial();
    mesh: THREE.Mesh;
    constructor(scene: THREE.Scene) {
        // super();
        this.scene = scene;
        this.createMesh();
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    }

    addBlock(transform: Transform) {
        const b = new Block(this, transform);
        this.geometry;
        this.blocks.push(b);
    }

    createMesh() {
       // TODO: calculate optimized mesh from many blockss
    }
}
