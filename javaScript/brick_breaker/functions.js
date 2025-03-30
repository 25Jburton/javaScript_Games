function drawBall() {
    // Create the circle 
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    // Show once, remove the path
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    x += dx;
    y += dy;
}

function startGame() {
    // Call the draw every 10 milliseconds
    setInterval(draw,10);
}