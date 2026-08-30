// Variables Generales //

const sectionSeleccionarArma = document.getElementById("seleccionar-arma")
const sectionReiniciarJuego = document.getElementById("reiniciar-juego")
const btnAsesinoJugador = document.getElementById("btn-seleccionar");
const btnReiniciar = document.getElementById("btn-reiniciar")

const sectionSeleccionarAsesino = document.getElementById("seleccionar-asesino")

const spanAsesinoJugador = document.getElementById("asesino-jugador");
const spanTemplarioOponente = document.getElementById("templario-oponente");

const spanVidasAsesino = document.getElementById("vidas-asesino")
const spanVidasTemplario = document.getElementById("vidas-templario")

const sectionResultado = document.getElementById("mensajes")

const ataquesDelJugador = document.getElementById("ataques-del-jugador")
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo")

const contenedorPersonajes = document.getElementById("contenedor-personajes")
const contenedorAtaques = document.getElementById("contenedor-ataques")

const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let assasins = []
let templarios = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeAsesinos
let inputEzio
let inputAltair
let inputConnor
let asesinoJugador
let AsesinoJugadorObjeto
let ataquesAsesino
let AtaquesTemplario
let btnHoja
let btnEspada
let btnArma
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = "./assets/Mapa.jpg"

// Creacion de asesinos //

class Assasin {
    constructor(nombre, foto, vida) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.x = 20
        this.y = 30
        this.ancho = 80
        this.alto = 80
        this.mapaFoto = new Image()
        this.mapaFoto.src = foto
        this.velocidadX = 0
        this.velocidadY = 0
    }
}

let altair = new Assasin("Altair", "./assets/Altair", 5)
let ezio = new Assasin("Ezio", "./assets/Ezio", 5)
let connor = new Assasin("Connor", "./assets/Connor", 5)


// Creacion de Templarios // 

class Templario {
    constructor(nombre, vida) {
        this.nombre = nombre
        this.vida = vida
        this.ataques = []
    }
}

let rodrigo = new Templario("Rodrigo Borgia", 5)
let cesare = new Templario("Cesare Borgia", 5)
let haytham = new Templario("Haytham Kenway", 5)

templarios.push(rodrigo, cesare, haytham)


// Creacion de ataques jugador //

altair.ataques.push(
    { nombre: "⚔", id: "btn-hoja" },
    { nombre: "⚔", id: "btn-hoja" },
    { nombre: "⚔", id: "btn-hoja" },
    { nombre: "🗡", id: "btn-espada" },
    { nombre: "🏹 ", id: "btn-arma" },
)

ezio.ataques.push(
    { nombre: "🗡", id: "btn-espada" },
    { nombre: "🗡", id: "btn-espada" },
    { nombre: "🗡", id: "btn-espada" },
    { nombre: "⚔", id: "btn-hoja" },
    { nombre: "🏹", id: "btn-arma" },
)

connor.ataques.push(
    { nombre: "🏹", id: "btn-arma" },
    { nombre: "🏹", id: "btn-arma" },
    { nombre: "🏹", id: "btn-arma" },
    { nombre: "🗡", id: "btn-espada" },
    { nombre: "⚔", id: "btn-hoja" },
)

assasins.push(altair, ezio, connor)


// Creacion de ataques enemigo //

rodrigo.ataques.push(
    { nombre: "⚔", id: "btn-hoja" },
    { nombre: "⚔", id: "btn-hoja" },
    { nombre: "⚔", id: "btn-hoja" },
    { nombre: "🗡", id: "btn-espada" },
    { nombre: "🏹 ", id: "btn-arma" },
)

cesare.ataques.push(
    { nombre: "🗡", id: "btn-espada" },
    { nombre: "🗡", id: "btn-espada" },
    { nombre: "🗡", id: "btn-espada" },
    { nombre: "⚔", id: "btn-hoja" },
    { nombre: "🏹", id: "btn-arma" },
)

haytham.ataques.push(
    { nombre: "🏹", id: "btn-arma" },
    { nombre: "🏹", id: "btn-arma" },
    { nombre: "🏹", id: "btn-arma" },
    { nombre: "🗡", id: "btn-espada" },
    { nombre: "⚔", id: "btn-hoja" },
)


