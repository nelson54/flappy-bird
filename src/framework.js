class Game {
    constructor(width, height) {
        this.renderer = new Renderer(this, width, height);

        this.physicsSystem = new PhysicsSystem();

        this.width = width;
        this.height = height;

        this.backgroundColor = 'black';
        this.textures = {};
        this.inputHandler = new InputHandler();
        this.sprites = [];

        this.turn = 0;
    }

    addSprite(sprite) {
        this.sprites.push(sprite);
    }

    start() {
        let lastStepTime = 0;
        this.inputHandler.start();

        setInterval(() => {

            requestAnimationFrame((step) => {
                let timeDiff = step - lastStepTime;
                this.tick(timeDiff);
                lastStepTime = step;
            });
        }, 1000/60);
    }

    tick(timeDelta) {
        let alive = [];
        let sprite;

        for(let i in this.sprites) {
            sprite = this.sprites[i];
            sprite.incrementFrame(timeDelta);
            sprite.update(timeDelta);

            if(sprite.isAlive) {
                alive.push(sprite);
            }
        }

        this.renderer.drawScene();

        this.sprites = alive;
    }
}

class Sprite {
    constructor(game, x, y, width, height) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.yDelta = 50;
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
    }

    registerBody(body) {
        this.game.physicsSystem.addBody(body);
    }

    update(timeDelta) {

    }

    animate(frames, speed) {
        this.frames = frames;
        this.animateSpeed = speed;
        this.currentAnimation = speed;
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

class Group extends Sprite {
    constructor(game) {
        super(game, 0, 0, 0, 0);

        this.children = []
    }

    update(timeDelta) {
        let alive = [],
            child;

        for(let i in this.children) {
            child = this.children[i];
            child.update(timeDelta);

            if(child.isAlive) {
                alive.push(child)
            }
        }

        this.children = alive;
    }

    addChild(sprite) {
        this.children.push(sprite)
    }
}

class Renderer {
    constructor(game, width, height) {
        this.game = game;

        this.width = width;
        this.height = height;



        let canvas = this.canvas = document.createElement('canvas');

        canvas.width = width;
        canvas.height = height;

        canvas.style.margin = 0;
        canvas.style.padding = 0;

        document.body.appendChild(canvas);

        this.context = canvas.getContext('2d');

        // Defaults to identity matrix
        this.debug = false;
        this.transformMatrix = [1, 0, 0, 1, 0, 0];
    }

    drawScene() {

        this.context.save();
        this.context.fillStyle = this.game.backgroundColor;
        this.context.fillRect(0, 0, this.width, this.height);

        for(let i in this.game.sprites) {
            let sprite = this.game.sprites[i];

            this.draw(sprite);
            this.context.restore();
        }
        if(this.debug) {

             this.drawCollisionBoxes();

            for(let i in this.game.sprites) {
                this.debugSprite(this.game.sprites[i]);
            }
        }
    }

    draw(sprite) {
        for(let i in sprite.children) {
            this.draw(sprite.children[i])
        }

        let relativeX, relativeY;
        let center = sprite.center();

        this.context.beginPath();

        this.context.globalAlpha = sprite.opacity;

        this.context.translate(sprite.x, sprite.y);
        this.context.rotate(sprite.rotation);
        this.context.rect(0, 0, sprite.width, sprite.height);

        this.context.fillStyle = sprite.color;

        this.context.fill();

        if(sprite.texture) {
            relativeX = -sprite.width * sprite.anchor.x;
            relativeY = -sprite.height * sprite.anchor.y;

            this.context.drawImage(this.game.textures[sprite.texture], relativeX, relativeY);
        }

        this.context.setTransform.call(this.context, this.transformMatrix);
    }

    debugSprite(sprite) {
        for(let i in sprite.children) {
            this.debugSprite(sprite.children[i])
        }

        let info = {
            x: sprite.x,
            y: sprite.y,
            width: sprite.width,
            height: sprite.height
        };

        this.context.font = '14px serif';
        this.context.fillStyle = 'black';

        let yPosition = 0;

        Object.keys(info).forEach((key) => {
            this.context.fillText(`${key}: ${Math.round(info[key])}px`, sprite.x + 10, sprite.y + yPosition);
            yPosition += 15;
        });

        this.context.beginPath();
        this.context.arc(sprite.x, sprite.y, 5, 0, 2 * Math.PI);
        this.context.fill();
    }

    drawCollisionBoxes() {
        this.game.physicsSystem.bodies.forEach((body) => {
            if(body.shape === RigidBody.SHAPES.RECTANGLE) {
                this.drawRectangle(body);
            } else if(body.shape === RigidBody.SHAPES.CIRCLE) {
                this.drawCircle(body)
            }
        });
    }

    drawCircle(body) {
        if(body.collisions.length > 0) {
            this.context.fillStyle = 'rgba(255, 0, 0, 0.5)';
        } else {
            this.context.fillStyle = 'rgba(0, 0, 0, 0.5)';
        }

        this.context.beginPath();
        this.context.arc(body.sprite.x, body.sprite.y, body.radius, 0, 2 * Math.PI);
        this.context.fill();
    }

    drawRectangle(body) {
        if(body.collisions.length > 0) {
            this.context.fillStyle = 'rgba(255, 0, 0, 0.5)';
        } else {
            this.context.fillStyle = 'rgba(0, 0, 0, 0.5)';
        }

        let drawX = body.sprite.x - (body.sprite.width * body.sprite.anchor.x),
            drawY = body.sprite.y - (body.sprite.height * body.sprite.anchor.y);

        this.context.beginPath();

        this.context.rect(drawX, drawY, body.width, body.height);
        this.context.fill();
    }
}

class InputHandler {
    constructor() {
        this.keysPressed = {};
    }

    start() {
        document.addEventListener('keypress', (e) => {
            this.handleKeyDown(e);
        });

        document.addEventListener('touchstart', (e) => {
            this.handleTouch(e);
        });

        document.addEventListener('mousedown', (e) => {
            this.handleTouch(e);
        })
    }

    handleKeyDown(key) {
        this.keysPressed[key.key] = true;
    }

    handleTouch(event) {
        this.keysPressed['Touch'] = true;
    }

    clear() {
        this.keysPressed = {};
    }
}