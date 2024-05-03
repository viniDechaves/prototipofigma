const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const tileSize = 20;
const canvasSize = canvas.width;
const snake = [{ x: 10, y: 10 }];
let dx = 0;
let dy = 0;
let foodX;
let foodY;
let score = 0;

function drawSnake() {
    snake.forEach(drawSnakePart);
}

function drawSnakePart(snakePart) {
    ctx.fillStyle = '#008000';
    ctx.fillRect(snakePart.x * tileSize, snakePart.y * tileSize, tileSize, tileSize);
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    const hasEatenFood = snake[0].x === foodX && snake[0].y === foodY;
    if (hasEatenFood) {
        score++;
        generateFood();
    } else {
        snake.pop();
    }
}

function drawFood() {
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(foodX * tileSize, foodY * tileSize, tileSize, tileSize);
}

function generateFood() {
    foodX = Math.floor(Math.random() * (canvasSize / tileSize));
    foodY = Math.floor(Math.random() * (canvasSize / tileSize));
    snake.forEach(part => {
        if (foodX === part.x && foodY === part.y) {
            generateFood();
        }
    });
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);
}

function drawScore() {
    ctx.fillStyle = '#000';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 30);
}

function main() {
    if (isGameOver()) {
        alert('Game Over! Your score: ' + score);
        return;
    }
    setTimeout(function onTick() {
        clearCanvas();
        drawFood();
        moveSnake();
        drawSnake();
        drawScore();
        main();
    }, 100);
}

function isGameOver() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    return (
        snake[0].x < 0 ||
        snake[0].x >= canvasSize / tileSize ||
        snake[0].y < 0 ||
        snake[0].y >= canvasSize / tileSize
    );
}

document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const keyPressed = event.keyCode;

    const goingUp = dy === -1;
    const goingDown = dy === 1;
    const goingRight = dx === 1;
    const goingLeft = dx === -1;

    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -1;
        dy = 0;
    }

    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -1;
    }

    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 1;
        dy = 0;
    }

    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 1;
    }
}

generateFood();
main();
