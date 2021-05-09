import { MD2Loader } from 'three/examples/jsm/loaders/MD2Loader.js';
import {Mesh, TextureLoader, MeshPhongMaterial, PointLight, AmbientLight} from "three"
import marioTex from "./assets/bobafett/prototype_fett.png"


export default class Model {
    constructor(scene, manager) {
        this.scene = scene;
        this.mesh = null;
        this.manager = manager;
        this.geometry = null
    }

    load(path) {

        const light = new PointLight( 0xffffff, 5, 10000 );
        light.position.set( 50, 50, 50 );
        this.scene.add( light );
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
                this.mesh.position.set(0,0,0);
                this.scene.add(this.mesh);
                console.log(this.geometry.animations) // tu powinny być widoczne animacje

            },

        );

    }

//     unload() {
//         this.scene.remove(this.mesh); // ew funkcja do usunięcia modelu ze sceny
//     }
}
