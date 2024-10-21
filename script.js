let nivelActual = 1;
let secuenciaCorrecta = [];
let secuenciaJugador = [];
let puntos = 0;

// Función para iniciar el juego y mostrar el primer nivel
document.getElementById("iniciarJuego").addEventListener("click", function() {
    document.getElementById("menu-inicio").style.display = "none";
    document.getElementById("juego").style.display = "block";
    iniciarNivel1(); // Iniciar el primer nivel
});

// Función para mostrar las instrucciones
document.getElementById("instruccionesJuego").addEventListener("click", function() {
    document.getElementById("menu-inicio").style.display = "none";
    document.getElementById("instrucciones").style.display = "block"; // Muestra la sección de instrucciones
});

// Función para volver al menú principal desde las instrucciones
document.getElementById("volverMenu").addEventListener("click", function() {
    document.getElementById("instrucciones").style.display = "none";
    document.getElementById("menu-inicio").style.display = "block"; // Vuelve al menú
});

// Función para actualizar la barra de progreso
function actualizarBarraProgreso() {
    const porcentaje = (nivelActual / totalNiveles) * 100; // Calcular el porcentaje de progreso
    document.getElementById("progreso").style.width = porcentaje + "%"; // Actualizar el ancho de la barra
}

// Función para actualizar puntuación
function actualizarPuntuacion(puntosGanados) {
    puntos += puntosGanados;
    document.getElementById("puntos").textContent = puntos;
}

// Función para validar secuencia
function validarSecuencia(paso, boton) {
    secuenciaJugador.push(paso);

    if (secuenciaJugador.length === secuenciaCorrecta.length) {
        if (JSON.stringify(secuenciaJugador) === JSON.stringify(secuenciaCorrecta)) {
            document.getElementById("resultado").textContent = "¡Secuencia correcta! Has completado el nivel.";
            actualizarPuntuacion(10);

            switch (nivelActual) {
                case 1:
                    avanzarANivel2();
                    break;
                case 2:
                    avanzarANivel3();
                    break;
                case 3:
                    avanzarANivel4();
                    break;
                default:
                    break; // Opcional: maneja el caso si nivelActual no es 1, 2 o 3
            }
        } else {
            document.getElementById("resultado").textContent = "Secuencia incorrecta. Perdiste los puntos.";
            puntos = 0;
            document.getElementById("puntos").textContent = puntos;
            secuenciaJugador = [];
        }
    }
}

// Nivel 1
function iniciarNivel1() {
    secuenciaJugador = [];
    secuenciaCorrecta = [1, 2, 3]; // Secuencia correcta para nivel 1
    document.getElementById("nivel1").style.display = "block";

    document.getElementById("abrirGabinete").addEventListener("click", function() {
        validarSecuencia(1, this);
    });
    document.getElementById("tomarCamara").addEventListener("click", function() {
        validarSecuencia(2, this);
    });
    document.getElementById("cerrarGabinete").addEventListener("click", function() {
        validarSecuencia(3, this);
    });
}

// Avanzar a Nivel 2
function avanzarANivel2() {
    nivelActual++;
    actualizarBarraProgreso();
    document.getElementById("nivel1").style.display = "none";
    document.getElementById("nivel2").style.display = "block";
    document.getElementById("nivelTitulo").textContent = "Nivel 2: Encender la Cámara";
    iniciarNivel2();
}

// Nivel 2
function iniciarNivel2() {
    secuenciaJugador = [];
    secuenciaCorrecta = [1, 2]; // Secuencia para nivel 2

    document.getElementById("encenderCamara").addEventListener("click", function() {
        validarSecuencia(1, this);
    });
    document.getElementById("verificarPanel").addEventListener("click", function() {
        validarSecuencia(2, this);
    });
}

// Avanzar a Nivel 3
function avanzarANivel3() {
    nivelActual++;
    actualizarBarraProgreso();
    document.getElementById("nivel2").style.display = "none";
    document.getElementById("nivel3").style.display = "block";
    document.getElementById("nivelTitulo").textContent = "Nivel 3: Cambiar el Modo de Captura";
    iniciarNivel3();
}

// Nivel 3
function iniciarNivel3() {
    secuenciaJugador = [];
    secuenciaCorrecta = [1]; // Solo un paso: seleccionar modo
    document.getElementById("modoFoto").addEventListener("click", function() {
        validarSecuencia(1, this);
    });
    document.getElementById("modoVideo").addEventListener("click", function() {
        validarSecuencia(1, this);
    });
}

// Avanzar a Nivel 4
function avanzarANivel4() {
    nivelActual++;
    actualizarBarraProgreso();
    document.getElementById("nivel3").style.display = "none";
    document.getElementById("nivel4").style.display = "block";
    document.getElementById("nivelTitulo").textContent = "Nivel 4: Capturar Imagen";
    iniciarNivel4();
}

// Nivel 4
function iniciarNivel4() {
    secuenciaJugador = [];
    secuenciaCorrecta = [1]; // Solo un paso: capturar imagen
    document.getElementById("capturarImagen").addEventListener("click", function() {
        validarSecuencia(1, this);
    });
}
