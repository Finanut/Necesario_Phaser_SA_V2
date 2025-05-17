export default class GameOver extends Phaser.Scene {
    constructor() {
        super('GameOver');
    }

    init(data) {
        // Get the level that the player was on when they lost
        this.level = data.level || 'Level1';
    }

    preload() {
        // Load assets for Game Over scene
        this.load.image('game-over-bg', '../assets/game-over-background.png');
        this.load.image('retry-button', '../assets/retry-button.png');
        this.load.image('menu-button', '../assets/menu-button.png');
        
        // Load audio
        this.load.audio('button-click', '../assets/audio/button-click.mp3');
        this.load.audio('game-over-music', '../assets/audio/game-over-music.mp3');
    }

    create() {
        // Add background
        this.add.image(400, 300, 'game-over-bg');
        
        // Add game over text
        this.add.text(400, 150, 'GAME OVER', {
            fontSize: '64px',
            fill: '#ff0000',
            fontFamily: 'Arial',
            fontWeight: 'bold',
            strokeThickness: 6,
            stroke: '#000'
        }).setOrigin(0.5);
        
        // Add retry button
        const retryButton = this.add.image(300, 350, 'retry-button')
            .setInteractive()
            .setScale(0.5);
        
        // Add menu button
        const menuButton = this.add.image(500, 350, 'menu-button')
            .setInteractive()
            .setScale(0.5);
        
        // Add button hover effects
        retryButton.on('pointerover', () => {
            retryButton.setScale(0.55);
        });
        
        retryButton.on('pointerout', () => {
            retryButton.setScale(0.5);
        });
        
        menuButton.on('pointerover', () => {
            menuButton.setScale(0.55);
        });
        
        menuButton.on('pointerout', () => {
            menuButton.setScale(0.5);
        });
        
        // Add button actions
        retryButton.on('pointerdown', () => {
            this.sound.play('button-click');
            // Restart the level the player was on
            this.sound.stopAll();
            this.scene.start(this.level);
        });
        
        menuButton.on('pointerdown', () => {
            this.sound.play('button-click');
            // Return to main menu
            this.sound.stopAll();
            this.scene.start('MainMenu');
        });
        
        // Add descriptive text
        this.add.text(400, 250, 'Oh no! You hit a bomb!', {
            fontSize: '28px',
            fill: '#fff',
            fontFamily: 'Arial',
            strokeThickness: 3,
            stroke: '#000'
        }).setOrigin(0.5);
        
        // Add button labels
        this.add.text(300, 400, 'Retry Level', {
            fontSize: '24px',
            fill: '#fff',
            fontFamily: 'Arial',
            strokeThickness: 2,
            stroke: '#000'
        }).setOrigin(0.5);
        
        this.add.text(500, 400, 'Main Menu', {
            fontSize: '24px',
            fill: '#fff',
            fontFamily: 'Arial',
            strokeThickness: 2,
            stroke: '#000'
        }).setOrigin(0.5);
        
        // Play game over music
        const music = this.sound.add('game-over-music', {
            volume: 0.5,
            loop: true
        });
        music.play();
    }
}