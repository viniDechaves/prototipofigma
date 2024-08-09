const mario = document.querySelector('.mario');
const block = document.querySelector('.block');
const ground = document.querySelector('.ground');

let marioX = 50;
let marioY = parseInt(window.getComputedStyle(mario).bottom, 10) || 100;
let marioXVelocity = 0;
let marioYVelocity = 0;
let gravity = -0.5;
let jumpStrength = 10;
let isJumping = false;
let marioWidth = mario.offsetWidth;
let marioHeight = mario.offsetHeight;
let blockX = parseInt(window.getComputedStyle(block).left, 10) || 200;
let blockWidth = block.offsetWidth;
let blockHeight = block.offsetHeight;

function update() {
    // Atualiza a posição do Mario
    marioX += marioXVelocity;
    marioY += marioYVelocity;

    // Aplicar gravidade
    if (marioY <= ground.offsetHeight + 100) {
        marioY = ground.offsetHeight + 100;
        marioYVelocity = 0;
        isJumping = false;
    } else {
        marioYVelocity += gravity;
    }

    // Atualiza a posição do bloco (movimento simples)
    blockX -= 2;
    if (blockX < -blockWidth) {
        blockX = window.innerWidth;
    }

    // Verifica colisão com o bloco
    if (marioX < blockX + blockWidth &&
        marioX + marioWidth > blockX &&
        marioY < blockHeight + ground.offsetHeight + 100) {
        marioY = blockHeight + ground.offsetHeight + 100;
        marioYVelocity = 0;
        isJumping = false;
    }

    // Atualiza o estilo dos elementos
    mario.style.left = marioX + 'px';
    mario.style.bottom = marioY + 'px';
    block.style.left = blockX + 'px';

    requestAnimationFrame(update);
}

function moveLeft() {
    marioXVelocity = -5;
}

function moveRight() {
    marioXVelocity = 5;
}

function jump() {
    if (!isJumping) {
        marioYVelocity = jumpStrength;
        isJumping = true;
    }
}

document.addEventListener('keydown', function(event) {
    switch (event.code) {
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
        case 'Space':
            jump();
            break;
    }
});

document.addEventListener('keyup', function(event) {
    if (event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
        marioXVelocity = 0;
    }
});

update();
