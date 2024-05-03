const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const tileSize = 50;
const numRows = 12;
const numCols = 16;
const mapWidth = numCols * tileSize;
const mapHeight = numRows * tileSize;
const player = {
    x: 50,
    y: 50,
    width: 20,
    height: 20,
    speed: 5,
    direction: 'down'
};

const npc = {
    x: 400,
    y: 300,
    width: 20,
    height: 20
};

function drawPlayer() {
    ctx.fillStyle = 'red';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawNPC() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(npc.x, npc.y, npc.width, npc.height);
}

function clearCanvas() {
    ctx.clearRect(0, 0, mapWidth, mapHeight);
}

function draw() {
    clearCanvas();
    drawPlayer();
    drawNPC();
}

function update() {
    if (keys.ArrowUp && player.y > 0) {
        player.y -= player.speed;
        player.direction = 'up';
    }
    if (keys.ArrowDown && player.y < mapHeight - player.height) {
        player.y += player.speed;
        player.direction = 'down';
    }
    if (keys.ArrowLeft && player.x > 0) {
        player.x -= player.speed;
        player.direction = 'left';
    }
    if (keys.ArrowRight && player.x < mapWidth - player.width) {
        player.x += player.speed;
        player.direction = 'right';
    }

    // Verifica colisão entre o jogador e o NPC
    if (
        player.x < npc.x + npc.width &&
        player.x + player.width > npc.x &&
        player.y < npc.y + npc.height &&
        player.y + player.height > npc.y
    ) {
        // Se houver colisão, você poderia implementar algum tipo de interação com o NPC aqui
        console.log('Você encontrou o NPC!');
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
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
