class Vehicle {
  constructor(x, y, posX = random(width), posY = random(height)) {
    this.pos = createVector(posX, posY);
    this.setTarget(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.r = 8;
    this.bg = [80, 140, 255];
    this.maxSpeed = 10;
    this.maxForce = 1;
  }
  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
    return this;
  }
  setTarget(x, y) {
    this.target = createVector(x, y);
  }

  behaviors() {
    let arrive = this.arrive(this.target);
    this.applyForce(arrive);
    return this;
  }

  arrive(target) {
    let desired = p5.Vector.sub(target, this.pos);
    let distance = desired.mag();
    let speed = this.maxSpeed;
    if (distance < 100) {
      speed = map(distance, 0, 100, 0, this.maxSpeed);
    }
    desired.setMag(speed);
    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    return steer;
  }

  applyForce(f) {
    this.acc.add(f);
  }

  show() {
    stroke(...this.bg);
    strokeWeight(this.r);
    point(this.pos.x, this.pos.y);
    return this;
  }
}
