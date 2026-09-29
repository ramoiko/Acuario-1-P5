let fondo;
let sonidoBlup;
let burbujaX;
let burbujaY;
let burbujaTam = 50;

function preload() {
  fondo = loadImage('imagenes/fondo mar.jpg');
  sonidoBlup = loadSound('audio/blup.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  burbujaX = random(50, width - 50);
  burbujaY = random(50, height - 50);
}

function draw() {
  background(0, 30, 60);
  tint(255, 150);
  image(fondo, 0, 0, width, height);
  noTint();

  dibujarBurbuja(burbujaX, burbujaY, burbujaTam);
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