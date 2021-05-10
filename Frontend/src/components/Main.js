import {
    LoadingManager,
    Clock,
    Vector3,
    GridHelper,
    PCFSoftShadowMap
} from 'three';
import Model from "./Model"
import Keyboard from "./Keyboard"
import Animation from "./Animation"
import Config from './Config';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { Scene } from 'three';
import Renderer from './Renderer';
import Camera from './Camera';
import GUI from './GUI';
import Net from "./Net";

// ======== GAME PIECES ========
import Floor from "./Floor";
import Wall from "./Wall";
import Torch from "./Torch";
import Treasure from "./Treasure";
import Roof from "./Roof";
import Enemy from "./Enemy";

export default class Main {
    constructor(container) {

        this.isLoaded = null
        this.animation = null

        this.container = container;
        this.scene = new Scene();
        this.renderer = new Renderer(this.scene, container);
        this.camera = new Camera(this.renderer.threeRenderer);

        // ==================== LIGHT ====================

        // const light = new THREE.PointLight( 0xff0000, 1, 100 );
        // this.light.position.set( 50, 50, 50 );
        // this.scene.add( light );

        // ==================== GRID ====================
        // testowa siatka na podłoże modelu

        const gridHelper = new GridHelper(1000, 10);
        this.scene.add(gridHelper);

        // ==================== STATS ====================
        // statystyki wydajności

        this.stats = new Stats();
        this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb

        document.body.appendChild(this.stats.dom);

        // ==================== ZEGAR ====================

        this.clock = new Clock()

        // manager loadingu, pozwala monitorować progress oraz fakt zakończenia ładowania

        this.manager = new LoadingManager();

        // ==================== MODEL ====================

        this.model = new Model(this.scene, this.manager);
        this.model.load("./dist/assets/boba.md2");
        // moniytor progressu ładowania

        this.manager.onProgress = (item, loaded, total) => {
            console.log(`progress ${item}: ${loaded} ${total}`);
        };

        //

        this.manager.onLoad = () => {

            this.isLoaded = true;
            //
            console.log("MODEL LOADED!!!")

            // model loaded - można sterować animacjami

            this.animation = new Animation(this.model.mesh)

            // przykładowa animacja z modelu Mario

            this.animation.playAnim("crwalk")
            // this.animation.playAnim("crattak")
            // this.animation.playAnim("jump")
            // this.animation.playAnim("jump")

            //kawiatura

            this.keyboard = new Keyboard(window, this.animation, this.model.mesh);

        };

        // ==================== EXAMPLE LEVEL ====================
        this.level = [{"id":0,"x":1,"y":0,"z":1,"type":"wall"},{"id":1,"x":8,"y":0,"z":1,"type":"wall"},{"id":2,"x":8,"y":0,"z":8,"type":"wall"},{"id":3,"x":1,"y":0,"z":8,"type":"wall"},{"id":4,"x":1,"y":0,"z":7,"type":"wall"},{"id":5,"x":1,"y":0,"z":6,"type":"wall"},{"id":6,"x":1,"y":0,"z":2,"type":"wall"},{"id":7,"x":1,"y":0,"z":3,"type":"wall"},{"id":8,"x":2,"y":0,"z":8,"type":"wall"},{"id":9,"x":3,"y":0,"z":8,"type":"wall"},{"id":10,"x":6,"y":0,"z":8,"type":"wall"},{"id":11,"x":7,"y":0,"z":8,"type":"wall"},{"id":12,"x":8,"y":0,"z":7,"type":"wall"},{"id":13,"x":8,"y":0,"z":6,"type":"wall"},{"id":14,"x":8,"y":0,"z":2,"type":"wall"},{"id":15,"x":8,"y":0,"z":3,"type":"wall"},{"id":16,"x":7,"y":0,"z":1,"type":"wall"},{"id":17,"x":6,"y":0,"z":1,"type":"wall"},{"id":18,"x":2,"y":0,"z":1,"type":"wall"},{"id":19,"x":3,"y":0,"z":1,"type":"wall"},{"id":20,"x":2,"y":0,"z":2,"type":"light"},{"id":21,"x":2,"y":0,"z":7,"type":"light"},{"id":22,"x":7,"y":0,"z":7,"type":"light"},{"id":23,"x":7,"y":0,"z":2,"type":"light"},{"id":24,"x":4,"y":0,"z":4,"type":"treasure"},{"id":25,"x":5,"y":0,"z":4,"type":"treasure"},{"id":26,"x":5,"y":0,"z":5,"type":"treasure"},{"id":27,"x":4,"y":0,"z":5,"type":"treasure"},{"id":28,"x":0,"y":0,"z":0,"type":"light"},{"id":29,"x":9,"y":0,"z":0,"type":"light"},{"id":30,"x":9,"y":0,"z":9,"type":"light"},{"id":31,"x":0,"y":0,"z":9,"type":"light"}]


        this.floor = new Floor(this.scene);
        this.roof = new Roof(this.scene);


        // this.test_wall = new Wall(this.scene, 1,0,1);
        // this.test_wall2 = new Wall(this.scene, 1,1,1);

        // this.test_torch = new Torch(this.scene)
        // this.scene.add(this.test_torch.getLight())
        // this.test_torch.positionLight(2,0,2);
        // this.test_torch.setShadow(true);

        // this.test_torch2 = new Torch(this.scene)
        // this.scene.add(this.test_torch2.getLight())
        // this.test_torch2.positionLight(6,1,6);

        this.render();

        this.GUI = new GUI();
        this.net = new Net();


        document.getElementById('camera--fov').addEventListener('input', ()=> {
            console.log(document.getElementById('camera--fov').value/100 * 75, this.camera.threeCamera.fov)
            this.camera.threeCamera.fov = parseInt(document.getElementById('camera--fov').value) + 75;
            // this.camera.threeCamera.fov = 20;
            this.camera.threeCamera.updateProjectionMatrix();
        });

        document.getElementById('camera-height').addEventListener('input', ()=> {
            console.log(document.getElementById('camera-height').value)
        })

    }


