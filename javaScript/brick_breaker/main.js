// Setup Canvas
const canvas = document.getElementById("game-board");
const ctx = canvas.getContext("2d");
const gameOver = document.getElementById("game-over");
const restartBtn = document.getElementById("restart-button");
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let interval = 0;
// Paddle vars
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
// User Control vars
let rightPressed = false;
let leftPressed = false;
// Ball vars
const ballRadius = 10;
// Basic start game trigger
document.getElementById("start-button").addEventListener("click", function () {
  startGame();
  this.disabled = true;
});

// Basic restart game trigger
document.getElementById("restart-button").addEventListener("click", function () {
  restartGame();
});