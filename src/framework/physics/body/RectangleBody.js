const RigidBody = require('./RigidBody')

module.exports = class RectangleBody extends RigidBody {
    constructor(type, sprite) {
        super(type, sprite, RigidBody.SHAPES.RECTANGLE);
    }

    get width() {
        return this.sprite.width;
    }

    get height() {
        return this.sprite.height;
    }
}