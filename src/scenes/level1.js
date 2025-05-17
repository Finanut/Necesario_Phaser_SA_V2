export default class Level1 extends Phaser.Scene {
    constructor() {
        super('Level1');
    }

    // Class properties for game objects
    cursors;
    platforms;
    stars;
    bombs;
    player;
    starsCollected = 0;
    starsText;
    levelText;
    gameOver = false;
    targetStars = 10; // Stars needed to complete the level
    
    playerColors = [
        0xFF0000, // Red
        0xFF7F00, // Orange
        0xFFFF00, // Yellow
        0x00FF00, // Green
        0x0000FF, // Blue
        0x4B0082, // Indigo
        0x9400D3  // Violet
    ];
    currentColorIndex = 0;
    
    preload() {
        // Load assets for Level 1 theme - Forest
        this.load.image('sky', '../assets/level1/sky.png');
        this.load.image('ground', '../assets/level1/platform.png');
        this.load.image('star', '../assets/star.png');
        this.load.image('bomb', '../assets/bomb.png');
        this.load.spritesheet('dude', '../assets/dude.png', { frameWidth: 32, frameHeight: 48 });
        
        // Load audio
        this.load.audio('collect-star', '../assets/audio/collect-star.mp3');
        this.load.audio('level-music', '../assets/audio/background-music.mp3');
        this.load.audio('level-complete', '../assets/audio/level-complete.mp3');
        this.load.audio('game-over', '../assets/audio/game-over.mp3');
        this.load.audio('jump', '../assets/audio/jump.mp3');
    }

    create() {
        // Add background
        this.add.image(400, 300, 'sky');

        // Create static platforms group
        this.platforms = this.physics.add.staticGroup();

        // Create ground
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        // Create platforms - custom layout for Level 1
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');
        //this.platforms.create(300, 320, 'ground');
        //this.platforms.create(500, 150, 'ground');

        // Create player sprite
        this.player = this.physics.add.sprite(100, 450, 'dude');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.player.setTint(this.playerColors[0]); // Set initial color to red

        // Add animations for player movement
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        // Create cursor keys for input
        this.cursors = this.input.keyboard.createCursorKeys();

        // Create stars group
        this.stars = this.physics.add.group();
        
        // Create initial stars (3 at a time)
        for (let i = 0; i < 3; i++) {
            this.createStar();
        }

        // Create bombs group
        this.bombs = this.physics.add.group();
        
        // Add stars collected text at top-right
        this.starsText = this.add.text(16, 16, 'Stars: 0/' + this.targetStars, { 
            fontSize: '24px', 
            fill: '#fff',
            fontFamily: 'Arial',
            strokeThickness: 2,
            stroke: '#000'
        });
        
        // Add level indicator
        this.levelText = this.add.text(680, 16, 'Level: 1/3', { 
            fontSize: '24px', 
            fill: '#fff',
            fontFamily: 'Arial',
            strokeThickness: 2,
            stroke: '#000'
        });

        // Add colliders
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.collider(this.bombs, this.platforms);

        // Add overlaps
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
        this.physics.add.overlap(this.player, this.bombs, this.hitBomb, null, this);
        
        // Play background music
        this.levelMusic = this.sound.add('level-music', {
            volume: 0.3,
            loop: true
        });
        this.levelMusic.play();
        
        // Create sounds
        this.jumpSound = this.sound.add('jump', { volume: 0.5 });
        this.collectSound = this.sound.add('collect-star', { volume: 0.5 });
        this.levelCompleteSound = this.sound.add('level-complete', { volume: 0.7 });
        this.gameOverSound = this.sound.add('game-over', { volume: 0.7 });
    }

    update() {
        if (this.gameOver) {
            return;
        }

        // Handle player movement
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        // Handle jumping
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
            this.jumpSound.play();
        }
        
        // Check if stars are below the screen and regenerate them
        this.stars.getChildren().forEach(star => {
            if (star.y > 600) {
                star.disableBody(true, true);
                this.createStar();
            }
        });
    }

    createStar() {
        // Generate random x position between 0 and 800
        const x = Phaser.Math.Between(0, 800);
        
        // Create a star at the random position just above the screen
        const star = this.stars.create(x, 0, 'star');
        
        // Add physics properties
        star.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        star.setCollideWorldBounds(true);
        star.setVelocity(Phaser.Math.Between(-100, 100), 20);
    }

    createBomb() {
        // Create bomb at a position away from the player
        const x = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        
        // Create a bomb
        const bomb = this.bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setScale(0.5);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }

    collectStar(player, star) {
        // Disable the star
        star.disableBody(true, true);
        
        // Play collect sound
        this.collectSound.play();
        
        // Increment stars collected
        this.starsCollected++;
        
        // Update the UI
        this.starsText.setText('Stars: ' + this.starsCollected + '/' + this.targetStars);
        
        // Change player color - cycle through the rainbow colors
        this.currentColorIndex = (this.currentColorIndex + 1) % this.playerColors.length;
        this.player.setTint(this.playerColors[this.currentColorIndex]);
        
        // Every 5 stars, increase player size by 10%
        if (this.starsCollected % 5 === 0) {
            const newScale = this.player.scaleX * 1.1;
            this.player.setScale(newScale);
        }
        
        // Create a new star
        this.createStar();
        
        // Create a bomb every 5 stars
        if (this.starsCollected % 5 === 0) {
            this.createBomb();
        }
        
        // Check if level is complete
        if (this.starsCollected >= this.targetStars) {
            // Level complete!
            this.levelMusic.stop();
            this.levelCompleteSound.play();
            
            // Pause for a moment before transitioning
            this.time.delayedCall(2000, () => {
                this.scene.start('Level2');
            });
            
            // Display level complete message
            const completeText = this.add.text(400, 300, 'LEVEL COMPLETE!', {
                fontSize: '48px',
                fill: '#fff',
                fontFamily: 'Arial',
                strokeThickness: 6,
                stroke: '#000'
            }).setOrigin(0.5);
            
            // Add a nice animation
            this.tweens.add({
                targets: completeText,
                scaleX: 1.2,
                scaleY: 1.2,
                duration: 200,
                yoyo: true,
                repeat: 5
            });
        }
    }

    hitBomb(player, bomb) {
        // Stop physics
        this.physics.pause();
        
        // Stop the music
        this.levelMusic.stop();
        
        // Play game over sound
        this.gameOverSound.play();
        
        // Turn player red and stop animation
        player.setTint(0xff0000);
        player.anims.play('turn');
        
        // Make player disappear after a short delay
        this.tweens.add({
            targets: player,
            alpha: 0,
            duration: 800,
            ease: 'Power2'
        });
        
        // Set game over flag
        this.gameOver = true;
        
        // Add delay before going to Game Over scene
        this.time.delayedCall(2000, () => {
            this.scene.start('GameOver', { level: 'Level1' });
        });
    }
}