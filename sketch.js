let player;
let platforms = [];
let score = 0;
let gameOver = false;

function setup() {
  createCanvas(400, 600);
  restartGame();
}

function draw() {
  background(220);

  if (gameOver) {
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("GAME OVER", width / 2, height / 2);
    textSize(16);
    text("Press R to restart", width / 2, height / 2 + 40);
    return;
  }
if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) player.x -= 4;   // A
if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) player.x += 4;  // D

  if (player.x < -player.r) player.x = width + player.r;
  if (player.x > width + player.r) player.x = -player.r;
  player.update();
  for (let p of platforms) {
    if (p.checkLanding(player)) {
      player.jump();
    }
  }
  if (player.y < height / 2 && player.vy < 0) {
    let diff = height / 2 - player.y;
    player.y = height / 2;

    for (let p of platforms) {
      p.y += diff;
    }
    score += Math.floor(diff);
  }
  for (let p of platforms) {
    if (p.y > height + p.h) {
      p.y = -random(50, 150);{
      p.x = random(40, width - 40);
      p.breakable = random() < 0.3;
      p.broken = false;
      p.breakTimer = 0;
    }
  }
  if (player.y > height + 60) {
    gameOver = true;
  }
  for (let p of platforms) 
    if (p.breakTimer > 0) {
      p.breakTimer--;
      if (p.breakTimer === 0) this.broken = true;
 }
    p.draw();
  }
  player.draw();
  fill(0);
  textSize(16);
  textAlign(LEFT);
  text("Score: " + score, 10, 20);
}

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
function keyPressed() {
  if ((key === 'r' || key === 'R') && gameOver) {
    restartGame();
  }
}
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
class Platform {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 80;
    this.h = 12;
    this.breakable = random() < 0.3;
    this.broken = false;
    this.breakTimer = 0;
  }

  draw() {
    if (this.broken) return;

    noStroke();
    rectMode(CENTER);
    if (this.breakable) fill(255, 90, 90);
    else fill(60, 160, 255);

    rect(this.x, this.y, this.w, this.h, 6);
  }

  checkLanding(player) {
    if (this.broken) return false;
    if (player.vy <= 0) return false;

    let playerBottom = player.y + player.r;
    let prevBottom = (player.y - player.vy) + player.r;
    let platformTop = this.y - this.h / 2;

    let crossed = prevBottom <= platformTop && playerBottom >= platformTop - 6;
    let insideX =
      player.x >= this.x - this.w / 2 &&
      player.x <= this.x + this.w / 2;

    if (crossed && insideX) {
      if (this.breakable && this.breakTimer === 0) {
        this.broken = true;
      }
      return true;
    }

    return false;
  }
}
