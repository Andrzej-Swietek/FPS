import {Ray, Raycaster, Vector2, Vector3} from "three";

export default class Collision {
    constructor(objectToWatch, interactWith) {
        this.raycaster = new Raycaster(); // obiekt Raycastera symulujący "rzucanie" promieni
        this.mouseVector = new Vector2() // ten wektor czyli pozycja w przestrzeni 2D na ekranie(x,y) wykorzystany będzie do określenie pozycji myszy na ekranie, a potem przeliczenia na pozycje 3D
        this.objectToWatch = objectToWatch;
        this.interactWith = interactWith.map( e => e.mesh);
        this.intersects = [];
        console.log(this)
    }
    update(callback){
        this.raycaster.ray = new Ray(this.objectToWatch.position, this.objectToWatch.getWorldDirection(new Vector3()).multiplyScalar(-1))
        this.intersects = this.raycaster.intersectObjects(this.interactWith, true);
        if (this.intersects[0]) {
            // console.log(this.intersects[0].distance)
            // console.log(this.intersects);
            this.intersects.forEach( (element) => {
                // console.log(element);
                callback(element)
                // console.log(typeof(element.object), element.object) //&& typeof(b.object) == 'Box'
            })
        }
    }
}
