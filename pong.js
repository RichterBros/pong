// Set up canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;

// Set up ball
var ball = {
  x: width / 2,
  y: height / 2,
  radius: 10,
  speedX: 1,
  speedY: 1,
};

// Set up paddles
var paddleHeight = 80;
var paddleWidth = 10;

var player1 = {
  x: 10,
  y: height / 2 - paddleHeight / 2,
};

var player2 = {
  x: width - 20,
  y: height / 2 - paddleHeight / 2,
};

// Set up scores
var player1Score = 0;
var player2Score = 0;

// Handle keyboard controls
var keys = [];
document.addEventListener("keydown", function (e) {
  keys[e.keyCode] = true;
});
document.addEventListener("keyup", function (e) {
  keys[e.keyCode] = false;
});

// Draw ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
}

// Draw paddles
function drawPaddles() {
  ctx.fillStyle = "black";
  ctx.fillRect(player1.x, player1.y, paddleWidth, paddleHeight);
  ctx.fillRect(player2.x, player2.y, paddleWidth, paddleHeight);
}

// Move paddles
function movePaddles() {
  // Move player 1 paddle
  if (keys[87] && player1.y > 0) {
    player1.y -= 5;
  } else if (keys[83] && player1.y < height - paddleHeight) {
    player1.y += 5;
  }

  // Move player 2 paddle
  if (keys[38] && player2.y > 0) {
    player2.y -= 5;
  } else if (keys[40] && player2.y < height - paddleHeight) {
    player2.y += 5;
  }
}

// Draw score
function drawScore() {
  ctx.fillStyle = "black";
  ctx.font = "bold 24px Arial";
  ctx.fillText("Player 1: " + player1Score, 50, 30);
  ctx.fillText("Player 2: " + player2Score, width - 150, 30);
}

// Handle collision with walls
function handleWallCollision() {
  if (ball.y - ball.radius < 0 || ball.y + ball.radius > height) {
    ball.speedY = -ball.speedY;
  }
}

// Handle collision with paddles
function handlePaddleCollision() {
  // Check collision with player 1 paddle
  if (
    ball.x - ball.radius < player1.x + paddleWidth &&
    ball.y > player1.y &&
    ball.y < player1.y + paddleHeight
  ) {
    ball.speedX = -ball.speedX;
  }

  // Check collision with player 2 paddle
  if (
    ball.x + ball.radius > player2.x &&
    ball.y > player2.y &&
    ball.y < player2.y + paddleHeight
  ) {
    ball.speedX = -ball.speedX;
  }
}

// Handle scoring
function handleScoring() {
  if (ball.x - ball.radius < 0) {
    player2Score++;
    resetBall();
  } else if (ball.x + ball.radius > width) {
    player1Score++;
    resetBall();
  }
}

// Reset ball to center
function resetBall() {
  ball.x = width / 2;
  ball.y = height / 2;
  ball.speedX = -ball.speedX;
  ball.speedY = -ball.speedY;
}

function increaseBallSpeed() {
  if (event.keyCode == 32) {
    // Check for spacebar key press
    ball.speedX *= 1.5; // Increase ball speed in x direction
    ball.speedY *= 1.5; // Increase ball speed in y direction
  }
}

// Slow down ball function
function slowDownBall() {
  if (event.keyCode == 17) {
    // Check for control key press
    ball.speedX *= 0.9; // Decrease ball speed in x direction
    ball.speedY *= 0.9; // Decrease ball speed in y direction
  }
}

// Add event listener for keydown event
document.addEventListener("keydown", slowDownBall);

// Add event listener for keydown event
document.addEventListener("keydown", increaseBallSpeed);

// Animate function
function animate() {
  // Clear canvas
  ctx.clearRect(0, 0, width, height);

  // Draw ball and paddles
  drawBall();
  drawPaddles();

  ball.x += ball.speedX;
  ball.y += ball.speedY;
  // Move paddles
  movePaddles();

  // Handle collisions
  handleWallCollision();
  handlePaddleCollision();
  handleScoring();

  // Draw score
  drawScore();

  // Call requestAnimationFrame recursively
  requestAnimationFrame(animate);
}

// Call animate function
animate();