// Iniciar juego //

function iniciarJuego() {

    // ocultar botones de ataque, reinicio y ocultar mapa //

    sectionSeleccionarArma.style.display = "none"
    sectionReiniciarJuego.style.display = "none"
    sectionVerMapa.style.display = "none"

    // Array de Assasins // 

    assasins.forEach((assasin) => {

        opcionDeAsesinos = `
        <input type="radio" name="Asesinos" id=${assasin.nombre} / >
            <label class="tarjeta-seleccionar" for=${assasin.nombre}>
                <p> ${assasin.nombre} </p>
                <img src=${assasin.foto} alt=${assasin.nombre}>
            </label> 
            `
        contenedorPersonajes.innerHTML += opcionDeAsesinos

        inputAltair = document.getElementById("Altair");
        inputEzio = document.getElementById("Ezio");
        inputConnor = document.getElementById("Connor");
    })

    btnAsesinoJugador.addEventListener("click", seleccionarAsesinoJugador)

    // Boton de reiniciar juego //

    btnReiniciar.addEventListener("click", reiniciarJuego)
}


// Selecciona asesino del jugador //

function seleccionarAsesinoJugador() {
    let jugar = 1;

    sectionSeleccionarAsesino.style.display = "none" // Ocultar boton de seleccionar // 

    


    if (inputEzio.checked) {
        spanAsesinoJugador.innerHTML = inputEzio.id
        asesinoJugador = inputEzio.id
    } else if (inputAltair.checked) {
        spanAsesinoJugador.innerHTML = inputAltair.id
        asesinoJugador = inputAltair.id
    } else if (inputConnor.checked) {
        spanAsesinoJugador.innerHTML = inputConnor.id
        asesinoJugador = inputConnor.id
    } else {
        alert("Selecciona un Asesino")
        jugar = 0;
    }

    //Condicional que, si el jugador no selecciona asesino, la pc no selecciona templario //

    if (jugar == 1) {
        extraerAtaques(asesinoJugador)
        seleccionarTemplarioOponente();
    }
    sectionVerMapa.style.display = "flex"
    iniciarMapa()
    pintarCanvas()
}


// Extrar ataques // 

function extraerAtaques(asesinoJugador) {

    let ataques
    for (let i = 0; i < assasins.length; i++) {
        if (asesinoJugador === assasins[i].nombre) {
            ataques = assasins[i].ataques
        }
    }
    mostrarAtaques(ataques)
}


// Mostrar ataques // 

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesAsesino = `
        <button id=${ataque.id} class="boton-ataque BtnAtaque">${ataque.nombre}</button> 
        `
        contenedorAtaques.innerHTML += ataquesAsesino
    })

    // Botones de ataque //

    btnHoja = document.getElementById("btn-hoja")
    btnEspada = document.getElementById("btn-espada")
    btnArma = document.getElementById("btn-arma")
    botones = document.querySelectorAll(".BtnAtaque")
}


// Secuencia de ataque // 

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if (e.target.textContent === "⚔") {
                ataqueJugador.push("Hoja")
                console.log(ataqueJugador)
                boton.style.background = "#581111"
                boton.disabled = true
            } else if (e.target.textContent === "🗡") {
                ataqueJugador.push("Espada")
                console.log(ataqueJugador)
                boton.style.background = "#581111"
                boton.disabled = true
            } else {
                (e.target.textContent === "🏹")
                ataqueJugador.push("Arma")
                console.log(ataqueJugador)
                boton.style.background = "#581111"
                boton.disabled = true
            }
            ataqueAleatorioEnemigo()
        })
    })

}


// Seleccion templario aleatoria del oponente //

function seleccionarTemplarioOponente() {
    let templarioAleatorio = aleatorio(0, templarios.length - 1);

    spanTemplarioOponente.innerHTML = templarios[templarioAleatorio].nombre
    AtaquesTemplario = templarios[templarioAleatorio].ataques

    secuenciaAtaque()
}


// Ataque aleatorio del enemigo // 

function ataqueAleatorioEnemigo() {

    let ataqueAleatorio = aleatorio(0, AtaquesTemplario.length - 1);

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push("Hoja");
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push("Espada");
    } else {
        ataqueEnemigo.push("Arma");
    }
    console.log(ataqueEnemigo)
    iniciarCombate()
}


