import players from "../assets/kart-*.png";
import { KartPlayer } from "./KartPlayer";

const FPS = 1000 / 60;
const startButton = document.querySelector(".start");
const restartButton = document.querySelector(".restart");
const road = document.querySelector(".road");
const karts = [];
let timer = null;

for (const [name, image] of Object.entries(players)) {  // name: guardamos la key (*), image: imagen del player
    const config = {
        image,                  // Imagen del player
        y: karts.length * 64    // Crea una coordenada y donde va a ir posicionado el personaje
    };
    const kart = new KartPlayer(name, config);          // Equivalente: const kart = document.createElement("kart-player");
    kart.addToRoad(road);       // Método para añadir los karts a la carretera
    karts.push(kart);           // Array de los componentes
}

// Enfoque funcional

const startRace = () => {
    timer = setInterval(() => startIteration(), FPS);   // Ejecuta cada x tiempo (60 fps) la función startIteration()
    startButton.disabled = true;        // Desactivamos el botón
    restartButton.disabled = true;      // Desactivamos el botón
};

const endRace = () => {
    clearInterval(timer);       // Limpiamos el timer del intervalo, no se llama más a startIteration
    karts.forEach(kart => (kart.isWinner() ? kart.win() : kart.lose()));    // Si el kart es ganador, llama al método win(), si no, lose()
    restartButton.disabled = false;     // Reactivmos el botón
}   // Método win() y lose(): De forma visual se represena que kart es el ganador y quien es el perdedor.
/* .win()                                       .lose()
filter: drop-shadow(0 0 6px yellow)             opacity: 0.25;
z-index: 5;
*/
const restartRace = () => {            // Por cada kart reinicias la carrera
    karts.forEach(kart => (kart.restart()));
    startButton.disabled = false;       // Reactivmos el botón
}

const startIteration = () => {                  // Cuanto avanza cada personaje
    karts.forEach(kart => kart.inc());          // Por cada kart, se ejecutar kart.inc(), que hace que avance el kart x pasos
    if (karts.some(kart => kart.isWinner())) endRace(); // Comprobar si algún kart es el ganador y llamamos a endRace
};  // Método isWinner() devuelve true o false, comprobar el eje x para saber si ha llegado al final

startButton.onclick = () => startRace();
restartButton.onclick = () => restartRace();