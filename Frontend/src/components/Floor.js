import {
    BoxGeometry,
    MeshNormalMaterial,
    TextureLoader,
    MeshPhongMaterial,
    MeshBasicMaterial,
    Mesh,
    DoubleSide
} from "three";
import texture from "./assets/materials/cobblestone.jpg"

export default class Floor {
    constructor(scene) {
        console.log("FLOOR",texture)
        this.scene = scene;
        this.geometry = new BoxGeometry(100,1,100);
        this.material = new MeshBasicMaterial({
            side: DoubleSide,
            map: new TextureLoader().load(texture),
            transparent: false,
            opacity: 0.8,
        });
        for (let x = 0; x < 10; x++) {
            for (let z = 0; z < 10; z++) {
                this.mesh = new Mesh(this.geometry, this.material);
                this.mesh.position.set(-500+50+x*50*2,-25,-500+50+z*50*2);
                this.scene.add(this.mesh)
            }
        }

    }
    update(){
         //    NONE FOR NOW
    }
}
