let fondo;
let sonidoBlup;
let burbujaX;
let burbujaY;
let burbujaTam = 50;
let puntos = 0;
let pezX;
let pezY;
let pezTam = 80;

function preload() {
  fondo = loadImage('imagenes/fondo mar.jpg');
  sonidoBlup = loadSound('audio/blup.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

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

  // burbuja
  dibujarBurbuja(burbujaX, burbujaY, burbujaTam);

  // el pez se acerca al mouse de a poquito (0.05 = velocidad)
  pezX = pezX + (mouseX - pezX) * 0.05;
  pezY = pezY + (mouseY - pezY) * 0.05;

  // pez
  dibujarPez(pezX, pezY, pezTam);

  // si el pez toca la burbuja: suena, suma un punto y la burbuja cambia de lugar
  let distancia = dist(pezX, pezY, burbujaX, burbujaY);
  if (distancia < (pezTam + burbujaTam) / 2) {
    sonidoBlup.play();
    puntos = puntos + 1;
    burbujaX = random(50, width - 50);
    burbujaY = random(50, height - 50);
  }

  // puntos en pantalla
  noStroke();
  fill(255);
  textSize(32);
  text('Puntos: ' + puntos, 20, 50);
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

function mousePressed() {
  let distancia = dist(mouseX, mouseY, burbujaX, burbujaY); //mide la distancia en píxeles entre dos puntos

  if (distancia < burbujaTam / 2) {
    sonidoBlup.play(); //reproduce el sonido
    puntos = puntos + 1;
    burbujaX = random(50, width - 50);
    burbujaY = random(50, height - 50);
  }
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