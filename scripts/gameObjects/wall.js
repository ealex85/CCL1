import { BaseGameObject } from "./baseGameObject.js";

class Wall extends BaseGameObject {
    name = "Wall";

    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.loadImages(["./images/invisible_wall.png"]);
    }
}

export { Wall }