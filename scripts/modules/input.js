import { global } from "./global.js";

let heldKeys = [];
let downShift = false;
let downJ = false;

function move(event) {

    if (!heldKeys.includes(event.key)) {
        heldKeys.push(event.key);
    }

    let lastKey = heldKeys[heldKeys.length - 1];
    switch (lastKey) {
        case "d":
            if (global.playerObject.xVelocity == 0)
                global.playerObject.switchCurrentSprites(9, 11);
            global.playerObject.xVelocity = 100;
            break;
        case "a":
            if (global.playerObject.xVelocity == 0)
                global.playerObject.switchCurrentSprites(6, 8);
            global.playerObject.xVelocity = -100;
            break;
        case "w":
            if (global.playerObject.yVelocity == 0)
                global.playerObject.switchCurrentSprites(3, 5);
            global.playerObject.yVelocity = -100;
            break;
        case "s":
            if (global.playerObject.yVelocity == 0)
                global.playerObject.switchCurrentSprites(0, 2);
            global.playerObject.yVelocity = 100;
            break;

        // special keys
        case 'j':
            if (downJ) {
                global.playerObject.switchCurrentSprites(0, 0);
                global.playerObject.attack = false;
                return;
            }
            downJ = true;
            global.playerObject.switchCurrentSprites(12, 12);
            global.playerObject.attack = true;
            break;
        case "k":
            global.enemyObject.slowDownTime();
            break;
        case "l":
            global.enemyObject.speedUpTime();
            break;
        case "Shift":
            if (downShift) {
                return;
            }
            downShift = true;
            global.playerObject.dash();
            break;
    }
}

function stop(event) {
    // remove the key that is no longer pressed/held down from the heldKeys array
    let deleteKeyIndex = heldKeys.indexOf(event.key);
    heldKeys.splice(deleteKeyIndex, 1);

    switch (event.key) {
        case "d":
            global.playerObject.xVelocity = 0;
            // switch to the idle sprite after letting go of the key
            global.playerObject.switchCurrentSprites(9, 9);
            break;
        case "a":
            global.playerObject.xVelocity = 0;
            global.playerObject.switchCurrentSprites(6, 6);
            break;
        case "w":
            global.playerObject.yVelocity = 0;
            global.playerObject.switchCurrentSprites(3, 3);
            break;
        case "s":
            global.playerObject.yVelocity = 0;
            global.playerObject.switchCurrentSprites(0, 0);
            break;
        case "j":
            downJ = false;
            global.playerObject.attack = false;
            global.playerObject.switchCurrentSprites(0, 0);
            break;
        case "Shift":
            downShift = false;
            break;
    }

    changeSpriteDirection(heldKeys[heldKeys.length - 1]);
}

// change direction according to the last key pressed/held
function changeSpriteDirection(key) {
    switch (key) {
        case "d":
            global.playerObject.switchCurrentSprites(9, 11);
            global.playerObject.xVelocity = 100;
            break;
        case "a":
            global.playerObject.switchCurrentSprites(6, 8);
            global.playerObject.xVelocity = -100;
            break;
        case "w":
            global.playerObject.switchCurrentSprites(3, 5);
            global.playerObject.yVelocity = -100;
            break;
        case "s":
            global.playerObject.switchCurrentSprites(0, 2);
            global.playerObject.yVelocity = 100;
            break;
    }
}

document.addEventListener("keydown", move);

document.addEventListener("keyup", stop);