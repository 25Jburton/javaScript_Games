// Setup Canvas
const canvas = document.getElementById("game-board");
const ctx = canvas.getContext("2d");

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;

// Basic start game trigger
document.getElementById("startButton").addEventListener("click", function () {
    startGame();
    this.disabled = true;
  });