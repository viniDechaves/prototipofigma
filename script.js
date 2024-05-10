const player = document.getElementById('player');

let isJumping = false;
let gravity = 0.9;
let isGameOver = false;

function jump() {
    if (!isJumping && !isGameOver) {
        isJumping = true;
        let jumpCount = 0;
        const jumpInterval = setInterval(() => {
            const playerTop = parseInt(window.getComputedStyle(player).getPropertyValue('top'));
            if (playerTop > 6 * 50 && jumpCount < 15) {
                player.style.top = `${playerTop - 50}px`;
            } else {
                clearInterval(jumpInterval);
                isJumping = false;
                jumpCount = 0;
            }
            jumpCount++;
        }, 30);
    }
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        jump();
    }
});

function gameLoop() {
    const playerTop = parseInt(window.getComputedStyle(player).getPropertyValue('top'));
    if (playerTop < (window.innerHeight - 50)) {
        player.style.top = `${playerTop + gravity}px`;
    }
    if (playerTop >= (window.innerHeight - 50)) {
        isGameOver = true;
        alert("Game Over!");
        location.reload(); // Reload the page to restart the game
    }
}

setInterval(gameLoop, 20);
