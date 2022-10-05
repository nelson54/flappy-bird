const Game = require('../framework/Game')
const Text = require('../framework/sprites/Text')

const Bird = require('./sprites/Bird')
const Background = require('./sprites/Background')
const GameOver = require('./sprites/GameOver')
const Pipe = require('./sprites/Pipe')
const Score1s = require('./sprites/Score1s')
const Score10s = require('./sprites/Score10s')
const Score100s = require('./sprites/Score100s')
const Group = require('../framework/sprites/Group')

const CircleBounds = require('../framework/physics/body/CircleBounds')
const RectangleBody = require('../framework/physics/body/RectangleBody')

module.exports = class FlappyBird extends Game {

    constructor(width, height) {
        super(width, height);
        //this.renderer.debug = true;

        this.isGameOver = false;

        this.physicsSystem.addCollisionType('bird', ['pipe']);

        this.backgroundColor = '#70C5CE';

        this.pipeWidth = 60;

        this.score = 0;

        this.pipes = new Group(this);

        this.loader.addImage('background', '/assets/img/background.png');
        this.loader.addImage('ground', '/assets/img/ground.png');
        this.loader.addImage('pipe', '/assets/img/pipe.png');
        this.loader.addImage('bird-1', '/assets/img/bird-1.png');
        this.loader.addImage('bird-2', '/assets/img/bird-2.png');
        this.loader.addImage('bird-3', '/assets/img/bird-3.png');
        this.loader.addImage('game-over', '/assets/img/game-over.png');
        this.loader.addImage('0', '/assets/img/0.png');
        this.loader.addImage('1', '/assets/img/1.png');
        this.loader.addImage('2', '/assets/img/2.png');
        this.loader.addImage('3', '/assets/img/3.png');
        this.loader.addImage('4', '/assets/img/4.png');
        this.loader.addImage('5', '/assets/img/5.png');
        this.loader.addImage('6', '/assets/img/6.png');
        this.loader.addImage('7', '/assets/img/7.png');
        this.loader.addImage('8', '/assets/img/8.png');
        this.loader.addImage('9', '/assets/img/9.png');

        let backgroundHeight = 263;
        let backgroundWidth = 478;
        let groundHeight = 80;

        let x = 0;
        let backgroundCount = 0;
        while(x < this.width + backgroundWidth) {
            let background = new Background(this, (backgroundWidth*backgroundCount)-backgroundCount++, this.height - backgroundHeight, backgroundWidth, backgroundHeight, 3);
            background.color = '#70C5CE';
            background.texture = 'background';
            this.addSprite(background);

            x += backgroundWidth - 1;
        }

        backgroundCount = 0;
        x = 0;

        while(x < this.width + backgroundWidth) {
            let ground = new Background(this, (backgroundWidth * backgroundCount) - backgroundCount++, this.height - groundHeight, backgroundWidth, groundHeight, 20);
            ground.texture = 'ground';
            ground.color = '#70C5CE';
            this.addSprite(ground);

            x += backgroundWidth - 1;
        }

        this.addSprite(this.pipes);

        this.bird = new Bird(this, 100, 300, 39, 28);

        this.bird.registerBody(new CircleBounds('bird', this.bird, this.bird.height/2));

        this.bird.texture = 'bird-1';

        this.bird.frames = ['bird-1', 'bird-2', 'bird-3'];

        this.bird.color = 'rgba(0,0,0,0)';
        this.bird.anchor = {x:.5, y:.5};
        this.addSprite(this.bird);

        let score100s = new Score100s(this, (this.width/2) - 14 + 0, 20, 14, 20);
        score100s.color = 'rgba(0,0,0,0)';
        this.addSprite(score100s);

        let score10s = new Score10s(this, (this.width/2) - 14 + 14, 20, 14, 20);
        score10s.color = 'rgba(0,0,0,0)';
        this.addSprite(score10s);

        let score1s = new Score1s(this, (this.width/2) - 14 + 28, 20, 14, 20);
        score1s.color = 'rgba(0,0,0,0)';
        this.addSprite(score1s);

        let message = new Text(this, 'Hit `d` to use', '14px serif', 100, 100);
        message.color = 'black';
        this.addSprite(message)
    }

    addImage(name, src) {
        let image = new Image();
        image.src = src;

        this.textures[name] = image;
    }

    tick(timeDelta) {
        this.turn++;

        this.scoreText = this.score.toString().padStart(3, '0');

        if((this.inputHandler.keysPressed[' '] || this.inputHandler.keysPressed['Touch']) && !this.isGameOver) {
            this.bird.jump();
        }

        if(this.inputHandler.keysPressed['d']) {
            this.renderer.debug = !this.renderer.debug;
        }

        if(this.isGameOver && (this.inputHandler.keysPressed['Enter'] || this.inputHandler.keysPressed['Touch'])) {
            this.restart();
        }

        this.addPipe();

        super.tick(timeDelta);

        this.physicsSystem.detectCollisions();

        this.inputHandler.clear();
    }

    addPipe() {
        if(!this.lastPipe || this.lastPipe.x < (this.width - 180)) {
            let start = this.height * .2,
                range = this.height * .6,
                yPosition = start  + (Math.random() * range);
            let topPipe = new Pipe(this, this.width, yPosition, this.pipeWidth, 1000, false);
            topPipe.texture = 'pipe';
            topPipe.color = 'rgba(0,0,0,0)';
            topPipe.anchor = {x: 0, y: 1};

            topPipe.registerBody(new RectangleBody('pipe', topPipe));

            this.pipes.addChild(topPipe);

            let bottomPipe = new Pipe(this, this.width, yPosition + 200, this.pipeWidth, 1000, true);
            bottomPipe.color = 'rgba(0,0,0,0)';
            bottomPipe.texture = 'pipe';
            bottomPipe.registerBody(new RectangleBody('pipe', bottomPipe));
            this.pipes.addChild(bottomPipe);

            this.lastPipe = bottomPipe;
        }
    }

    endGame() {
        if(!this.isGameOver) {
            this.isGameOver = true;
            this.bird.freezeAnimation = true;
            this.gameOver = new GameOver(this, 188, 38);

            this.gameOver.color = 'rgba(0,0,0,0)';
            this.gameOver.texture = 'game-over';
            this.addSprite(this.gameOver);
        }
    }

    restart() {
        this.isGameOver = false;

        this.gameOver.isAlive = false;
        this.gameOver = null;

        this.score = 0;
        this.bird.x = this.width * .6;
        this.bird.y = 300;
        this.bird.rotation = 0;
        this.bird.freezeAnimation = false;
        this.bird.isAlive = true;

        this.pipes.killChildren();
        this.pipes.cullChildren();

        this.physicsSystem.bodies = [];
        this.physicsSystem.addBody(this.bird.body);

        this.lastPipe = false;
        this.addPipe();
    }
}







