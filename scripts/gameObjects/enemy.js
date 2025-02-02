import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

const timeManipulationDisplay = document.querySelector(".time");
const loseScreen = document.querySelector("#loseScreen");

class Enemy extends BaseGameObject {
    name = "Enemy";
    hp = 8;
    xVelocity = 80;
    yVelocity = 80;
    slowActive = false;
    speedActive = false;
    slowDownRate = 0.2;
    speedUpRate = 1.6;
    previousVelocityX;
    previousVelocityY;
    elapsedTimeAfterAttack = 2;

    getBoxBounds = function () {
        let bounds = {
            left: this.x + 9,
            right: this.x + this.width - 19,
            top: this.y + 4,
            bottom: this.y + this.height - 3
        }
        return bounds;
    };
    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.08,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 0,
        "currentSpriteIndex": 0
    };

    update = function () {
        this.elapsedTimeAfterAttack += global.deltaTime;

        this.chasePlayer();

        this.x += this.xVelocity * global.deltaTime;
        this.y += this.yVelocity * global.deltaTime;

        if (this.hp > 0)
            this.hp += 0.05 * global.deltaTime;
        if (this.hp > 8)
            this.hp = 8;

        this.drawHealthBar(this.x, this.y - 12, 60, 10, this.hp, 8, "red");
    }

    chasePlayer = function () {
        let bounds = this.getBoxBounds();
        let playerBounds = global.centerAttackTrigger.getBoxBounds();
        if (bounds.left > playerBounds.right && this.xVelocity > 0) {
            this.xVelocity = -this.xVelocity;
            this.switchCurrentSprites(9, 11);
        }
        // enemy goes right
        if (bounds.right < playerBounds.left && this.xVelocity < 0) {
            this.xVelocity = -this.xVelocity;
            this.switchCurrentSprites(0, 2);
        }
        // enemy goes up
        if (bounds.top > playerBounds.bottom && this.yVelocity > 0) {
            this.yVelocity = -this.yVelocity;
        }
        // enemy goes down
        if (bounds.bottom < playerBounds.top && this.yVelocity < 0) {
            this.yVelocity = -this.yVelocity;
        }

        if (Math.abs(this.y - global.playerObject.y) < 3 && (this.xVelocity > 0 && Math.abs(bounds.right - playerBounds.left) < 20)) {
            this.yVelocity = 0;
            this.xVelocity = 0;
            global.enemyObject.switchCurrentSprites(3, 8);

        }
        if (Math.abs(this.y - global.playerObject.y) < 3 && this.xVelocity < 0 && Math.abs(playerBounds.right - bounds.left) < 20) {
            this.xVelocity = 0;
            this.yVelocity = 0;
            global.enemyObject.switchCurrentSprites(12, 17);

        }
    }

    generateVelocity = function () {
        this.elapsedTimeAfterStop = 0;
        this.xVelocity = 80;
        this.yVelocity = 80;

        // apply time-manipulation
        if (this.slowActive) {
            // this.storePreviousVelocity();
            this.xVelocity *= this.slowDownRate;
            this.yVelocity *= this.slowDownRate;
        }
        else if (this.speedActive) {
            // this.storePreviousVelocity();
            this.xVelocity *= this.speedUpRate;
            this.yVelocity *= this.speedUpRate;
        }
    }

    reactToCollision = function (collidingObject) {
        if (collidingObject.name == "Wall") {
            this.x = this.previousX;
            this.y = this.previousY;
            this.chasePlayer();
        }
    }

    attackPlayer = function () {
        // faster attacks (shorter cooldowns) if speed is active
        if (this.speedActive && this.elapsedTimeAfterAttack > 1.5 && this.hp > 0) {
            global.playerObject.reduceHP();

            if (global.playerObject.hp <= 0 && this.hp > 0) {
                global.playerObject.hp = 0;
                loseScreen.style.display = 'flex';
            }
            this.elapsedTimeAfterAttack = 0;
            return;
        }

        // slower attacks (longer cooldowns) if slow is active
        if (this.slowActive && this.elapsedTimeAfterAttack > 5.5 && this.hp > 0) {
            global.playerObject.reduceHP();

            if (global.playerObject.hp <= 0 && this.hp > 0) {
                global.playerObject.hp = 0;
                loseScreen.style.display = 'flex';
            }
            this.elapsedTimeAfterAttack = 0;
            return;
        }

        // default attack speed (cooldown)
        if (this.elapsedTimeAfterAttack > 3 && !this.slowActive && this.hp > 0) {
            global.playerObject.reduceHP();

            if (global.playerObject.hp <= 0 && this.hp > 0) {
                global.playerObject.hp = 0;
                loseScreen.style.display = 'flex';
            }
            this.elapsedTimeAfterAttack = 0;
        }
    }

    storePreviousVelocity = function () {
        this.previousVelocityX = this.xVelocity;
        this.previousVelocityY = this.yVelocity;
    }

    slowDownTime = function () {
        if (global.playerObject.hp <= 0) {
            global.playerObject.hp = 0;
            return;
        }

        this.slowActive = !this.slowActive;

        // display text on screen
        if (this.slowActive)
            timeManipulationDisplay.innerHTML = "Slow active";
        else
            timeManipulationDisplay.innerHTML = "";

        // reset to default velocity first before applying slow
        if (this.speedActive) {
            this.speedActive = false;
            this.xVelocity = this.previousVelocityX;
            this.yVelocity = this.previousVelocityY;
        }

        // apply slow if slow is active
        if (this.slowActive) {
            this.storePreviousVelocity();
            this.xVelocity *= this.slowDownRate;
            this.yVelocity *= this.slowDownRate;
        }
        // remove slow if slow it not active
        else {
            this.xVelocity = this.previousVelocityX;
            this.yVelocity = this.previousVelocityY;
        }
    }

    speedUpTime = function () {
        if (global.playerObject.hp <= 0) {
            global.playerObject.hp = 0;
            return;
        }

        this.speedActive = !this.speedActive;

        // display text on screen
        if (this.speedActive)
            timeManipulationDisplay.innerHTML = "Speed active";
        else
            timeManipulationDisplay.innerHTML = "";

        // reset to default velocity first before applying slow
        if (this.slowActive) {
            this.slowActive = false;
            this.xVelocity = this.previousVelocityX;
            this.yVelocity = this.previousVelocityY;
        }

        // apply speed if speed is active
        if (this.speedActive) {
            this.storePreviousVelocity();
            this.xVelocity *= this.speedUpRate;
            this.yVelocity *= this.speedUpRate;
        }
        // remove speed is speed is not active
        else {
            this.xVelocity = this.previousVelocityX;
            this.yVelocity = this.previousVelocityY;
        }
    }

    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.loadImagesFromSpritesheet("./images/enemy.png", 9, 2);
    }
}

export { Enemy }