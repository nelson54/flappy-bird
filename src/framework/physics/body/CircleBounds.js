const RigidBody = require('./RigidBody')

module.exports = class CircleBounds extends RigidBody {
    constructor(type, sprite, radius) {
        super(type, sprite, RigidBody.SHAPES.CIRCLE);
        this.radius = radius;
    }
}