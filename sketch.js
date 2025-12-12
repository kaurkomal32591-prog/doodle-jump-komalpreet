function setup() {
  createCanvas(400, 600);
}

function draw() {
  background(220);

  // Player (temporary circle)
  fill(0, 200, 0);
  ellipse(width / 2, height - 60, 40, 40);

  fill(0);
  textAlign(CENTER);
  textSize(14);
  text("Doodle Jump – work in progress", width / 2, 30);
}
