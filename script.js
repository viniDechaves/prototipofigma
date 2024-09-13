const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const snakeSize = 20;
const foodSize = 20;
let snake = [{ x: canvas.width / 2, y: canvas.height / 2 }];
let food = { x: Math.random() * (canvas.width - foodSize), y: Math.random() * (canvas.height - foodSize) };
let dx = snakeSize;
let dy = 0;
let score = 0;
let changingDirection = false;

document.addEventListener('keydown', changeDirection);

function gameLoop() {
    changingDirection = false;
    moveSnake();
    if (hasCollided()) {
        resetGame();
    } else {
        if (hasEatenFood()) {
            score += 10;
            growSnake();
            placeFood();
        }
        drawEverything();
    }
    setTimeout(gameLoop, 100);
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    snake.pop();
}

function drawEverything() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, snakeSize, snakeSize);
    });
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, foodSize, foodSize);
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 20);
}

function changeDirection(event) {
    if (changingDirection) return;
    changingDirection = true;

    const keyPressed = event.code;
    switch (keyPressed) {
        case 'ArrowUp':
            if (dy === 0) {
                dx = 0;
                dy = -snakeSize;
            }
            break;
        case 'ArrowDown':
            if (dy === 0) {
                dx = 0;
                dy = snakeSize;
            }
            break;
        case 'ArrowLeft':
            if (dx === 0) {
                dx = -snakeSize;
                dy = 0;
            }
            break;
        case 'ArrowRight':
            if (dx === 0) {
                dx = snakeSize;
                dy = 0;
            }
            break;
    }
}

function hasCollided() {
    const head = snake[0];
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

function hasEatenFood() {
    const head = snake[0];
    return head.x < food.x + foodSize &&
           head.x + snakeSize > food.x &&
           head.y < food.y + foodSize &&
           head.y + snakeSize > food.y;
}

function growSnake() {
    const tail = { ...snake[snake.length - 1] };
    snake.push(tail);
}

function placeFood() {
    food = { x: Math.random() * (canvas.width - foodSize), y: Math.random() * (canvas.height - foodSize) };
}

function resetGame() {
    snake = [{ x: canvas.width / 2, y: canvas.height / 2 }];
    dx = snakeSize;
    dy = 0;
    score = 0;
    placeFood();
}

gameLoop();