    async generateMap() {
       this.level = await this.net.getMap()
        console.log("LV",this.level)

        this.level.forEach( field => {
            if (field.type === 'wall'){

                new Wall(this.scene, field.x,0,field.z);
                new Wall(this.scene, field.x,1,field.z);

            } else if (field.type === 'treasure'){

                new Treasure(this.scene, field.x,0,field.z)

            } else if (field.type === 'light'){

                let t =  new Torch(this.scene);
                this.scene.add(t.getLight())
                t.positionLight(field.x,2,field.z);

            } else if (field.type === 'enemy'){

                let ogreManager =  new LoadingManager();
                let ogre = new Enemy(this.scene, ogreManager);
                ogre.load("./dist/assets/ogre.md2",field.x,0,field.z);

                ogreManager.onLoad = () => {
                    // this.isLoaded = true;
                    console.log("OGRE LOADED!!!")
                     let ogreAnimation = new Animation(ogre.mesh)
                    ogreAnimation.playAnim("stand")
                };
            }
        })
    }

    render() {

        // początek pomiaru wydajności
        this.stats.begin()

        // this.ico.update() // obrót ico


        // delta do animacji
        let delta = this.clock.getDelta();

        // wykonanie funkcji update w module Animations - zobacz do pliku Animations
        if (this.animation) this.animation.update(delta)

        this.renderer.render(this.scene, this.camera.threeCamera);

        // obsługa ruch modelu dopiero kiedy jest załadowany, można tą część umieścić w module Keyboard
        // tworząc w nim no prunkcję update() i wywoływać ją poniżej

        if (this.model.mesh) {
//
            if (Config.rotateLeft) {
                this.model.mesh.rotation.y += 0.05
            }
            if (Config.rotateRight) {
                this.model.mesh.rotation.y -= 0.05
            }
            if (Config.moveForward) {
                this.model.mesh.translateX(3)
            }
            if (Config.moveBackward) {
                this.model.mesh.translateX(-3)
            }
            const camVect = new Vector3(-100, 50, 0)

            const camPos = camVect.applyMatrix4(this.model.mesh.matrixWorld);
            this.camera.threeCamera.position.x = camPos.x
            this.camera.threeCamera.position.y = camPos.y
            this.camera.threeCamera.position.z = camPos.z
            this.camera.threeCamera.lookAt(this.model.mesh.position)
        }

        // koniec statystyk
        this.stats.end()

        requestAnimationFrame(this.render.bind(this));

    }

}

