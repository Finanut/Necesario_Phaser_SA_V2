export default class MainMenu extends Phaser.Scene {
    constructor() {
        super('MainMenu');
    }

    preload() {
        // Load main menu assets
        this.load.image('menu-bg', '../assets/menu-background.png');
        this.load.image('play-button', '../assets/play-button.png');
        this.load.image('title', '../assets/game-title.jpg');
        // Load audio
        this.load.audio('menu-music', '../assets/audio/menu-music.mp3');
        this.load.audio('button-click', '../assets/audio/button-click.mp3');
    }

    create() {
        // Add background
        this.add.image(400, 300, 'menu-bg');
        
        // Add game title
        this.add.image(400, 150, 'title').setScale(0.6);
        
        // Create play button
        const playButton = this.add.image(400, 350, 'play-button')
            .setInteractive()
            .setScale(0.5);
        
        // Add button hover effect
        playButton.on('pointerover', () => {
            playButton.setScale(0.55);
        });
        
        playButton.on('pointerout', () => {
            playButton.setScale(0.5);
        });
        
        // Start game when button is clicked
        playButton.on('pointerdown', () => {
            // Play button click sound
            this.sound.play('button-click');
            // Start the game with Level 1
            this.sound.stopAll();
            this.scene.start('Level1');
        });
        
        // Add menu music
        const music = this.sound.add('menu-music', {
            volume: 0.5,
            loop: true
        });
        music.play();
        
        // Add game instructions
        this.add.text(400, 450, 'Use Arrow keys to move and jump', {
            fontSize: '20px',
            fill: '#fff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
        
        this.add.text(400, 480, 'Collect 20 stars to complete each level', {
            fontSize: '20px',
            fill: '#fff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
        
        this.add.text(400, 510, 'Avoid bombs!', {
            fontSize: '20px',
            fill: '#fff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
    }
}