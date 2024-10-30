let nivelActual = 1;
let secuenciaCorrecta = [];
let secuenciaJugador = [];
let puntos = 0;
let totalNiveles = 4;
let NombreNivel = ["Introducción","Encender la Cámara","Cambiar el Modo de Captura","Capturar Imagen"]

// Función para iniciar el juego y mostrar el primer nivel
document.getElementById("iniciarJuego").addEventListener("click", function () {
    document.getElementById("menu-inicio").style.display = "none";
    document.getElementById("juego").style.display = "block";
    iniciarNivel(nivelActual); // Iniciar el primer nivel
});

// Función para mostrar las instrucciones
document.getElementById("instruccionesJuego").addEventListener("click", function () {
    document.getElementById("menu-inicio").style.display = "none";
    document.getElementById("instrucciones").style.display = "block"; // Muestra la sección de instrucciones
});

// Función para volver al menú principal desde las instrucciones
document.getElementById("volverMenu").addEventListener("click", function () {
    document.getElementById("instrucciones").style.display = "none";
    document.getElementById("menu-inicio").style.display = "block"; // Vuelve al menú
});

// Función para actualizar puntuación
function actualizarPuntuacion(puntosGanados) {
    puntos += puntosGanados;
    document.getElementById("puntos").textContent = puntos;
}

// Función para validar secuencia
function validarSecuencia(paso, boton) {
    secuenciaJugador.push(paso);

    if (secuenciaJugador.length === secuenciaCorrecta.length) {
        let secuenciaCorrectaEsCorrecta = true;

        // Compara las secuencias
        for (let i = 0; i < secuenciaCorrecta.length; i++) {
            if (secuenciaJugador[i] !== secuenciaCorrecta[i]) {
                secuenciaCorrectaEsCorrecta = false;
                break;
            }
        }

        if (secuenciaCorrectaEsCorrecta) {
            document.getElementById("resultado").textContent = "¡Secuencia correcta! Has completado el nivel.";
            actualizarPuntuacion(10);
            actualizarBarraProgreso();

            // Verifica si hay más niveles y avanza
            if (nivelActual < totalNiveles) {
                avanzarANivel(nivelActual + 1); // Avanza al siguiente nivel
            } else {
                document.getElementById("resultado").textContent = "¡Has completado todos los niveles!";
            }
        } else {
            document.getElementById("resultado").textContent = "Secuencia incorrecta. Perdiste los puntos.";
            puntos = 0;
            document.getElementById("puntos").textContent = puntos;
            secuenciaJugador = [];
        }
    }
}


// Avanzar a Nivel
function avanzarANivel(nivel) {
    nivelActual = nivel; // Actualiza el nivel actual

    // Oculta todos los niveles
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`nivel${i}`).style.display = "none"; // Asumiendo que tienes niveles del 1 al 4
    }

    // Muestra el nivel correspondiente
    document.getElementById(`nivel${nivel}`).style.display = "block";

    // Actualiza el título del nivel
    document.getElementById("nivelTitulo").textContent = `Nivel ${nivel}: ${NombreNivel[nivel - 1]}`;

    // Inicia el nivel correspondiente
    iniciarNivel(nivel);
}

function iniciarNivel(nivel) {
    secuenciaJugador = [];
    switch (nivel) {
        case 1:
            secuenciaCorrecta = [1, 2, 3]; // Secuencia correcta para nivel 1
            document.getElementById("nivel1").style.display = "block";

            document.getElementById("abrirGabinete").addEventListener("click", function () {
                validarSecuencia(1, this);
            });
            document.getElementById("tomarCamara").addEventListener("click", function () {
                validarSecuencia(2, this);
            });
            document.getElementById("cerrarGabinete").addEventListener("click", function () {
                validarSecuencia(3, this);
            });
            return;
        case 2:
            secuenciaCorrecta = [1, 2]; // Secuencia para nivel 2

            document.getElementById("encenderCamara").addEventListener("click", function () {
                validarSecuencia(1, this);
            });
            document.getElementById("verificarPanel").addEventListener("click", function () {
                validarSecuencia(2, this);
            });
            return;
        case 3:
            secuenciaCorrecta = [1]; // Solo un paso: seleccionar modo
            document.getElementById("modoFoto").addEventListener("click", function () {
                validarSecuencia(1, this);
            });
            document.getElementById("modoVideo").addEventListener("click", function () {
                validarSecuencia(1, this);
            });
            return;
        case 4:
            secuenciaCorrecta = [1]; // Solo un paso: capturar imagen
            document.getElementById("capturarImagen").addEventListener("click", function () {
                validarSecuencia(1, this);
                actualizarBarraProgreso()
            });
            return;
    }
}

// Función para actualizar la barra de progreso
function actualizarBarraProgreso() {
    const porcentaje = (nivelActual / totalNiveles) * 100; // Calcular el porcentaje de progreso
    document.getElementById("progreso").style.width = porcentaje + "%"; // Actualizar el ancho de la barra
}