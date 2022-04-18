/**@type{HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray = [];

//Title element
const textElement = document.getElementById("text");
let titleMeasurements = textElement.getBoundingClientRect();

let title = {
  x: titleMeasurements.left,
  y: titleMeasurements.top,
  width: titleMeasurements.width,
  height: 10,
};

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.oX1 = 0;
    this.oY1 = 0;
    this.oX2 = 0;
    this.oY2 = 0;
    this.oX3 = 0;
    this.oY3 = 0;
    this.size = Math.random() * 3 + 1.5;
    this.radius = 30;
    this.angle1 = 0 * (Math.PI / 180);
    this.angle2 = 120 * (Math.PI / 180);
    this.angle3 = 240 * (Math.PI / 180);
    this.color = color;
    this.vel = Math.random() * 10 + 10;
    this.wind = -0.5;
    this.weight = Math.random() * 1 + 1;
    this.hue = Math.random() * 255;
  }
  update() {
    this.hue++;
    this.angle1 += 0.1;
    this.angle2 += 0.1;
    this.angle3 += 0.1;

    this.weight += 0.01;
    this.y += this.weight;
    this.x += this.wind;

    this.oX1 = this.x + this.radius * Math.cos(this.angle1);
    this.oY1 = this.y + this.radius * Math.sin(this.angle1);

    this.oX2 = this.x + this.radius * Math.cos(this.angle2);
    this.oY2 = this.y + this.radius * Math.sin(this.angle2);

    this.oX3 = this.x + this.radius * Math.cos(this.angle3);
    this.oY3 = this.y + this.radius * Math.sin(this.angle3);
  }
  collisionDetect() {
    if (
      this.x < title.x + title.width &&
      this.x + this.size + this.radius > title.x &&
      this.y < title.y + title.height &&
      this.y + this.size + this.radius > title.y
    ) {
      this.y -= 10;
      this.weight *= -0.7;
    }
  }
  draw() {
    //center particle
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.fillStyle = "white";
    ctx.strokeStyle = "white";
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    //ctx.stroke();
    ctx.fill();
    ctx.closePath();

    // 1st outer particle
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.fillStyle = "hsl(" + this.hue + ", 50%, 50%)";
    ctx.strokeStyle = "hsl(" + this.hue + ", 50%, 50%)";
    ctx.arc(this.oX1, this.oY1, this.size, 0, Math.PI * 2);
    //ctx.fill();
    ctx.stroke();
    ctx.closePath();

    //2nd outer particle
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.fillStyle = "hsl(" + this.hue + ", 50%, 50%)";
    ctx.strokeStyle = "hsl(" + this.hue + ", 50%, 50%)";
    ctx.arc(this.oX2, this.oY2, this.size, 0, Math.PI * 2);
    //ctx.fill();
    ctx.stroke();

    //3rd outer particle
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.fillStyle = "hsl(" + this.hue + ", 50%, 50%)";
    ctx.strokeStyle = "hsl(" + this.hue + ", 50%, 50%)";
    ctx.arc(this.oX3, this.oY3, this.size, 0, Math.PI * 2);
    //ctx.fill();
    ctx.stroke();
  }
  edges() {
    if (this.y >= canvas.height) {
      this.y = 0;
      this.x = Math.random() * canvas.width;
      this.weight = 0;
    }
    if (this.x >= canvas.width || this.x <= 0) {
      this.y = 0;
      this.x = Math.random() * canvas.width;
      this.weight = 0;
    }
  }
}

function init(x, y) {
  particleArray = [];
  for (let i = 0; i < 50; i++) {
    let x = Math.random() * canvas.width * 2;
    let y = Math.random() * canvas.height;
    particleArray.push(new Particle(x, y));
  }
}
init();

function animate() {
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0,0,0, 0.03)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].update();
    particleArray[i].draw();
    particleArray[i].edges();
    particleArray[i].collisionDetect();
  }

  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  titleMeasurements = textElement.getBoundingClientRect();
  title = {
    x: titleMeasurements.left,
    y: titleMeasurements.top,
    width: titleMeasurements.width,
    height: 10,
  };
  init();
});
