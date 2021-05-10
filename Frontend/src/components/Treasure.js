import {
    BoxGeometry,
    MeshNormalMaterial,
    TextureLoader,
    MeshPhongMaterial,
    MeshBasicMaterial,
    Mesh,
    DoubleSide
} from "three";
import texture from "./assets/materials/woodenBox.jpg"


export default class Treasure{
    constructor(scene,grid_x,grid_y,grid_z) {
        console.log("Treasure")
        this.scene = scene;
        this.geometry = new BoxGeometry(100, 100, 100);
        // this.material = new MeshBasicMaterial({
        //     side: DoubleSide,
        //     map: new TextureLoader().load(texture),
        //     transparent: false,
        //     opacity: 0.8,
        // });
        //
        this.material = new MeshPhongMaterial({
            color: 0x404040,
            // color: 0xffffff,
            specular: 0xffffff,
            shininess: 100,
            side: DoubleSide,
            map: new TextureLoader().load(texture),
        });

        this.mesh = new Mesh(this.geometry, this.material);

        // this.mesh.castShadow = true;

        this.positionTreasure(grid_x,grid_y,grid_z);
        this.scene.add(this.mesh)


    }

    positionTreasure(grid_x,grid_y,grid_z){
        this.mesh.position.set(-500+50+grid_x*50*2,grid_y*50*2,-500+50+grid_z*50*2)
    }

}
