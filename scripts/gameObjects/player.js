import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js";

class Player extends BaseGameObject {
    name = "Player";
    hp = 5;
    xVelocity = 0;
    yVelocity = 0;
    elapsedTimeAfterDamage = 2;
    dashActive = false;
    dashDuration = 0;
    dashCoolDown = 1;
    dashVelocity = 100;
    attack = false;

    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.08,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 0,
        "currentSpriteIndex": 0
    };

    update = function () {
        this.x += this.xVelocity * global.deltaTime;
        this.y += this.yVelocity * global.deltaTime;
        this.elapsedTimeAfterDamage += global.deltaTime;
        this.dashCoolDown += global.deltaTime;

        if (this.dashActive) {
            this.dashDuration += global.deltaTime;
            if (this.dashDuration >= 0.125) {
                if (this.xVelocity > 0)
                    this.xVelocity -= this.dashVelocity;
                else if (this.xVelocity < 0)
                    this.xVelocity += this.dashVelocity;
                if (this.yVelocity > 0) {
                    this.yVelocity -= this.dashVelocity;
                }
                else if (this.yVelocity < 0) {
                    this.yVelocity += this.dashVelocity;
                }
                this.dashCoolDown = 0;
                this.dashDuration = 0;
                this.dashActive = false;
            }
        }

        this.updatePlayerHP();
        this.drawHealthBar(this.x, this.y - 12, 60, 10, this.hp, 5, "green");
    }

    updatePlayerHP = function () {
        // lose hp if slow is active
        if (global.enemyObject.slowActive) {
            this.hp -= 0.25 * global.deltaTime;
            if (this.hp <= 0 && global.enemyObject.hp > 0) {
                this.hp = 0;
                document.querySelector("#loseScreen").style.display = 'flex';
            }
        }

        // gain hp if speed is active
        if (global.enemyObject.speedActive) {
            // makes sure you don't gain hp when hp is already 0 or lower
            if (this.hp <= 0) {
                this.hp = 0;
                return;
            }

            // gain hp here
            this.hp += 0.25 * global.deltaTime;
            if (this.hp >= 5) {
                this.hp = 5;
            }
        }
    }

    reactToCollision = function (collidingObject) {
        if (collidingObject.name == "Wall") {
            this.x = this.previousX;
            this.y = this.previousY;
        }

        // attack the enemy if player is close enough/colliding with enemy
        // makes the enemy immune to damage for 1.3 seconds (cooldown for attack)
        if (collidingObject.name == "Enemy" && this.elapsedTimeAfterDamage >= 1.3 && this.attack) {
            global.enemyObject.reduceHP();
            this.elapsedTimeAfterDamage = 0;
            if (global.enemyObject.hp <= 0 && this.hp > 0) {
                document.querySelector("#winScreen").style.display = "flex";
            }
        }
    }

    dash = function () {
        if (this.dashCoolDown > 0.5) {
            this.dashActive = true;
            // dash horizontally, but only while moving
            // dashing right
            if (this.xVelocity > 0) {
                // this.x += dashDistance;
                this.xVelocity += this.dashVelocity;
                this.switchCurrentSprites(13, 13);
            }
            // dashing left
            else if (this.xVelocity < 0) {
                // this.x -= dashDistance;
                this.xVelocity += -this.dashVelocity;
                this.switchCurrentSprites(14, 14);
            }

            // dash vertically, but only while moving
            // dashing down
            if (this.yVelocity > 0) {
                // this.y += dashDistance;
                this.yVelocity += this.dashVelocity;
                this.switchCurrentSprites(15, 15);
            }
            // dashing up
            else if (this.yVelocity) {
                // this.y -= dashDistance;
                this.yVelocity += -this.dashVelocity;
                this.switchCurrentSprites(16, 16);
            }
        }
    }

    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.loadImagesFromSpritesheet("./images/player.png", 17, 1);
    }
}

export { Player }