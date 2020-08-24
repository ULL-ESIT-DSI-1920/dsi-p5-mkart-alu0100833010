// Datos:   Condición de final de carrera: x >= 950
//          Utilizar ShadowDOM
//          Añadir métodos: .inc() incrementa la cantidad a la que avanza el kart
//                          .setSpeed() velocidad que toma el kart 
//                          .win() y .lose() que establece un kart ganador o perdedor
//                          .isWinner() comprueba si un kart es ganador x >= 950
//                          .addToRoad() añade los personajes a la carretera
//                          .restart() reiniciar la carrera

export class KartPlayer extends HTMLElement {
    // Constructor
    constructor (name, config) {
        super();                                // Llamamos a la clase padre (HTMLElement)
        this.attachShadow({mode: 'open'});      // Creamos el ShadowDOM
        this.name = name;                       // Nombre del personaje
        this.image = config.image;              // Imagen del personaje
        this.y = config.y;                      // Posición y del personaje
        this.x = 0;                             // Posición x del personaje, comienza en 0.
    }

    get styles() {
        return ` 
            :host {
                position: absolute;
                display: inline-block;
                left: ${this.x}px;
                top: ${this.y}px;
                transform: translateX(var(--x)) translateY(var(--y));
                transition: transform 0.25s;
                will-change: transformM
            }
            .winner {
                filter: drop-shadow(0 0 6px yellow);
                z-index: 5;
            }
            .loser {
                opacity: 0.25;
            }
    `;
    }

    render() {                                  // Trabajamos sobre el ShadowDOM
        this.shadowRoot.innerHTML = `           
        <style>${this.styles}</style>
        <item-kart></item-kart>
        <img src="${this.image}" alt="${this.name}">
        `;
    }

    inc() {                                     // Incrementa la cantidad que avanza el kart (eje x)
        this.x += 1;
        this.setSpeed();
        this.render();
    }

    setSpeed() {                                          // Variamos la velocidad a la que avanza cada kart (eje x)
        this.x += Math.floor(Math.random() * 5) + 2;      // Incrementa la velodad un numero aleatorio entre 5 y 2
    }

    win() {
        this.shadowRoot.innerHTML = `           
        <style>${this.styles}</style>
        <item-kart></item-kart>
        <img class="winner" src="${this.image}" alt="${this.name}">
        `;
    }

    lose() {
        this.shadowRoot.innerHTML = `           
        <style>${this.styles}</style>
        <item-kart></item-kart>
        <img class="loser" src="${this.image}" alt="${this.name}">
        `;
    }

    isWinner() {
        if (this.x >= 950)
            return true;
        else
            return false;
    }

    addToRoad(road) {
        road.appendChild(this);
        this.render();
    }

    restart() {
        this.x = 0;
        this.render();
    }
}

customElements.define('kart-player', KartPlayer);  // Activamos y definimos la etiqueta asociada a la clase