console.log("webpack works!")

// Ładowanie styli
// import './style.css';
import "./style.scss";

// Ładownie plików
// import plik from './pic.png';

import Main from './components/Main';

async function init() {
    //div
    const container = document.getElementById('root');
    //main class object
    const main = new Main(container);
    await main.generateMap()
    console.log(main.enemies)
    await main.addColliders()

}

init();


