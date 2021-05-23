import Animation from "./Animation"
import Config from "./Config";

const KEYS = {
    "left": 37,
    "up": 38,
    "right": 39,
    "down": 40,
    "w": 87,
    "s": 83,
    "a": 65,
    "d": 68
};

export default class Keyboard {
    constructor(domElement, animation, modelMesh) {

        this.domElement = domElement;
        this.animation = animation
        this.modelMesh = modelMesh

        // events
        this.domElement.addEventListener('keydown', event => this.onKeyDown(event), false);
        this.domElement.addEventListener('keyup', event => this.onKeyUp(event), false);


    }

    onKeyUp(event) {
        this.animation.playAnim("stand")
        switch (event.keyCode) {
            case KEYS.up:
            case KEYS.w:
                Config.moveForward = false;
                break;
            case KEYS.left:
            case KEYS.a:
                Config.rotateLeft = false;
                break;
            case KEYS.right:
            case KEYS.d:
                Config.rotateRight = false;
                break;
            case KEYS.down:
            case KEYS.s:
                Config.moveBackward = false;
                break;


        }
        // console.log('onKeyChange', event.keyCode)
    }

    onKeyDown(event) {
        switch (event.keyCode) {
            case KEYS.up:
            case KEYS.w:
                Config.moveForward = true;
                this.animation.playAnim("run")
                break;
            case KEYS.left:
            case KEYS.a:
                Config.rotateLeft = true;
                break;
            case KEYS.right:
            case KEYS.d:
                Config.rotateRight = true;
                break;
            case KEYS.down:
            case KEYS.s:
                Config.moveBackward = true;
                this.animation.playAnim("crwalk")
                break;
        }

    }


}
