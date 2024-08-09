const bird = document.querySelector('.bird');
const pipe = document.querySelector('.pipe');
const topPipe = document.querySelector('.pipe.top');
const gameContainer = document.querySelector('.game-container');
const scoreElement = document.querySelector('.score');

let birdY = gameContainer.clientHeight / 2;
let birdYVelocity = 0;
let gravity = 0.5;
let flapStrength = -10;
let pipeX = gameContainer.clientWidth;
let pipeWidth = 60;
let pipeGap = 200;
let pipeSpeed = 2;
let score = 0;

function update() {
    birdYVelocity += gravity;
    birdY += birdYVelocity;
    pipeX -= pipeSpeed;

    if (pipeX < -pipeWidth) {
        pipeX = gameContainer.clientWidth;
        topPipe.style.height = Math.random() * (gameContainer.clientHeight - pipeGap - 100) + 'px';
        score++;
        scoreElement.textContent = score;
    }

    if (birdY < 0 || birdY > gameContainer.clientHeight - 100) {
        resetGame();
    }

    if (pipeX < 80 && pipeX + pipeWidth > 20) {
        let pipeTopHeight = parseFloat(topPipe.style.height);
        if (birdY < pipeTopHeight || birdY > pipeTopHeight + pipeGap) {
            resetGame();
        }
    }

    bird.style.bottom = birdY + 'px';
    pipe.style.left = pipeX + 'px';
    topPipe.style.left = pipeX + 'px';
    requestAnimationFrame(update);
}

function flap() {
    birdYVelocity = flapStrength;
}

function resetGame() {
    birdY = gameContainer.clientHeight / 2;
    birdYVelocity = 0;
    pipeX = gameContainer.clientWidth;
    score = 0;
    scoreElement.textContent = score;
}

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        flap();
    }
});

update();

