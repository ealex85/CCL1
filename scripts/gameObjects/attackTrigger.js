import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class AttackTrigger extends BaseGameObject {
    offset = {
        "left": 0,
        "top": 0
    }
    collidedWithEnemy = false;

    draw = function () {
        //global.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update = function () {
        this.x = global.playerObject.x + this.offset.left;
        this.y = global.playerObject.y + this.offset.top;

        if (this.collidedWithEnemy) {
            this.collidedWithEnemy = global.detectBoxCollision(this, global.enemyObject);
            if (!this.collidedWithEnemy) {
                if (this.name == "leftAttackTrigger") {
                    global.enemyObject.switchCurrentSprites(0, 2);
                }
                if (this.name == "rightAttackTrigger") {
                    global.enemyObject.switchCurrentSprites(9, 11);
                }
                if (global.enemyObject.xVelocity == 0 && global.enemyObject.yVelocity == 0) {
                    global.enemyObject.generateVelocity();
                }
            }
        }
    }

    reactToCollision = function (otherObject) {
        if (otherObject.name == "Enemy") {
            if (this.name == "leftAttackTrigger") {
                global.enemyObject.attackPlayer();

                // attack faces right
                if (!this.collidedWithEnemy) {
                    global.enemyObject.switchCurrentSprites(3, 8);
                }
            }

            if (this.name == "rightAttackTrigger") {
                global.enemyObject.attackPlayer();

                // attack faces left
                if (!this.collidedWithEnemy) {
                    global.enemyObject.switchCurrentSprites(12, 17);
                }
            }
            this.collidedWithEnemy = true;
        }
    }

    constructor(x, y, width, height) {
        super(x, y, width, height);
    }
}

export { AttackTrigger }
