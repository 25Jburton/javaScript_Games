// setup canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// Empty array for all our balls
const balls = [];
const activeBalls = document.getElementById('activeBalls');
let activeCount = 0;
let evilCircle = new Evil_Circle(25,25);
evilCircle.setControls();
// Set the number of balls we want to create
while (balls.length < 25) {
  // Set the size range for our balls
  const size = random(10, 20);
  // Call ball object to create new ball
  const ball = new Ball(
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size,
  );
  // Add the new ball to our array
  balls.push(ball);
  activeCount++;
  activeBalls.innerHTML = activeCount;
}

loop();