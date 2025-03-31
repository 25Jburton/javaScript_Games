// Setup Canvas
const canvas = document.getElementById("game-board");
const ctx = canvas.getContext("2d");
const gameOver = document.getElementById("game-over");
const gameComplete = document.getElementById("game-complete");
const restartBtn = document.getElementById("restart-button");

let x = canvas.width / 2;
let y = canvas.height - 30;
let speed = 1.5;
let dx = speed;
let dy = -speed;
let interval = 0;
let score = 0;
let lives = 3;

// Paddle vars
const paddleHeight = 10;
const paddleWidth = 100;
let paddleX = (canvas.width - paddleWidth) / 2;

// User Control vars
let rightPressed = false;
let leftPressed = false;

// Ball vars
const ballRadius = 10;

// Brick vars
const brickRowCount = 3;
const brickColumnCount = 6;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
const totalBrickCount =  brickRowCount * brickColumnCount;
// Brick array with col and row
const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

// Basic start game trigger
document.getElementById("start-button").addEventListener("click", function () {
  startGame();
  this.disabled = true;
});

// Basic restart game trigger
document.getElementById("restart-button").addEventListener("click", function () {
  restartGame();
});