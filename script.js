// Definindo variáveis globais para o jogo
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
    speed: 5
};

// Função para desenhar o jogador
function drawPlayer() {
    ctx.fillStyle = 'red';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Função para limpar o canvas
function clearCanvas() {
    ctx.clearRect(0, 0, mapWidth, mapHeight);
}

// Função para desenhar o jogo
function draw() {
    clearCanvas();
    drawPlayer();
}

// Função para atualizar a posição do jogador
function update() {
    if (keys.ArrowUp && player.y > 0) {
        player.y -= player.speed;
    }
    if (keys.ArrowDown && player.y < mapHeight - player.height) {
        player.y += player.speed;
    }
    if (keys.ArrowLeft && player.x > 0) {
        player.x -= player.speed;
    }
    if (keys.ArrowRight && player.x < mapWidth - player.width) {
        player.x += player.speed;
    }
}

// Definindo variáveis para controle de teclado
const keys = {};

// Event listeners para controlar as teclas pressionadas
window.addEventListener('keydown', function(e) {
    keys[e.key] = true;
});

window.addEventListener('keyup', function(e) {
    delete keys[e.key];
});

// Loop do jogo
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Inicialização do jogo
gameLoop();
