class RigidBody {

    constructor(type, sprite, shape) {
        this.type = type;
        this.sprite = sprite;
        this.shape = shape;
        this.collisions = [];
    }

}

RigidBody.SHAPES = {CIRCLE: 'CIRCLE', RECTANGLE: 'RECTANGLE'};

module.exports = RigidBody