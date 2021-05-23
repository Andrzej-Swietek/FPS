import { Object3D, SpriteMaterial, TextureLoader, AdditiveBlending, PointLight } from "three"
import fireTex from "./assets/fire.png"
import Particle from "./Particle"

export default class Fireplace extends Object3D {

    constructor() {
        super()
        //tablica na cząsteczki
        this.particles = []
        // przewidywana ilość cząsteczek
        this.count = 100
        // materiał cząsteczki, rzecz najważniejsza
        // jego właściwość blending decyduje o tym, że cząsteczki mieszają się
        // ze sobą

        this.p ={x: 0,y: 0, z: 0};

        this.particleMaterial = new SpriteMaterial({
            color: 0xff6622,
            map: new TextureLoader().load(fireTex),
            transparent: true,
            opacity: 0.8,
            depthWrite: false,
            blending: AdditiveBlending
        });
        // dodajemy światło, aby ognisko emitowało oświetlenie na scenie
        // this.point = new PointLight(0xff0000, 20, 20)
        this.point = new PointLight(0xffffff, 20, 20)


        this.init()


        document.querySelector('#fire-size').addEventListener('input', (e)=>{
            let factor = e.target.value / 100 * 2
            // this.scale.set(factor * 1,factor * 1,factor * 1)
            this.scale.y = factor;

            // prev = this.position.x
        })

        document.querySelector('#fire-width-x').addEventListener('input', (e)=>{
            let factor = e.target.value / 100 * 2
            this.scale.x = factor;
        })

        document.querySelector('#fire-width-z').addEventListener('input', (e)=>{
            let factor = e.target.value / 100 * 2
            this.scale.z = factor;
        })
    }

    init() {

        // w pętli tworzymy odpowiednią ilość cząsteczek klasy Particle
        // dodajemy do this (kontener3D) i tablicy
        for (let i = 0; i < this.count ; i++) {
            var particle = new Particle(this.particleMaterial)
            this.add(particle)
            this.particles.push(particle);
        }

    }



    update() {
        // tutaj w pętli wykonujemy funkcję upfate każdej cząsteczki,
        // którą mamy w tablicy
        this.particles.forEach(particle => {
            particle.update()
        })

    }

    positionFireplace(grid_x,grid_y,grid_z){
        this.p = {x: grid_x, y: grid_y, z: grid_z }
        this.position.set(-500+25+grid_x*50*2,grid_y*50*2,-500+25+grid_z*50*2)
    }
}
