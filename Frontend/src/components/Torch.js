import {Mesh, PointLight, AmbientLight,Object3D, MeshNormalMaterial, DoubleSide, SphereGeometry, SpotLight} from "three"

export default class Torch{
    constructor(scene) {
        //pusty kontener na inne obiekty 3D
        this.container = new Object3D();
        //wywołanie funkcji init()
        this.init(scene)
    }
    init(scene) {

        // utworzenie i pozycjonowanie światła

        // this.light = new SpotLight(0xffffff, 100, 500, Math.PI / 8);
        this.light = new SpotLight( 0xff0000, 10,200);
        this.light.position.set(0, 0, 0); // ma być w pozycji 0,0,0 kontenera - nie zmieniamy
        this.light.target = scene;

        // dodanie światła do kontenera
        this.container.add(this.light);

        let lightMaterial = new MeshNormalMaterial({
            color: 0xFF0000,
            side: DoubleSide,
            wireframe: true,
            transparent: true,
            opacity: 0.5,
            vertexColors: true
        });
        const sphere = new SphereGeometry( 50, 32, 32 );
        //utworzenie widzialnego elementu reprezentującego światło (mały sześcian, kula, czworościan foremny, do wyboru)
        this.mesh = new Mesh(sphere,lightMaterial)

        // dodanie go do kontenera
        this.container.add(this.mesh);
    }


    // funkcja zwracająca obiekt kontenera
    // czyli nasze światło wraz z bryłą

    getLight() {
        return this.container;
    }

    // przykład innej funkcji, np do zmiany koloru bryły, zmiany koloru światła, etc
    changeColor (color) {
        console.log("zmiana koloru na " + color)
    }

    positionLight(grid_x,grid_y,grid_z){
        this.container.position.set(-500+50+grid_x*50*2,0,-500+50+grid_z*50*2)
    }

    setShadow(shadow){
        this.light.castShadow = shadow;
    }
}
