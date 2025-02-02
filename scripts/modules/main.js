import { global } from "./global.js";
import { Player } from "../gameObjects/player.js";
import { Enemy } from "../gameObjects/enemy.js";
import { Wall } from "../gameObjects/wall.js";
import { AttackTrigger } from "../gameObjects/attackTrigger.js";

function gameLoop(totalRunningTime) {
    global.deltaTime = totalRunningTime - global.prevTotalRunningTime; // Time in milliseconds between frames
    global.deltaTime /= 1000; // Convert milliseconds to seconds for consistency in calculations
    global.prevTotalRunningTime = totalRunningTime; // Save the current state of "totalRunningTime", so at the next call of gameLoop (== next frame) to calculate deltaTime again for that next frame.
    global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height); // Completely clear the canvas for the next graphical output 

    for (var i = 0; i < global.allGameObjects.length; i++) { //loop in the (game)loop -> the gameloop is continous anyways.. and on every cylce we do now loop through all objects to execute several operations (functions) on each of them: update, draw, collision detection, ...
        if (global.allGameObjects[i].active == true) {
            global.allGameObjects[i].storePositionOfPreviousFrame();
            global.allGameObjects[i].update();
            global.checkCollisionWithAnyOther(global.allGameObjects[i]);
            global.allGameObjects[i].draw();
        }
    }

    requestAnimationFrame(gameLoop); // This keeps the gameLoop running indefinitely
}

function setupGame() {
    resetGame();
    document.querySelector("#startScreen").style.display = 'none';

    let wallSize = 52;
    for (let i = 0; i < global.getCanvasBounds().right / wallSize; i++) {
        // top side of the canvas
        new Wall(i * wallSize, 0, wallSize, wallSize);

        // bottom side of the canvas
        new Wall(i * wallSize, global.getCanvasBounds().bottom - wallSize, wallSize, wallSize);

        // left side of the canvas
        new Wall(0, i * wallSize, wallSize, wallSize);

        // right side of the canvas
        new Wall(global.getCanvasBounds().right - wallSize, i * wallSize, wallSize, wallSize);
    }

    global.playerObject = new Player(100, 100, 52, 72);
    global.enemyObject = new Enemy(global.getCanvasBounds().right - 200, global.getCanvasBounds().bottom / 2, 64, 64);

    global.leftAttackTrigger = new AttackTrigger(0, 0, 15, 15);
    global.rightAttackTrigger = new AttackTrigger(0, 0, 15, 15);
    global.centerAttackTrigger = new AttackTrigger(0, 0, 15, 15);

    global.leftAttackTrigger.offset.left = -5;
    global.leftAttackTrigger.offset.top = global.playerObject.height / 2;

    global.rightAttackTrigger.offset.left = global.playerObject.width - 5;
    global.rightAttackTrigger.offset.top = global.playerObject.height / 2;

    global.centerAttackTrigger.offset.left = global.playerObject.width / 2 - 5;
    global.centerAttackTrigger.offset.top = global.playerObject.height / 2;

    global.leftAttackTrigger.name = "leftAttackTrigger";
    global.rightAttackTrigger.name = "rightAttackTrigger";
    global.centerAttackTrigger.name = "centerAttackTrigger";

    requestAnimationFrame(gameLoop);
}

/* this is a fix that makes your game still runable after you left the tab/browser for some time: */
document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
        global.deltaTime = performance.now();
    }
});

// Screens
const startScreen = document.querySelector("#startScreen");
const winScreen = document.querySelector("#winScreen");
const loseScreen = document.querySelector("#loseScreen");
const howToPlayScreen = document.querySelector("#howToPlayScreen");

// Display if time manipulation is active
const timeManipulationDisplay = document.querySelector(".time");

// Buttons
const startGame = document.querySelector("#startGame");
const howToPlay = document.querySelector("#howToPlay");
const back = document.querySelector('#back');
const restartGame = document.querySelector("#restartGame");
const retryGame = document.querySelector("#retryGame");
const endGame = document.querySelector("#endGame");
const finishGame = document.querySelector("#finishGame");

function resetGame() {
    startScreen.style.display = 'flex';
    winScreen.style.display = 'none';
    loseScreen.style.display = 'none';
    timeManipulationDisplay.innerHTML = '';
    global.allGameObjects = [];
}

// start button
startGame.addEventListener('click', setupGame);

howToPlay.addEventListener('click', () => {
    howToPlayScreen.style.display = "flex";
    startScreen.style.display = 'none';
});

// go back button in how to play screen
back.addEventListener("click", () => {
    startScreen.style.display = 'flex';
    howToPlayScreen.style.display = "none";
});

restartGame.addEventListener("click", setupGame);
retryGame.addEventListener("click", setupGame);

endGame.addEventListener("click", resetGame);
finishGame.addEventListener("click", resetGame);