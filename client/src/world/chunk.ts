import { Mesh, MeshBasicMaterial, BoxGeometry, Scene } from "three";
import { Transform } from "../../../common/src/transform";
export class Block {
    mesh: Mesh;
    material: MeshBasicMaterial;
    geometry: BoxGeometry;
    constructor(scene: Scene, transform: Transform) {
        this.geometry = new BoxGeometry(1, 1, 1);
        this.material = new MeshBasicMaterial({
            color: Math.random() * 0xffffff,
        });

        this.mesh = new Mesh(this.geometry, this.material);
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

        scene.add(this.mesh);
    }
}

export function createChunk(
    scene: Scene,
    chunkData: number[][][],
    offset?: number,
): Block[] {
    let chunk: Block[] = [];

    for (let x = 0; x < chunkData.length; x++) {
        for (let y = 0; y < chunkData[x].length; y++) {
            for (let z = 0; z < chunkData[x][y].length; z++) {
                chunk.push(
                    new Block(
                        scene,
                        Transform.pos(x, offset ? y + offset : y, z),
                    ),
                );
            }
        }
    }

    return chunk;
}
