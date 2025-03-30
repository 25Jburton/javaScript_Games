function drawBall() {
    // Create the circle 
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}  

function draw() {
    // Show once, remove the path
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    x += dx;
    y += dy;
    // Set left and right boundaries
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    // Set top and bottom boundaries
    if (y + dy < ballRadius) {
        dy = -dy;
    }else if(y + dy > canvas.height - ballRadius){
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            canvas.style.display = "none";
            gameOver.style.display = "block";
            restartBtn.style.display = "block";
        }
    }
    x += dx;
    y += dy;

    // Paddle movement
    if (rightPressed) {
        paddleX = Math.min(paddleX + 7, canvas.width - paddleWidth);
    } else if (leftPressed) {
        paddleX = Math.max(paddleX - 7, 0);
    }
      
      
}

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight" || e.key === 'd' || e.key === 'D') {
      rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft" || e.key === 'a' || e.key === 'A') {
      leftPressed = true;
    }
  }
  
  function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight" || e.key === 'd' || e.key === 'D') {
      rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft" || e.key === 'a' || e.key === 'A') {
      leftPressed = false;
    }
  }

function restartGame() {
    document.location.reload();
    clearInterval(interval);
}

function startGame() {
    // Add paddle controls
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    // Call the draw every 10 milliseconds
    interval = setInterval(draw, 10);
}