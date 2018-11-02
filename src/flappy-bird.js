class FlappyBird extends Game {

    constructor(width, height) {
        super(width, height);
        //this.renderer.debug = true;

        this.isGameOver = false;

        this.physicsSystem.addCollisionType('bird', ['pipe']);

        this.backgroundColor = '#70C5CE';

        this.pipeWidth = 60;

        this.score = 0;

        this.pipes = new Group(this);

        this.addImage('background', 'img/background.png');
        this.addImage('ground', 'img/ground.png');
        this.addImage('pipe', 'img/pipe.png');
        this.addImage('bird-1', 'img/bird-1.png');
        this.addImage('bird-2', 'img/bird-2.png');
        this.addImage('bird-3', 'img/bird-3.png');
        this.addImage('game-over', 'img/game-over.png');
        this.addImage('0', 'img/0.png');
        this.addImage('1', 'img/1.png');
        this.addImage('2', 'img/2.png');
        this.addImage('3', 'img/3.png');
        this.addImage('4', 'img/4.png');
        this.addImage('5', 'img/5.png');
        this.addImage('6', 'img/6.png');
        this.addImage('7', 'img/7.png');
        this.addImage('8', 'img/8.png');
        this.addImage('9', 'img/9.png');

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

        this.bird = new Bird(this, 100, 100, 39, 28);

        this.bird.registerBody(new CircleBounds('bird', this.bird, this.bird.height/2));

        this.bird.texture = 'bird-1';

        this.bird.animate(['bird-1', 'bird-2', 'bird-3'], 150);

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

        if(this.isGameOver && this.inputHandler.keysPressed['Enter']) {
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
                yPosition = (Math.random() * range);
            let topPipe = new Pipe(this, this.width, yPosition, this.pipeWidth, 1000, false);
            topPipe.texture = 'pipe';
            topPipe.color = 'rgba(0,0,0,0)';
            topPipe.anchor = {x: 0, y: 1};

            topPipe.registerBody(new RectangleBody('pipe', topPipe));

            this.pipes.addChild(topPipe);

            let bottomPipe = new Pipe(this, this.width, yPosition + 150, this.pipeWidth, 1000, true);
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
        this.bird.x = 100;
        this.bird.y = 100;
        this.bird.rotation = 0;
        this.bird.freezeAnimation = false;
    }
}

class Bird extends Sprite {

    constructor(game, x, y, width, height) {
        super(game, x, y, width, height);
    }

    handleCollision(sprite) {
        this.freezeAnimation = true;
        this.game.endGame();
    }

    jump() {

        if(this.yDelta > 0) {
            this.yDelta = -100;
        } else {
            this.yDelta *= 1.3;
        }


        this.animateSpeed = 50;
        this.isJumping = true;
        this.jumpLength = 500;

    }

    update(timeDelta) {
        if(this.isJumping) {
            this.jumpLength -= timeDelta;

            this.jumpPosition = 600 / this.jumpLength;

            if(this.jumpLength <= 0) {
                this.isJumping = false;
                this.yDelta = 150;
                this.animateSpeed = 150;
            }
        }

        this.y += this.yDelta * timeDelta * .001;

        this.currentRotation = (this.currentRotation + (-5 * timeDelta*.01)) % 365;

        this.rotate(this.currentRotation);
    }
}

class Pipe extends Sprite {
    constructor(game, x, y, width, height, trackScore) {
        super(game, x, y, width, height);
        this.color = 'green';
        this.isPassed = trackScore;
    }

    update(timeDelta) {
        this.x += -30 * timeDelta * .001;

        if(this.x < -this.width) {
            this.isAlive = false;
        }

        if(!this.isPassed && (this.x + (this.width * .5)) < this.game.bird.x) {
            this.isPassed = true;
            this.game.score++;
        }
    }
}

class Background extends Sprite {

    constructor(game, x, y, width, height, speed) {
        super(game, x, y, width, height);
        this.speed = speed;
    }

    update(timeDelta) {
        if(this.x < -this.width) {
            this.x = this.game.width - 1 ;
        }

        this.x -= this.speed * timeDelta * .001;
    }
}

class GameOver extends Sprite {
    constructor(game, width, height) {
        super(game, .5 * (game.width - width), game.height * .75, 188, 38);
    }
}

class Score1s extends Sprite {
    update() {
        let score = this.game.scoreText;
        this.texture = this.game.scoreText[score.length-1]
    }
}

class Score10s extends Sprite {
    update() {
        let score = this.game.scoreText;
        this.texture = score[score.length-2]
    }
}

class Score100s extends Sprite {
    update() {
        let score = this.game.scoreText;
        this.texture = score[score.length-3]
    }
}