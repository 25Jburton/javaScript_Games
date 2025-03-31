function drawBall() {
    // Create the circle 
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    // Create the paddle
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
} 

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < brickRowCount; r++) {
        if (bricks[c][r].status === 1) {
            // Ensure bricks are in different places
            const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
            const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            // Create the brick
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "yellow";
            ctx.fill();
            ctx.closePath();
        }
      }
    }
} 

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "yellow";
    ctx.fillText(`Score: ${score}`, 8, 20);
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "yellow";
    ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
}  
  
function gameOverStatus(){
    canvas.style.display = "none";
    gameOver.style.display = "block";
    restartBtn.style.display = "block";
}

function gameCompleteStatus(){
    canvas.style.display = "none";
    gameComplete.style.display = "block";
    restartBtn.style.display = "block";
}

function draw() {
    // Show once, remove the path
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    collisionDetection();
    drawBricks();
    drawScore();
    drawLives();
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
        } else if(score !== totalBrickCount) {
            lives--;
            if(!lives){
                gameOverStatus();
            }else{
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = speed;
                dy = -speed;
                paddleX = (canvas.width - paddleWidth) / 2
            } 
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
    
    requestAnimationFrame(draw);
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

function mouseMoveHandler(e) {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
      paddleX = relativeX - paddleWidth / 2;
    }
}
  
function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];
            if (b.status === 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score === totalBrickCount && lives > 0){
                        gameCompleteStatus();
                    }
                }
            }
        }
    }
}

function restartGame() {
    document.location.reload();
}

function startGame() {
    // Add paddle controls
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("mousemove", mouseMoveHandler, false);
    draw();
}