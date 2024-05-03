// Lógica do jogo em JavaScript aqui
let playerLevel = 1;
let playerHealth = 100;

let monsterLevel = 1;
let monsterHealth = 50;

document.getElementById('attack-btn').addEventListener('click', () => {
    attackMonster();
});

function attackMonster() {
    const playerDamage = Math.floor(Math.random() * 10) + 1;
    monsterHealth -= playerDamage;
    if (monsterHealth <= 0) {
        monsterLevel++;
        monsterHealth = 50 + (monsterLevel * 10);
        logMessage("Você derrotou o monstro! Novo monstro apareceu.");
    } else {
        const monsterDamage = Math.floor(Math.random() * 8) + 1;
        playerHealth -= monsterDamage;
        if (playerHealth <= 0) {
            logMessage("Você foi derrotado pelo monstro!");
            // Reiniciar o jogo ou algo assim
        } else {
            logMessage(`Você causou ${playerDamage} de dano. O monstro causou ${monsterDamage} de dano.`);
        }
    }
    updateUI();
}

function logMessage(message) {
    const logElement = document.createElement('p');
    logElement.textContent = message;
    document.getElementById('log').appendChild(logElement);
}

function updateUI() {
    document.getElementById('player-level').textContent = playerLevel;
    document.getElementById('player-health').textContent = playerHealth;
    document.getElementById('monster-level').textContent = monsterLevel;
    document.getElementById('monster-health').textContent = monsterHealth;
}
