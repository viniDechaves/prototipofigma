// Configuração do jogo
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const playerSpeed = 200;
const bulletSpeed = 300;
const bulletDelay = 200;

let player;
let bullets;
let lastFired = 0;

const game = new Phaser.Game(config);

function preload() {
    this.load.image('sky', 'https://examples.phaser.io/assets/skies/space3.png');
    this.load.image('player', 'https://examples.phaser.io/assets/sprites/dude.png');
    this.load.image('bullet', 'https://examples.phaser.io/assets/particles/yellow.png');
}

function create() {
    this.add.image(400, 300, 'sky');

    // Adiciona o jogador
    player = this.physics.add.sprite(400, 500, 'player');
    player.setCollideWorldBounds(true);

    // Adiciona as balas
    bullets = this.physics.add.group({
        defaultKey: 'bullet',
        maxSize: 10
    });

    // Configura as teclas
    this.input.keyboard.on('keydown-LEFT', () => player.setVelocityX(-playerSpeed));
    this.input.keyboard.on('keydown-RIGHT', () => player.setVelocityX(playerSpeed));
    this.input.keyboard.on('keydown-UP', () => player.setVelocityY(-playerSpeed));
    this.input.keyboard.on('keydown-DOWN', () => player.setVelocityY(playerSpeed));
    this.input.keyboard.on('keyup-LEFT', () => player.setVelocityX(0));
    this.input.keyboard.on('keyup-RIGHT', () => player.setVelocityX(0));
    this.input.keyboard.on('keyup-UP', () => player.setVelocityY(0));
    this.input.keyboard.on('keyup-DOWN', () => player.setVelocityY(0));
    this.input.keyboard.on('keydown-SPACE', fireBullet, this);

    // Adiciona colisões
    this.physics.add.collider(bullets, player, hitPlayer, null, this);
}

function update(time) {
    // Verifica se a tecla de atirar foi pressionada
    if (this.input.keyboard.checkDown(this.input.keyboard.addKey('SPACE'), bulletDelay)) {
        fireBullet();
    }
}

function fireBullet() {
    const bullet = bullets.get(player.x, player.y - 20);

    if (bullet) {
        bullet.setActive(true).setVisible(true);
        bullet.setVelocityY(-bulletSpeed);
    }
}

function hitPlayer(player, bullet) {
    bullet.setActive(false).setVisible(false);
    console.log('Hit!');
}
