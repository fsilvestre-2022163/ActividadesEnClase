const palabras = ["profesor", "ropa", "computadora", "teclado", "lapicero", "mochila", "manzana", "silla", "telefono", "reloj"];
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let fraseOculta;
let encontrada = [];
let oportunidades = 7;
let letrasUsadas = [];

function generarFrase() {
  fraseOculta = palabras[Math.floor(Math.random() * palabras.length)];
  encontrada = Array(fraseOculta.length).fill("_");
  document.getElementById("palabra").textContent = encontrada.join(" ");
}

function graficar(intentos) {
  

  if (intentos < 7) {
    context.beginPath();    
    context.lineTo(50, 350);
    context.lineTo(50, 50);
    context.lineTo(100, 50);
    context.lineTo(100, 100);
    context.moveTo(50, 350); 
    context.lineTo(100, 350); 
    context.stroke(); 
    }


  if (intentos < 6) {
    context.beginPath();
    context.arc(100, 130, 30, 0, Math.PI * 2);
    context.stroke();
  }

  if (intentos < 5) {
    context.beginPath();
    context.moveTo(100, 160);
    context.lineTo(100, 260);
    context.stroke();
  }

  if (intentos < 4) {
    context.beginPath();
    context.moveTo(100, 200);
    context.lineTo(60, 160);
    context.stroke();
  }

  if (intentos < 3) {
    context.beginPath();
    context.moveTo(100, 200);
    context.lineTo(140, 160);
    context.stroke();
  }

  if (intentos < 2) {
    context.beginPath();
    context.moveTo(100, 260);
    context.lineTo(60, 300);
    context.stroke();
  }

  if (intentos < 1) {
    context.beginPath();
    context.moveTo(100, 260);
    context.lineTo(140, 300);
    context.stroke();
  }
}

function actualizarInterfaz() {
  document.getElementById("oportunidades").textContent = oportunidades;
  document.getElementById("palabra").textContent = encontrada.join(" ");
  document.getElementById("letras-usadas-text").textContent = letrasUsadas.join(", ");
}

function terminado() {
  if (encontrada.join("") === fraseOculta) {
    document.getElementById("mensaje").textContent = "Ganaste!!!";
  } else if (oportunidades === 0) {
    document.getElementById("mensaje").textContent = "PERDISTE:(";   
    document.getElementById("mensaje").textContent ="La palabra era: " + fraseOculta;
  }
}


function empezar(letra) {
  if (letrasUsadas.includes(letra)) {
    return; 
  }

  letrasUsadas.push(letra);

  if (fraseOculta.includes(letra)) {
    for (let i = 0; i < fraseOculta.length; i++) {
      if (fraseOculta[i] === letra) {
        encontrada[i] = letra;
      }
    }

  } else {
    oportunidades--;
    graficar(oportunidades);
    
  }
  document.getElementById(letra).classList.add("letraUsada");
  actualizarInterfaz();
  terminado();

  document.getElementById(letra).setAttribute("disabled", true);
}

function inicializar() {
  generarFrase();
  graficar(oportunidades);
  actualizarInterfaz();
}

document.addEventListener("DOMContentLoaded", () => {
  const letras = "abcdefghijklmnopqrstuvwxyz";
  const contenedorLetras = document.getElementById("letras");

  for (const letra of letras) {
    const button = document.createElement("button");
    button.textContent = letra;
    button.id = letra;
    button.addEventListener("click", () => {
      if (oportunidades > 0 && !letrasUsadas.includes(letra)) {
        empezar(letra);
      }
    });
    contenedorLetras.appendChild(button);
  }

  inicializar();
});

