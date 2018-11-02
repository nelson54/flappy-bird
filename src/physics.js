class PhysicsSystem {
    constructor() {
        this.types = {};

        this.bodies = [];

        this.bodiesByType = {};
    }

    addBody(body) {
        if(!this.bodiesByType.hasOwnProperty(body.type)) {
            this.bodiesByType[body.type] = [];
        }
        this.bodies.push(body);
        this.bodiesByType[body.type].push(body)
    }

    cull() {
        // TODO: handle culling
    }

    addCollisionType(type, collidesWith) {
        this.types[type] = new CollisionType(type, collidesWith)
    }

    detectCollisions() {
        Object.keys(this.types).forEach(type => {
            let collisionType = this.types[type];
            collisionType.collidesWith.forEach(collides => {
                this.processCollisionType(this.bodiesByType[collisionType.type], this.bodiesByType[collides])
            });
        })
    }

    processCollisionType(bodies, collidingBodies) {

        bodies.forEach(source => {
            if(source.collisions.length > 0) {
                source.collisions = [];
            }

            collidingBodies.forEach(collidingBody => {
                if(this.detectCollision(source, collidingBody)) {
                    source.collisions.push(collidingBody);
                    collidingBody.collisions.push(collidingBody);

                    if(typeof source.sprite.handleCollision === 'function') {
                        source.sprite.handleCollision(collidingBody.sprite);
                    }
                }
            })
        })
    }

    detectCollision(body1, body2) {
        if(body1.shape === RigidBody.SHAPES.CIRCLE && body2.shape === RigidBody.SHAPES.RECTANGLE) {
            return this.detectCircleRectangleCollision(body1, body2);
        } else if (body2.shape === RigidBody.SHAPES.CIRCLE && body1.shape === RigidBody.SHAPES.RECTANGLE) {
            return this.detectCircleRectangleCollision(body2, body1);
        }
    }

    detectCircleRectangleCollision(circle, rectangle) {
        let xDistance = Math.abs(circle.sprite.x - rectangle.sprite.center().x);
        let yDistance = Math.abs(circle.sprite.y - rectangle.sprite.center().y);

        if(xDistance > (rectangle.width/2 + circle.radius) || yDistance > (rectangle.height/2 + circle.radius)) {
            return false;
        }
        if(xDistance <= (rectangle.width/2) || yDistance <= (rectangle.height/2)) {
            return true;
        }
        //if(circleCenter.x - rectangle.sprite.x < circle.radius && circleCenter.x - rectangle.spri)
    }
}

class CollisionType {
    constructor(type, collidesWith) {
        this.type = type;
        this.collidesWith = collidesWith;
    }
}

class CollisionEvent {
    constructor(source, collision) {
        this.source = source;
        this.collision = collision;
    }
}

class RigidBody {

    constructor(type, sprite, shape) {
        this.type = type;
        this.sprite = sprite;
        this.shape = shape;
        this.collisions = [];
    }

}

RigidBody.SHAPES = {CIRCLE: 'CIRCLE', RECTANGLE: 'RECTANGLE'};


class CircleBounds extends RigidBody {
    constructor(type, sprite, radius) {
        super(type, sprite, RigidBody.SHAPES.CIRCLE);
        this.radius = radius;
    }
}

class RectangleBody extends RigidBody {
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