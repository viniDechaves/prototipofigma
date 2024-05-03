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
    direction: 'down',
    weapon: 'sword'
};

const monsters = [
    { x: 200, y: 200, width: 30, height: 30, health: 100 },
    { x: 400, y: 300, width: 30, height: 30, health: 100 }
];

const weapons = [
    { name: 'sword', damage: 20 },
    { name: 'axe', damage: 30 },
    { name: 'bow', damage: 25 }
];

function drawPlayer() {
    ctx.fillStyle = 'red';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawMonsters() {
    ctx.fillStyle = 'green';
    monsters.forEach(monster => {
        ctx.fillRect(monster.x, monster.y, monster.width, monster.height);
    });
}

function draw() {
    clearCanvas();
    drawPlayer();
    drawMonsters();
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

    // Verifica colisão entre o jogador e os monstros
    monsters.forEach(monster => {
        if (
            player.x < monster.x + monster.width &&
            player.x + player.width > monster.x &&
            player.y < monster.y + monster.height &&
            player.y + player.height > monster.y
        ) {
            // Se houver colisão, você poderia implementar o combate aqui
            console.log('Combate!');
        }
    });
}

const keys = {};

window.addEventListener('keydown', function(e) {
    keys[e.key] = true;
});

window.addEventListener('keyup', function(e) {
    delete keys[e.key];
});

function clearCanvas() {
    ctx.clearRect(0, 0, mapWidth, mapHeight);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();

