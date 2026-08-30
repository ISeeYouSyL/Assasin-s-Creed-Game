// Variables Generales //
let ataqueJugador
let ataqueEnemigo
let vidasAsesino = 3
let vidasTemplario = 3


//  Función para iniciar el juego //

window.addEventListener("load", iniciarJuego);

function iniciarJuego() {

    // ocultar botones de ataque //

    sectionSeleccionarArma = document.getElementById("seleccionar-arma")
    sectionSeleccionarArma.style.display = "none"
    sectionReiniciarJuego = document.getElementById("reiniciar-juego")
    sectionReiniciarJuego.style.display = "none"


    let btnAsesinoJugador = document.getElementById("btn-seleccionar");
    btnAsesinoJugador.addEventListener("click", seleccionarAsesinoJugador)

    let btnHoja = document.getElementById("btn-hoja")
    btnHoja.addEventListener("click", ataqueHoja)
    let btnEspada = document.getElementById("btn-espada")
    btnEspada.addEventListener("click", ataqueEspada)
    let btnArma = document.getElementById("btn-arma")
    btnArma.addEventListener("click", ataqueArma)

    // Boton de reiniciar juego //

    let btnReiniciar = document.getElementById("btn-reiniciar")
    btnReiniciar.addEventListener("click", reiniciarJuego)
}


// Selecciona asesino del jugador //

function seleccionarAsesinoJugador() {
    let jugar = 1;
    let inputEzio = document.getElementById("ezio-auditore");
    let inputAltair = document.getElementById("altair-ibn-laahad");
    let inputConnor = document.getElementById("connor-kenway");
    let spanAsesinoJugador = document.getElementById("asesino-jugador");


    if (document.getElementById("ezio-auditore").checked) {
        spanAsesinoJugador.innerHTML = "Ezio Auditore";
    } else if (document.getElementById("altair-ibn-laahad").checked) {
        spanAsesinoJugador.innerHTML = "Altair Ibn-La'Ahad";
    } else if (document.getElementById("connor-kenway").checked) {
        spanAsesinoJugador.innerHTML = "Connor Kenway";
    }
    else {
        alert("Selecciona un Asesino")
        jugar = 0;
    }

    //Condicional que, si el jugador no selecciona asesino, la pc no selecciona templario //

    if (jugar == 1) {
        seleccionarTemplarioOponente();
    }

    // Visualizar botones de ataque y ocultar boton de seleccionar // 
    
    sectionSeleccionarAsesino = document.getElementById("seleccionar-asesino")
    sectionSeleccionarAsesino.style.display = "none"

    sectionSeleccionarAsesino = document.getElementById("seleccionar-arma")
    sectionSeleccionarArma.style.display = "flex"
}



// Seleccion templario aleatoria del oponente //

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function seleccionarTemplarioOponente() {
    let TemplarioAleatorio = aleatorio(1, 3);
    let imputRodrigo = document.getElementById("rodrigo-borgia");
    let imputCesare = document.getElementById("cesare-borgia");
    let imputHaytham = document.getElementById("haytham-kenway");
    let spanTemplarioOponente = document.getElementById("templario-oponente");

    if (TemplarioAleatorio == 1) {
        spanTemplarioOponente.innerHTML = "Rodrigo Borgia";
    }
    else if (TemplarioAleatorio == 2) {
        spanTemplarioOponente.innerHTML = "Cesare Borgia";
    }
    else {
        spanTemplarioOponente.innerHTML = "Haytham Kenway";
    }
}


// Seleccionar ataque del jugador. //

function ataqueHoja() {
    ataqueJugador = "Hoja"
    ataqueAleatorioEnemigo()
}

function ataqueEspada() {
    ataqueJugador = "Espada"
    ataqueAleatorioEnemigo()
}

function ataqueArma() {
    ataqueJugador = "Arma"
    ataqueAleatorioEnemigo()
}



// Ataque aleatorio del enemigo // 

function ataqueAleatorioEnemigo() {

    let ataqueAleatorio = aleatorio(1, 3);

    if (ataqueAleatorio == 1) {
        ataqueEnemigo = "Hoja";
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = "Espada";
    } else {
        ataqueEnemigo = "Arma";
    }

    combate()
}


// Combate //

function combate() {

    let spanVidasAsesino = document.getElementById("vidas-asesino")
    let spanVidasTemplario = document.getElementById("vidas-templario")

    if (ataqueEnemigo == ataqueJugador) {
        crearMensaje("EMPATE")
    } else if ((ataqueJugador == "Hoja" && ataqueEnemigo == "Arma") || (ataqueJugador == "Espada" && ataqueEnemigo == "Hoja") || (ataqueJugador == "Arma" & ataqueEnemigo == "Espada")) {
        crearMensaje("GANASTE")
        vidasTemplario--
        spanVidasTemplario.innerHTML = vidasTemplario
    } else {
        crearMensaje("PERDISTE")
        vidasAsesino--
        spanVidasAsesino.innerHTML = vidasAsesino

    }

    revisarVidas()
}

function revisarVidas() {

    if (vidasTemplario == 0) {
        crearMensajeFinal("Felicidades, ganaste.")

    }

    else if (vidasAsesino == 0) {
        crearMensajeFinal("Lo siento, has perdido.")
    }

}


// Mostrar mensajes //

function crearMensaje(resultado) {

    let sectionResultado = document.getElementById("mensajes")
    let ataquesDelJugador = document.getElementById("ataques-del-jugador")
    let ataquesDelEnemigo = document.getElementById("ataques-del-enemigo")

let nuevoAtaqueDelJugador = document.createElement("p")
let nuevoAtaqueDelEnemigo = document.createElement("p")

sectionResultado.innerHTML = resultado
nuevoAtaqueDelJugador.innerHTML = ataqueJugador
nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo

ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)

}

function crearMensajeFinal(resultadoFinal) {

let sectionResultado = document.getElementById("mensajes")

    sectionResultado.innerHTML = resultadoFinal

    // Bloquear botones de ataque al terminar el juego //

    let btnHoja = document.getElementById("btn-hoja")
    btnHoja.disabled = true
    let btnEspada = document.getElementById("btn-espada")
    btnEspada.disabled = true
    let btnArma = document.getElementById("btn-arma")
    btnArma.disabled = true

    // Visualizar boton de reiniciar juego //

    sectionReiniciarJuego.style.display = 'block'
}

//  Función para reiniciar el juego //

function reiniciarJuego() {
    location.reload()
}