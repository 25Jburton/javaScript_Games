// Ball object
class Ball extends Shape {
  constructor(x, y, velX, velY, color, size) {
    // Coordinates from parent class
    super(x, y, velX, velY);
    // Color & Size
    this.color = color;
    this.size = size;
    // Does ball exist 
    this.exists = Boolean(true);
  }

  // Draw method to create our ball
  draw() {
    ctx.beginPath();
    // Assign the color
    ctx.fillStyle = this.color;
    // Trace an arc shape
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  // Update method to allow our ball to move
  update() {
    // Ball going off the right edge
    if ((this.x + this.size) >= width) {
      this.velX = -(this.velX);
    }
    // Ball going off the left edge
    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }
    // Ball going off the bottom edge
    if ((this.y + this.size) >= height) {
      this.velY = -(this.velY);
    }
    // Ball going off the top edge
    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }
    // Add the Horizontal & Vertical Velocity
    this.x += this.velX;
    this.y += this.velY;
  }

  // Allow the balls to collide 
  collisionDetect() {
    // Loop all the ball objects
    for (const ball of balls) {
      // Only run on existing balls
      if (!(this === ball) && ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        // When collision is detected
        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}