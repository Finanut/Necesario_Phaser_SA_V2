export default class Congratulations extends Phaser.Scene {
    constructor() {
        super('Congratulations');
    }

    preload() {
        // Load assets for Congratulations scene
        this.load.image('congrats-bg', '../assets/congratulations-background.png');
        this.load.image('menu-button', '../assets/menu-button.png');
        this.load.image('trophy', '../assets/trophy.png');
        
        // Load audio
        this.load.audio('button-click', '../assets/audio/button-click.mp3');
        this.load.audio('congrats-music', '../assets/audio/congratulations-music.mp3');
        this.load.audio('applause', '../assets/audio/applause.mp3');
    }

    create() {
        // Add background
        this.add.image(400, 300, 'congrats-bg');
        
        // Add congratulations text
        const congratsText = this.add.text(400, 120, 'CONGRATULATIONS!', {
            fontSize: '56px',
            fill: '#ffd700', // Gold color
            fontFamily: 'Arial',
            fontWeight: 'bold',
            strokeThickness: 6,
            stroke: '#000'
        }).setOrigin(0.5);
        
        // Animate the congrats text
        this.tweens.add({
            targets: congratsText,
            y: 130,
            duration: 1500,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });
        
        // Add trophy image
        const trophy = this.add.image(400, 250, 'trophy')
            .setScale(0.3);
        
        // Animate the trophy
        this.tweens.add({
            targets: trophy,
            angle: 5,
            duration: 1000,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });
        
        // Add menu button
        const menuButton = this.add.image(400, 450, 'menu-button')
            .setInteractive()
            .setScale(0.5);
        
        // Add button hover effect
        menuButton.on('pointerover', () => {
            menuButton.setScale(0.55);
        });
        
        menuButton.on('pointerout', () => {
            menuButton.setScale(0.5);
        });
        
        // Add button action
        menuButton.on('pointerdown', () => {
            this.sound.play('button-click');
            // Return to main menu
            this.sound.stopAll();
            this.scene.start('MainMenu');
        });
        
        // Add descriptive text
        this.add.text(400, 350, 'You\'ve completed all levels!', {
            fontSize: '28px',
            fill: '#fff',
            fontFamily: 'Arial',
            strokeThickness: 3,
            stroke: '#000'
        }).setOrigin(0.5);
        
        // Add button label
        this.add.text(400, 500, 'Return to Main Menu', {
            fontSize: '24px',
            fill: '#fff',
            fontFamily: 'Arial',
            strokeThickness: 2,
            stroke: '#000'
        }).setOrigin(0.5);
        
        // Play congratulations music
        const music = this.sound.add('congrats-music', {
            volume: 0.5,
            loop: true
        });
        music.play();
        
        // Play applause sound effect
        this.sound.play('applause', { volume: 0.7 });
        
        // Add particles for celebration effect
        const particles = this.add.particles(0, 0, 'star', {
            speed: 100,
            lifespan: 3000,
            quantity: 2,
            scale: { start: 0.2, end: 0 },
            emitting: true,
            emitZone: { type: 'random', source: new Phaser.Geom.Rectangle(0, 0, 800, 100) }
        });
    }
}