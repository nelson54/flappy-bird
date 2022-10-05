const InputHandler = require('./input/InputHandler')
const BasicCanvasRenderer = require('./renderer/BasicCanvasRenderer')
const PhysicsSystem = require('./physics/PhysicsSystem')
const Loop = require('./game/Loop')
const Loader = require('./game/Loader')

module.exports = class Game {
    constructor(width, height) {
        this.loader = new Loader(this);
        this.renderer = new BasicCanvasRenderer(this, width, height);
        this.physicsSystem = new PhysicsSystem();

        this.width = width;
        this.height = height;

        this.backgroundColor = 'black';
        this.textures = {};
        this.inputHandler = new InputHandler();
        this.sprites = [];
        this.targetFps = 1000/60;

        this.turn = 0;

        //this.loop = new Loop(this.tick)
    }

    addSprite(sprite) {
        this.sprites.push(sprite);
    }

    start() {
        let lastStepTime = window.performance.now();
        this.inputHandler.start();

        let stats = new Stats();
        stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild( stats.dom );
        stats.begin();
        setInterval(() => {
            
            requestAnimationFrame((step) => {
                let timeDiff = step - lastStepTime;
                
                this.tick(timeDiff);
                lastStepTime = step;
                stats.update();
            });
            
            
        }, this.targetFps);
    }

    tick(timeDelta) {
        let alive = [];
        let sprite;

        for(let i in this.sprites) {
            sprite = this.sprites[i];

            sprite.incrementFrame(timeDelta);
            sprite.update(timeDelta);
            sprite.cullChildren();

            if(sprite.isAlive) {
                alive.push(sprite);
            }
        }

        this.renderer.drawScene();

        this.sprites = alive;
    }
}