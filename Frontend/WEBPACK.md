TO INSTALL OVERALL
```
npm install --save-dev webpack webpack-cli
npm install --save-dev webpack-dev-server
npm install html-webpack-plugin
npm install style-loader css-loader
npm install url-loader file-loader --save-dev

npm install three@0.126.0 --save-dev
```


# Instalacja webpack-a w folderze test
```
npm install --save-dev webpack webpack-cli
```
## Szkielet projektu na początku pracy, potem będziemy dodawać kolejne pliki
```
{test}
|
|__ index.js
|__ webpack.config.js
```
# Plik webpack.config.js

umożliwia konfigurację webpacka, będzie rozbudowywany w kolejnych punktach
```js
module.exports = {
entry: './index.js',
output: {
filename: 'bundle.js'
},
mode: 'development' // none, development, production
};
```


# Tworzenie pakietu (bundle) z plików js

na razie użyj takiego polecenia w konsoli uruchamiającego serwer webpack

./node_modules/.bin/webpack


w podfolderze /dist powstaje automatycznie plik bundle.js
przeglądnij jego zawartość, zmieniając mode : none, development, production
zwróć uwagę że na razie na razie nie ma pliku html!



# webpack-dev-server

Służy do testowania pracy aplikacji webowej (zamiast własnego serwera Node czy Express)
instalacja webpack-web-servera:
```.\node_modules\.bin\webpack./node
npm install --save-dev webpack-dev-server
```

konfiguracja portu webpack-dev-server-a w pliku webpack.config.js

```js
module.exports = {

    devServer: {
        port: 8080
    },

};
```

# Uruchomienie webpack-dev-server-a
na razie użyj takiego polecenia w konsoli
```
./node_modules/.bin/webpack serve
```

uruchamiamy w przeglądarce ```localhost:8080```


# Połączenie kilku plików w jeden bundle

Przykład pokazuje w jaki sposób webpack łączy pliki projektu w jeden.
wszystkie poniższe pliki zamieść w głównym katalogu aplikacji
zwróć uwagę w jaki sposób można importować cały obiekt z pliku poleceniem import
a w jaki sposób konkretne pole z tego obiektu, poleceniem import {} (tzw destrukturyzacja)
jest to na tyle powszechna technika, że warto znać jej nazwę i używać

plik data1.js
```js
module.exports = {
aaa: 1,
bbb: 2
}
```

plik data2.js
```js
module.exports = {
ccc: 3,
ddd: 4
}
```

plik.index.js
```js
import data1 from "./data1.js"
import data2 from "./data2.js"

import { aaa } from "./data1"
import { bbb } from "./data2"

const obj = {
    a:data1,
    b:data2
}
console.log(obj, aaa, bbb)
```

uruchom polecenie webpack a potem polecenie webpack serve
zobacz co jest pod adresem localhost:8080 w konsoli


# Task runner

aby nie wykonywać w kółko tych samych poleceń
przewidziano automatyzację zadań VSCode w pliku package.json
utwórz w aplikacji plik package.json (npm init), a w nim w obiekcie scripts
```json
"scripts": {

    "build": "webpack",
    "watch": "webpack --progress --watch",
    "server": "webpack serve --open"

},
```

teraz można w konsoli
```
npm run build
npm run server
npm run watch
```

## watch
wersja do podglądu procesu budowy bundla
## build 
wersja kompilowana do zamieszczenia na serwerze webowym
## server 
odpala webpack dev server - ta wersja uruchamia domyślną przeglądarkę i kompiluje wprowadzane zmiany na bieżąco, wystarczy zapisywać zmienione pliki i odświeżać przeglądarkę


# Plik index.html

do tej pory widzieliśmy tylko efekty pracy webpacka: połączone/skompilowane pliki js
zainstaluj plugin
```
npm install html-webpack-plugin
```

zbuduj projekt
```
npm run build
```
uruchom server
```
npm run server
```

# Build i run w jednym poleceniu

Dla uproszczenia pracy połączymy te dwa polecenia
w ```package.json```, w scripts dodaj opcję wykonującą dwa polecenia: budowania i serwowania, np go
```json
"go": "webpack && webpack serve --open"
```
zmień coś w jednym z plików data1 lub data2 i wykonaj

```npm run go```


Od razu startuje strona html z nowym rezultatem w konsoli


# Statyczny plik html

Generowany plik html jest bardzo podstawowy i jest zerowany od nowa z każdym bildem
warto więc utworzyć swój szablon
utwórz plik index.html (nie chodzi o ten w /dist) i dodaj
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= htmlWebpackPlugin.options.title %></title>
</head>
<body>
    <h1><%= htmlWebpackPlugin.options.h1 %></h1>
    <h2><%= htmlWebpackPlugin.options.h2 %></h2>
</body>
</html>
```

Polecenia wewnątrz %% pobierają stałe dane title, h1,h2 lub inne, z pliku webpack.config.js
```js
plugins: [
    new HtmlWebpackPlugin({
        hash: true,
        filename: './index.html',
        title:"page title",
        template: './index.html',
        h1:"h1",
        h2:"h2"
        })
    ]
```
# Loadery

Do dynamicznego ładowania każdego typu pliku (np css, png) potrzebny jest tzw loader
jest tak tylko wtedy, kiedy chcemy kontrolować ładowanie tych plików za pomocą js
jeśli wystarczą nam statyczne obrazki czy css na stronie, wtedy loadery nie są potrzebne

zainstaluj
```
npm install style-loader css-loader
```

zmiany w webpack.config.js - dodaj:

```js
module.exports = {

    //...

module: {
    rules: [
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }
        ]
},

    //...

}
```

załączenie pliku style.js w index.js
```js
import './style.css';
```

na tym etapie powinny już działać style

 obrazki

podobnie jak css, obrazki mogą być ładowane przez loader webpacka,
```shell
npm install url-loader file-loader --save-devkopiuj
```

wstawiamy do katalogu głównego plik graficzny plik.png

w index.js
```js
import plik from './plik.png';
document.getElementById("img1").src = plik
```

jeśli ładujemy plik statycznie w znaczniku img, czy stylach, to działa jak w html


Zatem Lloadery dla CSS i obrazków
```js
// LOADERS
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ]
    },
```

# Webpack + ThreeJS

spróbuję teraz przedstawić logiczny podział aplikacji ThreeJS na pliki
aplikację będzie można potem rozbudowywać wg tej koncepcji
instalujemy bibliotekę threejs w wersji 126
```shell
npm install three@0.126.0 --save-devkopiuj
```
wydzielimy od razu podstawowe klasy, każda w swoim pliku .js

```Main```
```Camera```
```Renderer```


## Plik index.html

wstaw diva z id=root
usuń pozostałe znaczniki

## Plik index.js

zakomentuj dotychczasową zawartość pliku index.js oprócz stylów
i wstaw
```js
import Main from './components/Main';

function init() {
    //div
    const container = document.getElementById('root');
    //main class object
    new Main(container);
}

init();
```

## Plik Main.js
```js
export default class Main {
constructor() {
console.log("Main constructor")

        // Start render
        this.render();
    }

    render() {

        console.log("render")

        requestAnimationFrame(this.render.bind(this));

    }
}
```

uruchom``` npm run go ```
na razie jeszcze nie ma użytego ThreeJS, ale
już powinien się wyświetlać console.log "render"
