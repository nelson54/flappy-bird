module.exports = class Sprite {
    constructor(game, x, y, width, height) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.yDelta = -400;
        this.currentRotation = 0;

        this.children = [];

        this.opacity = 1;
        this.color = 'red';

        this.anchor = {x: 0, y:0};

        this.texture = null;
        this.currentFrame = 0;

        this.rotation = 0;

        this.isAlive = true;
        this.freezeAnimation = false;

        this.text = null;

        this.font = null;
    }

    body() {
        return new Float32Array([
            this.x, this.y,
            this.x + this.width, this.y,
            this.x, this.y + this.height,
            this.x, this.y + this.height,
            this.x + this.width, this.y,
            this.x + this.width, this.y + this.height
        ]);
    }

    cullChildren() {
        let alive = [];
        for(let i in this.children) {
            if(this.children[i].isAlive) {
                alive.push(this.children[i])
            }
        }
        this.children = alive;
    }

    registerBody(body) {
        this.body = body;
        this.game.physicsSystem.addBody(body);
    }

    update(timeDelta) {

    }

    animate(frames, speed) {
        this.frames = frames;
        this.animateSpeed = speed;
        this.currentAnimation = speed;
    }

    killChildren() {
        this.children.forEach((child)=>{
            child.isAlive = false;
        })

        this.children = []
    }

    incrementFrame(frameDiff) {
        if(!this.freezeAnimation && this.frames && this.frames.length > 0  ) {
            this.currentAnimation -= frameDiff;
            if(this.currentAnimation < 0) {
                this.currentFrame = (this.currentFrame + 1) % this.frames.length;
                this.texture = this.frames[this.currentFrame]
                this.currentAnimation = this.animateSpeed;
            }
        }
    }

    center() {
        let x = (this.x - (this.width * this.anchor.x)) + this.width * .5,
            y = (this.y - (this.height * this.anchor.y)) + this.height * .5;

        return {x, y};
    }

    rotate(degrees) {
        this.rotation = degrees * Math.PI / 180;
    }
}