let playerX, playerY;
let velocityY = 0;
let gravity = 0.6;
let platforms = [];
let score = 0;
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
function restartGame() {
  // reset player
  playerX = width / 2;
  playerY = height - 80;
  velocityY = 0;
// reset platforms (fresh level)
  platforms = [];
  for (let i = 0; i < 7; i++) {
    platforms.push({
      x: random(50, width - 50),
      y: height - i * 90,
      w: 80,
      h: 12
    });
  }
 // optional: reset score if you have one
  // score = 0;
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
  // camera scroll
if (playerY < height / 2 && velocityY < 0) {
  let diff = height / 2 - playerY;
  playerY = height / 2;

  for (let p of platforms) {
    p.y += diff;
  }

  score += Math.floor(diff);
}
// PLATFORM COLLISION (AUTO JUMP)
  for (let p of platforms) {
    let platformTop = p.y - p.h / 2;
    let playerBottom = playerY + 20;
    let prevBottom = (playerY - velocityY) + 20;

    let onTop = prevBottom <= platformTop && playerBottom >= platformTop - 8;
    let insideX = playerX >= p.x - p.w / 2 && playerX <= p.x + p.w / 2;

    if (velocityY > 0 && onTop && insideX) {
      velocityY = -20; // very high jump
    }
  }
  // if you fall below screen, reset position (simple restart)
if (playerY > height + 60) {
  playerX = width / 2;
  playerY = height - 80;
  velocityY = 0;
}
  // RESTART if you fall below the screen
if (playerY > height + 60) {
  restartGame();
}
  // draw platforms
  rectMode(CENTER);
  fill(60, 160, 255);
  noStroke();
  for (let p of platforms) {
    rect(p.x, p.y, p.w, p.h, 6);
  }
// recycle platforms that went off screen
for (let p of platforms) {
  if (p.y > height + p.h) {
    respawnPlatform(p);
  }
}
  // draw player
  fill(0, 200, 0);
  ellipse(playerX, playerY, 40, 40);
}
fill(0);
textSize(16);
textAlign(LEFT);
text("Score: " + score, 10, 20);
function respawnPlatform(p) {
  p.y = -random(20, 120);          // place above screen
  p.x = random(40, width - 40);    // new random x
}

