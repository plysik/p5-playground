let canvas;
function setup() {
  canvas = createCanvas(layout.windowWidth(), layout.windowHeight());
}
function draw() {
  if (mouseIsPressed) {
    fill(0);
  } else {
    fill(255);
  }
  ellipse(mouseX, mouseY, 80, 80);
}
