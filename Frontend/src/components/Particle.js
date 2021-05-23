import { Sprite, Vector3 } from "three"

export default class Particle extends Sprite {
    constructor(material) {
        super()

        this.material = material.clone()
        // skala naszego sprite
        this.scale.set(
            // Math.random() * ??,
            // Math.random() * ??,
            // Math.random() * ??
            Math.random() * 10,
            Math.random() * 15,
            Math.random() * 10
        );

    }
      randomNumber(min, max){
        const r = Math.random()*(max-min) + min
        return Math.floor(r)
    }

    update() {
        // wewnątrz tej funkcji przemieszczamy cząsteczkę do góry - y
        // a kiedy osiągnie określony punkt
        // cząsteczka wraca na y = 0
        // trzeba też zmieniać przezroczystość cząsteczki
        // tak aby u góry stała się całkiem przezroczysta
        // można tez losować jej x i z aby wywołać wrażenie drgania
        // całość wymaga trochę eksperymentów
        // aby wrażenie było poprawne
        // a moje pytajniki należy zastąpić własnymi pomysłami

        if (this.position.y > 1) {
            // this.position.x = Math.random()+10
            // this.position.z = Math.random()+10
            this.position.y = 0;
            this.position.x = 5
            this.position.z = 5
            this.material.opacity = 1;
        }


        this.material.opacity -= 0.001;
        // this.position.y += .5 * 8
        this.position.y += 0.05
        // this.position.x = 5
        // this.position.z = 5
        this.position.x = this.randomNumber(1,5) +10
        this.position.z = this.randomNumber(1,5) + 10

    }
}
