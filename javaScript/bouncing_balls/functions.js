// function to generate random number
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random color
function randomRGB() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// function to loop the balls in our array
function loop() {
    ctx.fillStyle = "rgb(0 0 0 / 15%)";
    ctx.fillRect(0, 0, width, height);
    // Loop all ball objects created
    for (const ball of balls) {
        evilCircle.draw();
        evilCircle.checkBounds();
        evilCircle.collisionDetect();
        if(ball.exists){
            ball.draw();
            ball.update();
            ball.collisionDetect();
        }
    }
    // Runs the function a set number of times per second
    requestAnimationFrame(loop);
}