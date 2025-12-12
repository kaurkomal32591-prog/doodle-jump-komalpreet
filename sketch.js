let playerX;
let playerY;
let velocityY = 0;
let gravity = 0.6;

function setup() {
  createCanvas(400, 600);
  playerX = width / 2;
  playerY = height - 60;
}

function draw() {
  background(220);

  // gravity
  velocityY += gravity;
  playerY += velocityY;

  // ground collision
  if (playerY > height - 40) {
    playerY = height - 40;
    velocityY = 0;
  }

  // player
  fill(0, 200, 0);
  ellipse(playerX, playerY, 40, 40);

  // title
  fill(0);
  textAlign(CENTER);
  text("Doodle Jump – work in progress", width / 2, 30);
}

function keyPressed() {
  if (key === ' ') {
    velocityY = -12; // jump
  }
}
