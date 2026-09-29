let fondo;
let sonidoBlup;
let burbujaX;
let burbujaY;
let burbujaTam = 50;
let puntos = 0;
let pezX;
let pezY;
let pezTam = 80;
let estado = 'inicio';   // pantalla actual: 'inicio' o 'jugando'

function preload() {
  fondo = loadImage('imagenes/fondo mar.jpg');
  sonidoBlup = loadSound('audio/blup.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // posición inicial de la burbuja: al azar
  burbujaX = random(50, width - 50);
  burbujaY = random(50, height - 50);

  // posición inicial del pez: el centro de la pantalla
  pezX = width / 2;
  pezY = height / 2;
}

function draw() {
  // fondo: color base + imagen con opacidad baja
  background(0, 30, 60);
  tint(255, 150);
  image(fondo, 0, 0, width, height);
  noTint();

  // según el estado, muestra una pantalla u otra
  if (estado === 'inicio') {
    pantallaInicio();
  } else if (estado === 'jugando') {
    jugar();
  } else if (estado === 'ganaste') {
    pantallaGanaste();
  }
}

function pantallaInicio() {
  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);   // centra el texto en la posición indicada

  textSize(64);
  text('Pescá la burbuja', width / 2, height / 2 - 40);

  textSize(24);
  text('Presioná ESPACIO para empezar', width / 2, height / 2 + 40);

  textAlign(LEFT, BASELINE);   // vuelve a la alineación normal
}

function jugar() {
  // burbuja
  dibujarBurbuja(burbujaX, burbujaY, burbujaTam);

  // el pez se acerca al mouse de a poquito (0.05 = velocidad)
  pezX = pezX + (mouseX - pezX) * 0.05;
  pezY = pezY + (mouseY - pezY) * 0.05;

  // pez
  dibujarPez(pezX, pezY, pezTam);

  // si el pez toca la burbuja: suena, suma un punto y la burbuja cambia de lugar
  let distancia = dist(pezX, pezY, burbujaX, burbujaY);   // distancia en píxeles entre pez y burbuja
  if (distancia < (pezTam + burbujaTam) / 2) {
    sonidoBlup.play();
    puntos = puntos + 1;
    burbujaX = random(50, width - 50);
    burbujaY = random(50, height - 50);

    // cada 5 puntos el pez se agranda
    if (puntos % 5 === 0) {
      pezTam = pezTam + 10;
    }

    // al llegar a 50 puntos, se gana
    if (puntos >= 50) {
      estado = 'ganaste';
    }
  }

  // puntos en pantalla
  noStroke();
  fill(255);
  textSize(32);
  text('Puntos: ' + puntos, 20, 50);
}

function pantallaGanaste() {
  // el pez grande en el centro, festejando
  dibujarPez(width / 2, height / 2 - 120, pezTam);

  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);

  textSize(64);
  text('¡Felicitaciones!', width / 2, height / 2 + 20);

  textSize(28);
  text('Llegaste a ' + puntos + ' puntos', width / 2, height / 2 + 80);

  textSize(20);
  text('Presioná ESPACIO para jugar de nuevo', width / 2, height / 2 + 130);

  textAlign(LEFT, BASELINE);
}

// se ejecuta cada vez que se presiona una tecla
function keyPressed() {
  // desde el inicio, el espacio arranca el juego
  if (key === ' ' && estado === 'inicio') {
    estado = 'jugando';
  }
  // desde la victoria, el espacio reinicia todo
  else if (key === ' ' && estado === 'ganaste') {
    puntos = 0;
    pezTam = 80;
    pezX = width / 2;
    pezY = height / 2;
    estado = 'jugando';
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function dibujarBurbuja(x, y, tam) {
  // cuerpo: casi transparente, con un tinte celeste
  noStroke();
  fill(200, 230, 255, 40);
  circle(x, y, tam);

  // borde: más marcado
  noFill();
  stroke(255, 255, 255, 150);
  strokeWeight(2);
  circle(x, y, tam);

  // brillo principal: arriba a la izquierda
  noStroke();
  fill(255, 255, 255, 200);
  ellipse(x - tam * 0.2, y - tam * 0.2, tam * 0.25, tam * 0.15);

  // reflejo chiquito: abajo a la derecha
  fill(255, 255, 255, 100);
  circle(x + tam * 0.2, y + tam * 0.22, tam * 0.1);
}

function dibujarPez(x, y, tam) {
  noStroke();

  // cola: triángulo violeta, detrás del cuerpo
  fill(140, 60, 200);
  triangle(x - tam * 0.4, y,
           x - tam * 0.75, y - tam * 0.3,
           x - tam * 0.75, y + tam * 0.3);

  // cuerpo: óvalo rojo
  fill(220, 40, 60);
  ellipse(x, y, tam, tam * 0.6);

  // raya del medio: azul
  fill(40, 90, 220);
  ellipse(x, y, tam * 0.15, tam * 0.55);

  // aleta de arriba: violeta
  fill(140, 60, 200);
  triangle(x - tam * 0.2, y - tam * 0.25,
           x + tam * 0.1, y - tam * 0.25,
           x - tam * 0.15, y - tam * 0.5);

  // ojo: blanco con pupila azul
  fill(255);
  circle(x + tam * 0.28, y - tam * 0.08, tam * 0.18);
  fill(20, 40, 120);
  circle(x + tam * 0.3, y - tam * 0.08, tam * 0.09);
}