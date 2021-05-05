console.log("webpack works!")

// import data1 from "./data1.js"
// import data2 from "./data2.js"
//
// import {aaa, bbb} from "./data1"
// import { ccc } from "./data2"

// Ładowanie styli
import './style.css';

// Ładownie plików
import plik from './pic.png';

import Main from './components/Main';

function init() {
    //div
    const container = document.getElementById('root');
    //main class object
    new Main(container);
}

init();

//
// document.getElementById("img1").src = plik
//
// const obj = {
//     a:data1,
//     b:data2
// }
// console.log(obj, aaa, bbb, ccc)

