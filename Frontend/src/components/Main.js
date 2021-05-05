import {
    LoadingManager,
    Clock,
    Vector3,
    GridHelper
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

export default class Main {
    constructor(container) {

        this.isLoaded = null
        this.animation = null

        this.container = container;
        this.scene = new Scene();
        this.renderer = new Renderer(this.scene, container);
        this.camera = new Camera(this.renderer.threeRenderer);

        // light

        // const light = new THREE.PointLight( 0xff0000, 1, 100 );
        // this.light.position.set( 50, 50, 50 );
        // this.scene.add( light );
        // grid - testowa siatka na podłoże modelu

        const gridHelper = new GridHelper(1000, 10);
        this.scene.add(gridHelper);

        //stats - statystyki wydajności

        this.stats = new Stats();
        this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb

        document.body.appendChild(this.stats.dom);

        // zegar - vide lekcja 4

        this.clock = new Clock()

        // manager loadingu, pozwala monitorować progress oraz fakt zakończenia ładowania

        this.manager = new LoadingManager();

        // model

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

            //kawiatura

            this.keyboard = new Keyboard(window, this.animation, this.model.mesh);

        };


        this.render();

        this.GUI = new GUI();
    }

    render() {



        // początek pomiaru wydajności
        this.stats.begin()

        // this.ico.update() // obrót ico


        // delta do animacji
        var delta = this.clock.getDelta();

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

