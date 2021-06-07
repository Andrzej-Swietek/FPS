import {AdditiveBlending, BufferAttribute, BufferGeometry, Points, PointsMaterial, TextureLoader, Vector3} from "three";
import fireTex from "./assets/fire.png"
export default class Laser {
    constructor(scene) {
        this.particlesCount = 1000;
        this.verticesArray = new Float32Array(this.particlesCount * 3);
        this.particlesGeometry = new BufferGeometry();

        this.particleMaterial = new PointsMaterial({
            color: 0x6622ee,
            depthWrite: false,
            transparent: true,
            size: 20,
            map: new TextureLoader().load(fireTex),
            blending: AdditiveBlending
        });
        this.scene = scene;
    }
    shoot(fromVector, destinationVector){

        this.v1 = fromVector;
        this.v2 = destinationVector;

        this.subV = this.v2.clone().sub(this.v1.clone());
        this.particlesCount = 1000;
        let stepV = this.subV.divideScalar(this.particlesCount); // particlesCount - przewidywana ilość cząsteczek na linii a-b
        this.stepV = stepV;

        console.log(this.v1, this.v2, " || ", this.subV,this.stepV);

        this.laser(this.particlesCount, this.verticesArray, this.particlesGeometry, this.particleMaterial, this.scene);

        this.laserPositions = this.particlesGeometry.attributes.position.array;
        this.mnoznikLasera  = 0.1;

    }
    laser(particlesCount, verticesArray, particlesGeometry, particleMaterial,scene){

        for (let i = 0; i < particlesCount; i+=3) {

            verticesArray[i] = i*this.stepV.x;
            verticesArray[i+1] = 0;
            // verticesArray[i+2] = 0;
            verticesArray[i+2] = i*this.stepV.z;

        }
        // console.log(verticesArray)
        // poniższa linia przypisuje geometrii naszą tablicę punktów

        particlesGeometry.setAttribute("position", new BufferAttribute(verticesArray, 3))

        // z geometrii jak zawsze powstaje mesh, złożony
        // z geometrii i materiału typu Points

        this.mesh = new Points(particlesGeometry,particleMaterial)
        this.mesh.name = "laser";
        scene.add(this.mesh)
    }

    update(){
        for (let i = 0; i < this.laserPositions.length; i+=3) {
            let losowa = 0
            const normalizedV = this.stepV.clone().normalize()
            if(Math.floor(Math.random() * 2) == 1){
                losowa = -Math.random()*this.mnoznikLasera
            }
            else{
                // losowa = Math.random()*this.mnoznikLasera*normalizedV
                losowa = Math.random()*this.mnoznikLasera
            }

            this.laserPositions[i] += normalizedV.clone().multiplyScalar( losowa ).x
            this.laserPositions[i+1] += normalizedV.clone().multiplyScalar( losowa ).y
            this.laserPositions[i+2] += normalizedV.clone().multiplyScalar( losowa ).z

        }
        this.particlesGeometry.attributes.position.needsUpdate = true
    }
    delete(){
        this.scene.children.filter(mesh => mesh.name !== 'laser')
        console.log(this.mesh)
        this.scene.remove(this.mesh)
    }
    deleteAll(){
        this.scene.children = this.scene.children.filter(mesh => mesh.name !== 'laser')
    }
}
