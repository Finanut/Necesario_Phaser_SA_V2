# YourSurname's Cat Catcher

## Overview
YourSurname's Cat Catcher is a fun and engaging game built using the Phaser framework. The objective of the game is to collect stars while avoiding bombs. As players collect stars, they can experience exciting gameplay features such as character color changes, size increases, and an infinite falling star mechanic.

## Features
- **Infinitely Falling Stars**: After collecting a star, it will continue to fall indefinitely, adding to the challenge.
- **Character Color Change Sequence**: The player's character will change colors as they collect stars, providing visual feedback on progress.
- **Stars Collected UI**: A user interface element displays the number of stars collected, enhancing player engagement.
- **Size Increase**: After collecting 5 stars, the player's character will increase in size, making it more challenging to navigate.
- **Lose Condition**: Colliding with a bomb results in a "Game Over" message, adding a layer of difficulty to the game.
- **Improved Design**: The game utilizes a spritesheet for character animations and various assets for a polished look.

## Project Structure
```
YourSurname-Cat-Catcher
├── assets
│   ├── images
│   │   ├── bomb.png
│   │   ├── star.png
│   │   └── background.png
│   ├── spritesheets
│   │   └── character.png
├── src
│   ├── main.js
│   ├── scenes
│   │   ├── BootScene.js
│   │   ├── GameScene.js
│   │   └── UIScene.js
├── index.html
├── package.json
└── README.md
```

## Setup Instructions
1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the required dependencies using npm:
   ```
   npm install
   ```
4. Open `index.html` in a web browser to start the game.

## Gameplay Mechanics
- Use the arrow keys to move the character and collect stars.
- Avoid bombs to prevent losing the game.
- Keep track of your star collection in the UI.

## License
This project is licensed under the MIT License. Feel free to modify and distribute as you wish.