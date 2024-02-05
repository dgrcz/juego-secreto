let numeroSecreto = 0;
let intentos = 0;
let numerosSorteados = [];
let numeroMaximo = 10;

//Creo una función que me permite asignar texto a etiquetas del HTML
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

//Creo una función para generar un número aleatorio
function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
    
    //Imprimo en la consola la lista y el número secreto
    console.log(numeroGenerado);
    console.log(numerosSorteados);

    //Si ya se sortearon todos los numeros
    if (numerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p', 'No hay más intentos');
    } else {
        //Si el número generado esta en la lista
        if (numerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            numerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }

    
}

//Creo una función para el boton "Intentar"
function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('numeroUsuario').value);
    
    if (numeroDeUsuario === numeroSecreto) {
       asignarTextoElemento('p', `¡Acertaste el número en ${intentos} ${intentos === 1 ? 'intento' : 'intentos'}!`);
       document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        //El usuario no acerto
        if (numeroDeUsuario < numeroSecreto) {
            asignarTextoElemento('p', 'El número secreto es mayor');
        } else {
            asignarTextoElemento('p','El número secreto es menor');
        }
        intentos++;
        limpiarInput();
    }
    return;
}

function limpiarInput() {
    document.querySelector('#numeroUsuario').value = '';
}

function juegoNuevo() {
    asignarTextoElemento('h1', 'Juego del número secreto');
    asignarTextoElemento('p', 'Indica un número del 1 al ' + numeroMaximo);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function reiniciarJuego() {
    //Limpiar el input
    limpiarInput();

    //Indico el mensaje inicial, genero nuevo número y reinicio intentos
    juegoNuevo();

    //Desactivar el boton "Nuevo juego"
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

juegoNuevo();