// Combate //

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function iniciarCombate() {
    if (ataqueJugador.length === 5) {
        combate()
    }
}

function combate() {

    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index)
            crearMensaje("Empate")
        } else if (ataqueJugador[index] === "Hoja" && ataqueEnemigo[index] === "Arma") {
            indexAmbosOponentes(index, index)
            crearMensaje("Ganaste")
            victoriasJugador++
            spanVidasAsesino.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === "Espada" && ataqueEnemigo[index] === "Hoja") {
            indexAmbosOponentes(index, index)
            crearMensaje("Ganaste")
            victoriasJugador++
            spanVidasAsesino.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === "Arma" && ataqueEnemigo[index] === "Espada") {
            indexAmbosOponentes(index, index)
            crearMensaje("Ganaste")
            victoriasJugador++
            spanVidasAsesino.innerHTML = victoriasJugador
        } else {
            indexAmbosOponentes(index, index)
            crearMensaje("Ganaste")
            victoriasEnemigo++
            spanVidasTemplario.innerHTML = victoriasEnemigo
        }
    }
    revisarVictorias()
}


function revisarVictorias() {

    if (victoriasJugador == victoriasEnemigo) {
        crearMensajeFinal("Han empatado")
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("Felicitaciones, has ganado.")
    } else {
        ("Lamentablemente, has perdido.")
    }
}


// Mostrar mensajes //

function crearMensaje(resultado) {

    let nuevoAtaqueDelJugador = document.createElement("p")
    let nuevoAtaqueDelEnemigo = document.createElement("p")

    sectionResultado.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)

}

function crearMensajeFinal(resultadoFinal) {

    sectionResultado.innerHTML = resultadoFinal

    // Visualizar boton de reiniciar juego //

    sectionReiniciarJuego.style.display = 'block'
}


//  Función para reiniciar el juego //

function reiniciarJuego() {
    location.reload()
}


// Funcion aleatoria //

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Pintar personaje //

function pintarCanvas() {
   AsesinoJugadorObjeto.x = AsesinoJugadorObjeto.x + AsesinoJugadorObjeto.velocidadX
   AsesinoJugadorObjeto.y = AsesinoJugadorObjeto.y + AsesinoJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    lienzo.drawImage(
        AsesinoJugadorObjeto.mapaFoto,
        AsesinoJugadorObjeto.x,
        AsesinoJugadorObjeto.y,
        AsesinoJugadorObjeto.ancho,
        AsesinoJugadorObjeto.alto
    )
}

// Mover personaje // 

function moverArriba() {
   AsesinoJugadorObjeto.velocidadY = -5
}

function moverAbajo() {
   AsesinoJugadorObjeto.velocidadY = 5
}

function moverDerecha() {
   AsesinoJugadorObjeto.velocidadX = 5
}

function moverIzquierda() {
   AsesinoJugadorObjeto.velocidadX = -5
}

function detenerMovimiento() {
   AsesinoJugadorObjeto.velocidadX = 0
   AsesinoJugadorObjeto.velocidadY = 0
}

function presionarTecla(event) {
    switch (event.key) {
        case "ArrowUp":
            moverArriba()
            break;
        case "ArrowDown":
            moverAbajo()
            break;
        case "ArrowLeft":
            moverIzquierda()
            break;
        case "ArrowRight":
            moverDerecha()
            break;
    }
}


// Iniciar mapa // 

function iniciarMapa() {

    mapa.width = 320
    mapa.height = 240
    AsesinoJugadorObjeto = obtenerObjetoMascota(asesinoJugador)

    invertalo = setInterval(pintarCanvas, 50)

    window.addEventListener("keydown", presionarTecla)
    window.addEventListener("keyup", detenerMovimiento)
}

// Mostrar personaje seleccionado //

function obtenerObjetoMascota() {
    for (let i = 0; i < assasins.length; i++) {
        if (asesinoJugador === assasins[i].nombre) {
            return assasins[i]
        }
    }

}

// Iniciar juego //

window.addEventListener("load", iniciarJuego);
