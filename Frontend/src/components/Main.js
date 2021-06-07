import {
    LoadingManager,
    Clock,
    Vector3,
    GridHelper,
    PCFSoftShadowMap, Points, BufferAttribute, AdditiveBlending, TextureLoader, BufferGeometry, PointsMaterial
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
import Fireplace from "./Fireplace";
import Collision from "./Collision";
import Laser from "./Laser";
import fireTex from "./assets/fire.png"
export default class Main {

    constructor(container) {

        this.isLoaded = null
        this.animation = null

        this.container = container;
        this.scene = new Scene();
        this.renderer = new Renderer(this.scene, container);
        this.camera = new Camera(this.renderer.threeRenderer);
        this.cameraHeight = 50;
        this.cameraXangle = 100;
        this.cameraZangle = 100;
        this.firePlaces = [];
        this.enemies = [];
        this.walls = [];
        this.viewMode = "normal";
        this.collisionStopper = 1;
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

        this.manager.onLoad = () => {

            this.isLoaded = true;
            //
            console.log("MODEL LOADED!!!")

            // model loaded - można sterować animacjami

            this.animation = new Animation(this.model.mesh)

            // przykładowa animacja z modelu Mario

            this.animation.playAnim("crwalk")
            // this.animation.playAnim("crattak")
            this.animation.playAnim("stand")
            // this.animation.playAnim("jump")
            // this.animation.playAnim("jump")

            //kawiatura

            this.keyboard = new Keyboard(window, this.animation, this.model.mesh);

        };


        // ==================== EXAMPLE LEVEL ====================
        this.level = [{"id":0,"x":1,"y":0,"z":1,"type":"wall"},{"id":1,"x":8,"y":0,"z":1,"type":"wall"},{"id":2,"x":8,"y":0,"z":8,"type":"wall"},{"id":3,"x":1,"y":0,"z":8,"type":"wall"},{"id":4,"x":1,"y":0,"z":7,"type":"wall"},{"id":5,"x":1,"y":0,"z":6,"type":"wall"},{"id":6,"x":1,"y":0,"z":2,"type":"wall"},{"id":7,"x":1,"y":0,"z":3,"type":"wall"},{"id":8,"x":2,"y":0,"z":8,"type":"wall"},{"id":9,"x":3,"y":0,"z":8,"type":"wall"},{"id":10,"x":6,"y":0,"z":8,"type":"wall"},{"id":11,"x":7,"y":0,"z":8,"type":"wall"},{"id":12,"x":8,"y":0,"z":7,"type":"wall"},{"id":13,"x":8,"y":0,"z":6,"type":"wall"},{"id":14,"x":8,"y":0,"z":2,"type":"wall"},{"id":15,"x":8,"y":0,"z":3,"type":"wall"},{"id":16,"x":7,"y":0,"z":1,"type":"wall"},{"id":17,"x":6,"y":0,"z":1,"type":"wall"},{"id":18,"x":2,"y":0,"z":1,"type":"wall"},{"id":19,"x":3,"y":0,"z":1,"type":"wall"},{"id":20,"x":2,"y":0,"z":2,"type":"light"},{"id":21,"x":2,"y":0,"z":7,"type":"light"},{"id":22,"x":7,"y":0,"z":7,"type":"light"},{"id":23,"x":7,"y":0,"z":2,"type":"light"},{"id":24,"x":4,"y":0,"z":4,"type":"treasure"},{"id":25,"x":5,"y":0,"z":4,"type":"treasure"},{"id":26,"x":5,"y":0,"z":5,"type":"treasure"},{"id":27,"x":4,"y":0,"z":5,"type":"treasure"},{"id":28,"x":0,"y":0,"z":0,"type":"light"},{"id":29,"x":9,"y":0,"z":0,"type":"light"},{"id":30,"x":9,"y":0,"z":9,"type":"light"},{"id":31,"x":0,"y":0,"z":9,"type":"light"}]


        this.floor = new Floor(this.scene);
        this.roof = new Roof(this.scene);


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
            let newHeight = parseInt(document.getElementById('camera-height').value)
            console.log("%c CAMERA HEIGHT: "+newHeight, 'color: orange');
            this.cameraHeight = newHeight;
        });

        document.getElementById('camera-x-angle').addEventListener('input', ()=> {
            let newXangle = parseInt(document.getElementById('camera-x-angle').value)
            console.log("%c CAMERA X Angle: "+newXangle, 'color: red');
            this.cameraXangle = newXangle;
        });

        document.getElementById('camera-view-angle-y').addEventListener('input', ()=> {
            let newZangle = parseInt(document.getElementById('camera-view-angle-y').value)
            console.log("%c CAMERA Z Angle: "+newZangle, 'color: red');
            this.cameraZangle = newZangle;
        });

        document.getElementById('view-from-top').addEventListener('input', ()=>{
            if (this.viewMode === 'normal'){
                this.viewMode = 'top';
                this.roof.makeInvisible()
            }
            else {
                this.viewMode = 'normal';
                this.roof.makeVisible()
            }
            console.log(this.viewMode, document.getElementById('view-from-top').value )
        })

        document.getElementById('shadows').addEventListener('input',()=>{
            this.enableShadows();
        })

        document.body.onkeydown = (e)=> {
            let isOnStage = false;
            this.scene.children.forEach(m=> {
                if (m.name === 'laser') isOnStage = true
            })
            if (e.keyCode === 32 && !isOnStage){
                // this.laser = new Laser(this.scene);
                // console.log(this.model.mesh.position.x,this.model.mesh.position.y,this.model.mesh.position.z);
                // let playerPosVector = new Vector3(this.model.mesh.position.x, this.model.mesh.position.y, this.model.mesh.position.z);
                // // let destinationVect = playerPosVect.clone().add(new Vector3(100,0,0));
                // let destinationVector = new Vector3(this.model.mesh.position.x+100,this.model.mesh.position.y,this.model.mesh.position.z);
                //
                // // console.log( destinationVect ,playerPosVect);
                // this.laser.shoot(  playerPosVector, destinationVector );
                // // this.laser.shoot( new Vector3(100,0,0), new Vector3(300,0,0))
                this.l1.visible = true;
                setTimeout( ()=>{
                    // this.laser.delete();
                    // this.laser.deleteAll();
                    this.l1.visible = false;
                }, 1000 )
            }
        }


        // =============== Laser ===============
        this.verticesArray1 = new Float32Array(1000 * 3)
        this.particlesGeometry1 = new BufferGeometry()

        this.particleMaterial1 = new PointsMaterial({
            // color: 0x3ae03a,
            // color: 0xff00ff,
            color: 0x6622ee,
            depthWrite: false,
            transparent: true,
            size: 20,
            map: new TextureLoader().load(fireTex),
            blending: AdditiveBlending
        })



        const v1 = new Vector3(0, 0, 0)
        const v2 = new Vector3(200, 0, 0)
        const subV = v2.clone().sub(v1.clone())

        this.particlesCount1 = 1000
        const stepV = subV.divideScalar(this.particlesCount1) // particlesCount - przewidywana ilość cząsteczek na linii a-b
        this.stepV = stepV;

        function laser(particlesCount, verticesArray, particlesGeometry, particleMaterial,scene){

            for (let i = 0; i < particlesCount; i+=3) {

                verticesArray[i] = i*stepV.x
                verticesArray[i+1] = 0
                verticesArray[i+2] = i*stepV.z

            }
            // console.log(verticesArray)
            // poniższa linia przypisuje geometrii naszą tablicę punktów

            particlesGeometry.setAttribute("position", new BufferAttribute(verticesArray, 3))

            // z geometrii jak zawsze powstaje mesh, złożony
            // z geometrii i materiału typu Points

            const mesh1 = new Points(particlesGeometry,particleMaterial)
            scene.add(mesh1)
            return mesh1;
        }

        this.l1 = laser(this.particlesCount1,this.verticesArray1,this.particlesGeometry1,this.particleMaterial1,this.scene)
        this.l1.visible = false;
    }


    async generateMap() {
       this.level = await this.net.getMap()
        // console.log("LV",this.level)

        this.level.forEach( (field) => {
            if (field.type === 'wall'){

                let w1 = new Wall(this.scene, field.x,0,field.z);
                let w2 = new Wall(this.scene, field.x,1,field.z);
                this.walls.push(w1)
                this.walls.push(w2)

            } else if (field.type === 'treasure'){

                new Treasure(this.scene, field.x,0,field.z)

            } else if (field.type === 'light') {
                let t =  new Torch(this.scene);
                this.scene.add(t.getLight())
                t.positionLight(field.x,2,field.z);
                let firePlace = new Fireplace();
                firePlace.init();
                firePlace.positionFireplace(field.x,0,field.z)
                // console.log(firePlace)
                this.firePlaces.push(firePlace);
                this.scene.add(firePlace)

            } else if (field.type === 'enemy'){
                this.createEnemy(field).then( obj =>{
                    this.enemies[this.enemies.length] = obj
                } )
                // console.log(enemy_model)
            }

        })
        console.log(this.walls)
        console.log(this.enemies)


    }
    async addColliders(){
        return new Promise( resolve => {

            resolve(true);
        })

    }

    createEnemy(field){
        return new Promise(resolve => {
            let enemyManager =  new LoadingManager();
            let enemy = new Enemy(this.scene, enemyManager);
            // ogre.load("./dist/assets/ogre.md2",field.x,0,field.z);
            // ogre.load("./dist/assets/knight.md2",field.x,0,field.z);
            enemy.load("./dist/assets/knight.md2",field.x,0,field.z);
            enemyManager.onProgress = (item, loaded, total) => {
                console.log(`progress ${item}: ${loaded} ${total}`);
            };
            enemyManager.onLoad = () => {
                // this.isLoaded = true;
                console.log("ENEMY LOADED!!!")
                let enemyAnimation = new Animation(enemy.mesh)
                enemyAnimation.playAnim("stand")


                resolve({ model: enemy, anim:enemyAnimation })
            };
        })


        // console.log("=========================== ",this.enemies,"=========================== ")
    }
    render() {

        // początek pomiaru wydajności
        this.stats.begin()
        // this.ico.update() // obrót ico
        // delta do animacji
        let delta = this.clock.getDelta();


        // wykonanie funkcji update w module Animations - zobacz do pliku Animations
        if (this.animation) this.animation.update(delta)
        if(this.enemies.length >= 1) {
            // console.log(this.enemies, this.enemy)
            this.enemies[0].anim.update(delta)
            // console.log(this.enemies)
        }  // dla kazdego enemy analogicznie do this.animation.update(delta)


        this.renderer.render(this.scene, this.camera.threeCamera);

        // obsługa ruch modelu dopiero kiedy jest załadowany, można tą część umieścić w module Keyboard
        // tworząc w nim no prunkcję update() i wywoływać ją poniżej
        // console.log(this.enemies)
        // if(this.enemies[0])  this.enemies[0].anim.playAnim("crwalk")
        if (this.model.mesh) {
            this.l1.position.set(this.model.mesh.position.x,this.model.mesh.position.y,this.model.mesh.position.z)
            if ( !this.playerWallCollision )
                this.playerWallCollision = new Collision(this.model.mesh, this.walls)

            // if ( !this.playerEnemyCollision && this.enemies.length >=1)
            //     this.playerEnemyCollision = new Collision(this.model.mesh, this.enemies)


            if (this.walls.length > 0){
                this.playerWallCollision.update((element)=>{
                    if (element.distance < 100){
                        console.log(element.distance, element.object)
                        console.log("%c INTERACTED WITH: "+element,'color: purple')
                        this.collisionStopper = 0
                    }
                    else this.collisionStopper = 1

                })
            }

            // if ( this.enemies.length >= 1 ){
            //     this.playerEnemyCollision.update(element =>{
            //         if (element.distance < 100){
            //         //    TODO play animation
            //             let index = this.enemies.indexOf(element)
            //             this.enemies[index].anim.playAnim("crattak")
            //         }
            //     })
            // }


            if (Config.rotateLeft) {
                this.model.mesh.rotation.y += 0.05
                this.l1.rotation.y += 0.05
            }
            if (Config.rotateRight) {
                this.model.mesh.rotation.y -= 0.05
                this.l1.rotation.y -= 0.05
            }
            if (Config.moveForward) {
                this.model.mesh.translateX(3*this.collisionStopper);
            }
            if (Config.moveBackward) {
                this.model.mesh.translateX(-3)
            }
            // const camVect = new Vector3(-100, 50, 0)
            const camVect = new Vector3(-this.cameraXangle, this.cameraHeight, this.cameraZangle-50)

            const camPos = camVect.applyMatrix4(this.model.mesh.matrixWorld);
            if (this.viewMode === 'normal'){
                this.camera.threeCamera.position.x = camPos.x;
                this.camera.threeCamera.position.y = camPos.y;
                this.camera.threeCamera.position.z = camPos.z;
                this.camera.threeCamera.lookAt(this.model.mesh.position)
            } else {
                this.camera.threeCamera.position.x = 0;
                this.camera.threeCamera.position.y = 600;
                this.camera.threeCamera.position.z = 0;
                this.camera.threeCamera.lookAt(0,0,0);
            }



        }

        this.firePlaces.forEach( fp => fp.update())
        // koniec statystyk
        this.stats.end()
        if (this.laser) {
            this.laser.update()
            // console.log("LASER REFRESH")
        }
        requestAnimationFrame(this.render.bind(this));

    }
    enableShadows(){
     this.renderer.threeRenderer.shadowMap.enabled = true
     this.renderer.threeRenderer.shadowMap.type = PCFSoftShadowMap;
        console.log(this.scene.children)
     this.scene.children.forEach( ch => {
         ch.castShadow = true
         if (ch.children) ch.children.forEach(c => c.castShadow = true)
     })
    }
}

