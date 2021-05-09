console.log("webpack works!")

// Ładowanie styli
import './style.css';

// Ładownie plików
// import plik from './pic.png';

import Main from './components/Main';

function init() {
    //div
    const container = document.getElementById('root');
    //main class object
    const main = new Main(container);

}

init();


