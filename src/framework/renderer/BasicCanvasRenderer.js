const RigidBody = require('../physics/body/RigidBody')

module.exports = class BasicCanvasRenderer {
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


        if(sprite.text && sprite.font) {
            this.context.font = sprite.font;
            this.context.fillStyle = 'black';

            this.context.fillText(sprite.text, relativeX, relativeY);
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
        if(sprite.rotation) {
            this.context.fillText(`rotation: ${Math.abs(sprite.rotation)}`, sprite.x + 10, sprite.y + yPosition);
            yPosition += 15;
        } 

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