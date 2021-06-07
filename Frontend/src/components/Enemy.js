import { MD2Loader } from './MD2Loader';
import {Mesh, TextureLoader, MeshPhongMaterial, PointLight, AmbientLight, LoadingManager} from "three"


// import marioTex from "./assets/ogre/Ogre.png"
import marioTex from "./assets/knight/bs.jpg"
// import marioTex from "./assets/bobafett/prototype_fett.png"
import Animation from "./Animation";


export default class Enemy {
    constructor(scene, manager) {
        this.scene = scene;
        this.mesh = null;
        this.manager = manager;
        this.geometry = null
    }

    load(path,x,y,z) {
        //10000
        // const light = new PointLight( 0xffffff, 5, 1000 );
        // light.position.set( 50, 50, 50 );
        // this.scene.add( light );
        // Manager is passed in to loader to determine when loading done in main
        // Load model with FBXLoader

        new MD2Loader(this.manager).load(
            path,
            geometry => {

                this.geometry = geometry;

                this.mesh = new Mesh(geometry, new MeshPhongMaterial({
                    map: new TextureLoader().load(marioTex), // dowolny plik png, jpg
                    morphTargets: true // animowanie materiału modelu
                }))
                // this.mesh.position.set(0,0,0);
                this.moveTo(x,y,z)
                this.scene.add(this.mesh);
                console.log(this.geometry.animations) // tu powinny być widoczne animacje

            },

        );

    }

    moveTo(x,y,z) {
        this.mesh.position.set(-500+50+x*50*2,y*50*2,-500+50+z*50*2)
        // this.mesh.position.set(-500,0,-500);
    }

    kill() {
        this.scene.remove(this.mesh); // ew funkcja do usunięcia modelu ze sceny
    }
}
