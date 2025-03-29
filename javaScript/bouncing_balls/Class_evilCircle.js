class Evil_Circle extends Shape {
    constructor(x, y){
        const setVelocity = 20;
        super(x, y, setVelocity, setVelocity);
        // Defaults preset for our circle
        this.color = 'white';
        this.size  = 20;

        // Setup user movement
        window.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "a":
                    this.x -= this.velX;
                    break;
                case "d":
                    this.x += this.velX;
                    break;
                case "w":
                    this.y -= this.velY;
                    break;
                case "s":
                    this.y += this.velY;
                    break;
            }
        });
    }
    

    // Draw method to create our ball
    draw() {
        ctx.beginPath();
        ctx.lineWidth = 3;
        // Assign the color
        ctx.strokeStyle = this.color;
        // Trace an arc shape
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.stroke();
    }

    // Bounds check method
    checkBounds(){
         // Ball going off the right edge
        if ((this.x + this.size) >= width) {
            this.x = +(this.size);
        }
        // Ball going off the left edge
        if ((this.x - this.size) <= 0) {
            this.x = +(this.size);
        }
        // Ball going off the bottom edge
        if ((this.y + this.size) >= height) {
            this.y = +(this.size);
        }
        // Ball going off the top edge
        if ((this.y - this.size) <= 0) {
            this.y = +(this.size);
        }
    }

    // Allow the balls to collide 
    collisionDetect() {
        // Loop all the ball objects
        for (const ball of balls) {
            // Only run on existing balls
            if (ball.exists) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                // When collision is detected
                if (distance < this.size + ball.size) {
                    ball.exists = Boolean(false);
                    let activeBalls = document.getElementById('activeBalls');
                    let activeCount = activeBalls.innerHTML;
                    activeCount --;
                    activeBalls.innerHTML = activeCount;
                    this.size ++;

                    if(activeCount == 0){
                        document.getElementById('gameStatus').innerHTML = 'Mission Completed!'
                    }
                }
            }
        }
    }
}

// Define a method that allows us control the movement of our evil circle
Evil_Circle.prototype.setControls = function() {
    window.onkeydown = function(e) {
        e.preventDefault();
        // Move the Evil Circle Backward
        if(e.keyCode === 37 ) {
            this.coordX += this.velX;
        }
        // Move the Evil Circle forward
        if(e.keyCode === 39 ) {
            this.coordX -= this.velX;
        }
        // Move the Evil Circle UpWard
        if(e.keyCode === 38 ) {
            this.coordY -= this.velY;
        }
        // Move the Evil Circle downWard
        if(e.keyCode === 40 ) {
            this.coordY += this.velY;
        }
    }
}
