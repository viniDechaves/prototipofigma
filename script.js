const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const canvasWidth = canvas.width = window.innerWidth;
const canvasHeight = canvas.height = window.innerHeight;
const player = {
    x: canvasWidth / 2,
    y: canvasHeight / 2,
    radius: 10,
    speed: 5,
    color: '#fff'
};

function drawPlayer() {
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    ctx.fillStyle = player.color;
    ctx.fill();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

function update() {
    if (keys.ArrowUp && player.y > 0 + player.radius) {
        player.y -= player.speed;
    }
    if (keys.ArrowDown && player.y < canvasHeight - player.radius) {
        player.y += player.speed;
    }
    if (keys.ArrowLeft && player.x > 0 + player.radius) {
        player.x -= player.speed;
    }
    if (keys.ArrowRight && player.x < canvasWidth - player.radius) {
        player.x += player.speed;
    }
}

const keys = {};

window.addEventListener('keydown', function(e) {
    keys[e.key] = true;
});

window.addEventListener('keyup', function(e) {
    delete keys[e.key];
});

function gameLoop() {
    update();
    clearCanvas();
    drawPlayer();
    requestAnimationFrame(gameLoop);
}

gameLoop();

