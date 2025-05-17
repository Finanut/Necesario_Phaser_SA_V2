// Import all scenes
import Level1 from './scenes/level1.js';
import Level2 from './scenes/level2.js';
import Level3 from './scenes/level3.js';
import MainMenu from './scenes/mainMenu.js';
import GameOver from './scenes/gameOver.js';
import Congratulations from './scenes/congratulations.js';

// Game configuration
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [
    MainMenu,
    Level1,
    Level2,
    Level3,
        GameOver,
        Congratulations
    ]
};

// Initialize the game
const game = new Phaser.Game(config);