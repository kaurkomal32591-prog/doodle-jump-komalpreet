let playerX, playerY;
let velocityY = 0;
let gravity = 0.6;

let platforms = [];

function setup() {
  createCanvas(400, 600);

  playerX = width / 2;
  playerY = height - 80;

  // create platforms
  for (let i = 0; i < 8; i++) {
    platforms.push({
      x: random(60, width - 60),
      y: height - i * 80,
      w: 80,
      h: 12
    });
  }
}

function draw() {
  background(220);

  // LEFT / RIGHT movement
  if (keyIsDown(LEFT_ARROW)) playerX -= 5;
  if (keyIsDown(RIGHT_ARROW)) playerX += 5;

  // wrap screen
  if (playerX < -20) playerX = width + 20;
  if (playerX > width + 20) playerX = -20;

  // gravity
  velocityY += gravity;
  playerY += velocityY;

  // PLATFORM COLLISION (AUTO JUMP)
  for (let p of platforms) {
    let platformTop = p.y - p.h / 2;
    let playerBottom = playerY + 20;
    let prevBottom = (playerY - velocityY) + 20;

    let onTop = prevBottom <= platformTop && playerBottom >= platformTop - 8;
    let insideX = playerX >= p.x - p.w / 2 && playerX <= p.x + p.w / 2;

    if (velocityY > 0 && onTop && insideX) {
      velocityY = -12;
    }
  }

  // draw platforms
  rectMode(CENTER);
  fill(60, 160, 255);
  noStroke();
  for (let p of platforms) {
    rect(p.x, p.y, p.w, p.h, 6);
  }

  // draw player
  fill(0, 200, 0);
  ellipse(playerX, playerY, 40, 40);
}
