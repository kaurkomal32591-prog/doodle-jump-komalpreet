let player;
let platforms = [];
let score = 0;
let gameOver = false;

// ===== SETUP =====
function setup() {
  createCanvas(400, 600);
  restartGame();
}

// ===== DRAW =====
function draw() {
  background(220);

  // GAME OVER SCREEN
  if (gameOver) {
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("GAME OVER", width / 2, height / 2);
    textSize(16);
    text("Press R to restart", width / 2, height / 2 + 40);
    return;
  }

  // LEFT / RIGHT MOVEMENT
  if (keyIsDown(LEFT_ARROW)) player.x -= 4;
  if (keyIsDown(RIGHT_ARROW)) player.x += 4;

  // WRAP SCREEN
  if (player.x < -player.r) player.x = width + player.r;
  if (player.x > width + player.r) player.x = -player.r;

  // UPDATE PLAYER
  player.update();

  // PLATFORM COLLISION
  for (let p of platforms) {
    if (p.checkLanding(player)) {
      player.jump();
    }
  }

  // CAMERA SCROLL
  if (player.y < height / 2 && player.vy < 0) {
    let diff = height / 2 - player.y;
    player.y = height / 2;

    for (let p of platforms) {
      p.y += diff;
    }
    score += Math.floor(diff);
  }

  // RECYCLE PLATFORMS
  for (let p of platforms) {
    if (p.y > height + p.h) {
      p.y = -random(50, 150);
      p.x = random(40, width - 40);
    }
  }

  // FALL = GAME OVER
  if (player.y > height + 60) {
    gameOver = true;
  }

  // DRAW PLATFORMS
  for (let p of platforms) {
    p.draw();
  }

  // DRAW PLAYER
  player.draw();

  // SCORE
  fill(0);
  textSize(16);
  textAlign(LEFT);
  text("Score: " + score, 10, 20);
}

// ===== RESTART =====
function restartGame() {
  score = 0;
  gameOver = false;

  player = new Player(width / 2, height - 80);

  platforms = [];
  for (let i = 0; i < 8; i++) {
    platforms.push(new Platform(random(40, width - 40), height - i * 80));
  }

  platforms[0].x = width / 2;
  platforms[0].y = height - 40;
}

// ===== KEY PRESS =====
function keyPressed() {
  if ((key === 'r' || key === 'R') && gameOver) {
    restartGame();
  }
}

// ===== PLAYER CLASS =====
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 20;
    this.vy = 0;
    this.gravity = 0.6;
    this.jumpPower = -18;
  }

  update() {
    this.vy += this.gravity;
    this.y += this.vy;
  }

  jump() {
    this.vy = this.jumpPower;
  }

  draw() {
    fill(0, 200, 0);
    noStroke();
    ellipse(this.x, this.y, this.r * 2);
  }
}

// ===== PLATFORM CLASS =====
class Platform {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 80;
    this.h = 12;
  }

  draw() {
    fill(60, 160, 255);
    noStroke();
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h, 6);
  }

  checkLanding(player) {
    if (player.vy <= 0) return false;

    let playerBottom = player.y + player.r;
    let prevBottom = (player.y - player.vy) + player.r;
    let platformTop = this.y - this.h / 2;

    let crossed = prevBottom <= platformTop && playerBottom >= platformTop - 6;
    let insideX =
      player.x >= this.x - this.w / 2 &&
      player.x <= this.x + this.w / 2;

    return crossed && insideX;
  }
}

