/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/FlappyBird.js":
/*!***************************!*\
  !*** ./src/FlappyBird.js ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Game = __webpack_require__(/*! ./framework/Game */ \"./src/framework/Game.js\")\nconst Sprite = __webpack_require__(/*! ./framework/sprites/Sprite */ \"./src/framework/sprites/Sprite.js\")\nconst Group = __webpack_require__(/*! ./framework/sprites/Group */ \"./src/framework/sprites/Group.js\")\nconst CircleBounds = __webpack_require__(/*! ./framework/physics/body/CircleBounds */ \"./src/framework/physics/body/CircleBounds.js\")\nconst RectangleBody = __webpack_require__(/*! ./framework/physics/body/RectangleBody */ \"./src/framework/physics/body/RectangleBody.js\")\n\nmodule.exports = class FlappyBird extends Game {\n\n    constructor(width, height) {\n        console.log(\"TESTING\")\n        super(width, height);\n        //this.renderer.debug = true;\n\n        this.isGameOver = false;\n\n        this.physicsSystem.addCollisionType('bird', ['pipe']);\n\n        this.backgroundColor = '#70C5CE';\n\n        this.pipeWidth = 60;\n\n        this.score = 0;\n\n        this.pipes = new Group(this);\n\n        this.loader.addImage('background', '/assets/img/background.png');\n        this.loader.addImage('ground', '/assets/img/ground.png');\n        this.loader.addImage('pipe', '/assets/img/pipe.png');\n        this.loader.addImage('bird-1', '/assets/img/bird-1.png');\n        this.loader.addImage('bird-2', '/assets/img/bird-2.png');\n        this.loader.addImage('bird-3', '/assets/img/bird-3.png');\n        this.loader.addImage('game-over', '/assets/img/game-over.png');\n        this.loader.addImage('0', '/assets/img/0.png');\n        this.loader.addImage('1', '/assets/img/1.png');\n        this.loader.addImage('2', '/assets/img/2.png');\n        this.loader.addImage('3', '/assets/img/3.png');\n        this.loader.addImage('4', '/assets/img/4.png');\n        this.loader.addImage('5', '/assets/img/5.png');\n        this.loader.addImage('6', '/assets/img/6.png');\n        this.loader.addImage('7', '/assets/img/7.png');\n        this.loader.addImage('8', '/assets/img/8.png');\n        this.loader.addImage('9', '/assets/img/9.png');\n\n        let backgroundHeight = 263;\n        let backgroundWidth = 478;\n        let groundHeight = 80;\n\n        let x = 0;\n        let backgroundCount = 0;\n        while(x < this.width + backgroundWidth) {\n            let background = new Background(this, (backgroundWidth*backgroundCount)-backgroundCount++, this.height - backgroundHeight, backgroundWidth, backgroundHeight, 3);\n            background.color = '#70C5CE';\n            background.texture = 'background';\n            this.addSprite(background);\n\n            x += backgroundWidth - 1;\n        }\n\n        backgroundCount = 0;\n        x = 0;\n\n        while(x < this.width + backgroundWidth) {\n            let ground = new Background(this, (backgroundWidth * backgroundCount) - backgroundCount++, this.height - groundHeight, backgroundWidth, groundHeight, 20);\n            ground.texture = 'ground';\n            ground.color = '#70C5CE';\n            this.addSprite(ground);\n\n            x += backgroundWidth - 1;\n        }\n\n        this.addSprite(this.pipes);\n\n        this.bird = new Bird(this, 100, 300, 39, 28);\n\n        this.bird.registerBody(new CircleBounds('bird', this.bird, this.bird.height/2));\n\n        this.bird.texture = 'bird-1';\n\n        this.bird.animate(['bird-1', 'bird-2', 'bird-3'], 150);\n\n        this.bird.color = 'rgba(0,0,0,0)';\n        this.bird.anchor = {x:.5, y:.5};\n        this.addSprite(this.bird);\n\n        let score100s = new Score100s(this, (this.width/2) - 14 + 0, 20, 14, 20);\n        score100s.color = 'rgba(0,0,0,0)';\n        this.addSprite(score100s);\n\n        let score10s = new Score10s(this, (this.width/2) - 14 + 14, 20, 14, 20);\n        score10s.color = 'rgba(0,0,0,0)';\n        this.addSprite(score10s);\n\n        let score1s = new Score1s(this, (this.width/2) - 14 + 28, 20, 14, 20);\n        score1s.color = 'rgba(0,0,0,0)';\n        this.addSprite(score1s);\n\n        let message = new Text(this, 'Hit `d` to use', '14px serif', 100, 100);\n        message.color = 'black';\n        this.addSprite(message)\n    }\n\n    addImage(name, src) {\n        let image = new Image();\n        image.src = src;\n\n        this.textures[name] = image;\n    }\n\n    tick(timeDelta) {\n        this.turn++;\n\n        this.scoreText = this.score.toString().padStart(3, '0');\n\n        if((this.inputHandler.keysPressed[' '] || this.inputHandler.keysPressed['Touch']) && !this.isGameOver) {\n            this.bird.jump();\n        }\n\n        if(this.inputHandler.keysPressed['d']) {\n            this.renderer.debug = !this.renderer.debug;\n        }\n\n        if(this.isGameOver && (this.inputHandler.keysPressed['Enter'] || this.inputHandler.keysPressed['Touch'])) {\n            this.restart();\n        }\n\n        this.addPipe();\n\n        super.tick(timeDelta);\n\n        this.physicsSystem.detectCollisions();\n\n        this.inputHandler.clear();\n    }\n\n    addPipe() {\n        if(!this.lastPipe || this.lastPipe.x < (this.width - 180)) {\n            let start = this.height * .2,\n                range = this.height * .6,\n                yPosition = start  + (Math.random() * range);\n            let topPipe = new Pipe(this, this.width, yPosition, this.pipeWidth, 1000, false);\n            topPipe.texture = 'pipe';\n            topPipe.color = 'rgba(0,0,0,0)';\n            topPipe.anchor = {x: 0, y: 1};\n\n            topPipe.registerBody(new RectangleBody('pipe', topPipe));\n\n            this.pipes.addChild(topPipe);\n\n            let bottomPipe = new Pipe(this, this.width, yPosition + 150, this.pipeWidth, 1000, true);\n            bottomPipe.color = 'rgba(0,0,0,0)';\n            bottomPipe.texture = 'pipe';\n            bottomPipe.registerBody(new RectangleBody('pipe', bottomPipe));\n            this.pipes.addChild(bottomPipe);\n\n            this.lastPipe = bottomPipe;\n        }\n    }\n\n    endGame() {\n        if(!this.isGameOver) {\n            this.isGameOver = true;\n            this.bird.freezeAnimation = true;\n            this.gameOver = new GameOver(this, 188, 38);\n\n            this.gameOver.color = 'rgba(0,0,0,0)';\n            this.gameOver.texture = 'game-over';\n            this.addSprite(this.gameOver);\n        }\n    }\n\n    restart() {\n        this.isGameOver = false;\n\n        this.gameOver.isAlive = false;\n        this.gameOver = null;\n\n        this.score = 0;\n        this.bird.x = this.width * .6;\n        this.bird.y = 300;\n        this.bird.rotation = 0;\n        this.bird.freezeAnimation = false;\n        this.bird.isAlive = true;\n\n        this.pipes.killChildren();\n        this.pipes.cullChildren();\n\n        this.physicsSystem.bodies = [];\n        this.physicsSystem.addBody(this.bird.body);\n\n        this.lastPipe = false;\n        this.addPipe();\n    }\n}\n\nclass Text extends Sprite {\n    constructor(game, text, font='14px serif', x=0, y=0, width=0, height=0) {\n        super(game, x, y, width, height);\n        this.text = text;\n        this.font = font;\n    }\n}\n\nclass DisappearingText extends Sprite {\n    constructor(game, text, font='14px serif', x=0, y=0, width=0, height=0) {\n        super(game, x, y, width, height);\n        this.text = text;\n        this.font = font;\n        this.opacity = 1;\n    }\n\n    update(timeDelta) {\n        this.opacity -= .05 * .001 * timeDelta;\n    }\n}\n\nclass Bird extends Sprite {\n\n    constructor(game, x, y, width, height) {\n        super(game, x, y, width, height);\n\n        this.x = game.width * .6;\n    }\n\n    handleCollision(sprite) {\n        this.game.endGame();\n    }\n\n    jump() {\n\n        if(this.yDelta > 0) {\n            this.yDelta = -100;\n        } else {\n            this.yDelta *= 1.1;\n        }\n\n\n        this.animateSpeed = 50;\n        this.isJumping = true;\n        this.jumpLength = 500;\n\n    }\n\n    update(timeDelta) {\n        if(this.isJumping) {\n            this.jumpLength -= timeDelta;\n\n            this.jumpPosition = 500 / this.jumpLength;\n\n            if(this.jumpLength <= 0) {\n                this.isJumping = false;\n                this.yDelta = 150;\n                this.animateSpeed = 150;\n            }\n        }\n\n        if(this.y < -200 || this.y > this.game.height + 200) {\n            this.game.endGame();\n        }\n\n\n        this.y += this.yDelta * timeDelta * .001;\n\n        this.currentRotation = (this.currentRotation + (-5 * timeDelta*.01)) % 365;\n\n        this.rotate(this.currentRotation);\n    }\n}\n\nclass Pipe extends Sprite {\n    constructor(game, x, y, width, height, trackScore) {\n        super(game, x, y, width, height);\n        this.color = 'green';\n        this.isPassed = trackScore;\n    }\n\n    update(timeDelta) {\n        this.x -= 40 * timeDelta * .001;\n\n        if(!this.game.isGameOver && !this.isPassed && (this.x + (this.width * .5)) < this.game.bird.x) {\n            this.isPassed = true;\n            this.game.score++;\n        }\n    }\n}\n\nclass Background extends Sprite {\n\n    constructor(game, x, y, width, height, speed) {\n        super(game, x, y, width, height);\n        this.speed = speed;\n    }\n\n    update(timeDelta) {\n        if(this.x < -this.width) {\n            this.x = this.game.width - 1 ;\n        }\n\n        this.x -= this.speed * timeDelta * .001;\n    }\n}\n\nclass GameOver extends Sprite {\n    constructor(game, width, height) {\n        super(game, .5 * (game.width - width), game.height * .75, 188, 38);\n    }\n}\n\nclass Score1s extends Sprite {\n    update() {\n        let score = this.game.scoreText;\n        this.texture = this.game.scoreText[score.length-1]\n    }\n}\n\nclass Score10s extends Sprite {\n    update() {\n        let score = this.game.scoreText;\n        this.texture = score[score.length-2]\n    }\n}\n\nclass Score100s extends Sprite {\n    update() {\n        let score = this.game.scoreText;\n        this.texture = score[score.length-3]\n    }\n}\n\n//# sourceURL=webpack://flappy-bird/./src/FlappyBird.js?");

/***/ }),

/***/ "./src/framework/Game.js":
/*!*******************************!*\
  !*** ./src/framework/Game.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const InputHandler = __webpack_require__(/*! ./input/InputHandler */ \"./src/framework/input/InputHandler.js\")\nconst BasicCanvasRenderer = __webpack_require__(/*! ./renderer/BasicCanvasRenderer */ \"./src/framework/renderer/BasicCanvasRenderer.js\")\nconst PhysicsSystem = __webpack_require__(/*! ./physics/PhysicsSystem */ \"./src/framework/physics/PhysicsSystem.js\")\nconst Loop = __webpack_require__(/*! ./game/Loop */ \"./src/framework/game/Loop.js\")\nconst Loader = __webpack_require__(/*! ./game/Loader */ \"./src/framework/game/Loader.js\")\n\nmodule.exports = class Game {\n    constructor(width, height) {\n        this.loader = new Loader(this);\n        this.renderer = new BasicCanvasRenderer(this, width, height);\n        this.physicsSystem = new PhysicsSystem();\n\n        this.width = width;\n        this.height = height;\n\n        this.backgroundColor = 'black';\n        this.textures = {};\n        this.inputHandler = new InputHandler();\n        this.sprites = [];\n        this.targetFps = 1000/60;\n\n        this.turn = 0;\n\n        this.loop = new Loop(this.tick)\n    }\n\n    addSprite(sprite) {\n        this.sprites.push(sprite);\n    }\n\n    start() {\n        let lastStepTime = window.performance.now();\n        this.inputHandler.start();\n\n        let stats = new Stats();\n        stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom\n        document.body.appendChild( stats.dom );\n\n        setInterval(() => {\n            stats.begin();\n            requestAnimationFrame((step) => {\n                let timeDiff = step - lastStepTime;\n                stats.update();\n                this.tick(timeDiff);\n                lastStepTime = step;\n            });\n            \n\n        }, this.targetFps);\n    }\n\n    tick(timeDelta) {\n        let alive = [];\n        let sprite;\n\n        for(let i in this.sprites) {\n            sprite = this.sprites[i];\n\n            sprite.incrementFrame(timeDelta);\n            sprite.update(timeDelta);\n            sprite.cullChildren();\n\n            if(sprite.isAlive) {\n                alive.push(sprite);\n            }\n        }\n\n        this.renderer.drawScene();\n\n        this.sprites = alive;\n    }\n}\n\n//# sourceURL=webpack://flappy-bird/./src/framework/Game.js?");

/***/ }),

/***/ "./src/framework/game/Loader.js":
/*!**************************************!*\
  !*** ./src/framework/game/Loader.js ***!
  \**************************************/
/***/ (() => {

eval("class Loader {\n    constructor(game) {\n\n    }\n\n    addImage(name, url) {\n        game.textures[name] = new Image(url)\n    }\n}\n\n//# sourceURL=webpack://flappy-bird/./src/framework/game/Loader.js?");

/***/ }),

/***/ "./src/framework/game/Loop.js":
/*!************************************!*\
  !*** ./src/framework/game/Loop.js ***!
  \************************************/
/***/ (() => {

eval("class GameLoop {\n\n    constructor(gameFunc) {\n        this.gameFunc = func\n    }\n\n    start(lastStepTime) {\n        this.inputHandler.start();\n        this.cancel = window.requestAnimationFrame(this.gameFunc);\n    }\n\n    stop() {\n        this.cancel && this.cancel()\n    }\n}\n\n//# sourceURL=webpack://flappy-bird/./src/framework/game/Loop.js?");

/***/ }),

/***/ "./src/framework/input/InputHandler.js":
/*!*********************************************!*\
  !*** ./src/framework/input/InputHandler.js ***!
  \*********************************************/
/***/ ((module) => {

eval("module.exports = class InputHandler {\n    constructor() {\n        this.keysPressed = {};\n    }\n\n    start() {\n        document.addEventListener('keypress', (e) => {\n            this.handleKeyDown(e);\n        });\n\n        document.addEventListener('touchstart', (e) => {\n            this.handleTouch(e);\n        });\n\n        document.addEventListener('mousedown', (e) => {\n            this.handleTouch(e);\n        })\n    }\n\n    handleKeyDown(key) {\n        this.keysPressed[key.key] = true;\n    }\n\n    handleTouch(event) {\n        this.keysPressed['Touch'] = true;\n    }\n\n    clear() {\n        this.keysPressed = {};\n    }\n}\n\n//# sourceURL=webpack://flappy-bird/./src/framework/input/InputHandler.js?");

/***/ }),

/***/ "./src/framework/physics/CollisionType.js":
/*!************************************************!*\
  !*** ./src/framework/physics/CollisionType.js ***!
  \************************************************/
/***/ ((module) => {

eval("module.exports = class CollisionType {\n    constructor(type, collidesWith) {\n        this.type = type;\n        this.collidesWith = collidesWith;\n    }\n}\n\n//# sourceURL=webpack://flappy-bird/./src/framework/physics/CollisionType.js?");

/***/ }),

/***/ "./src/framework/physics/PhysicsSystem.js":
/*!************************************************!*\
  !*** ./src/framework/physics/PhysicsSystem.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const CollisionType = __webpack_require__(/*! ./CollisionType */ \"./src/framework/physics/CollisionType.js\")\nconst RigidBody = __webpack_require__(/*! ./body/RigidBody */ \"./src/framework/physics/body/RigidBody.js\")\n//const CollisionEvent = require('./CollisionEvent')\n\nmodule.exports = class PhysicsSystem {\n    constructor() {\n        this.types = {};\n\n        this.bodies = [];\n\n        this.bodiesByType = {};\n    }\n\n    addBody(body) {\n        if(!this.bodiesByType.hasOwnProperty(body.type)) {\n            this.bodiesByType[body.type] = [];\n        }\n        this.bodies.push(body);\n        this.bodiesByType[body.type].push(body)\n    }\n\n    cull() {\n        // TODO: handle culling\n    }\n\n    addCollisionType(type, collidesWith) {\n        this.types[type] = new CollisionType(type, collidesWith)\n    }\n\n    detectCollisions() {\n        Object.keys(this.types).forEach(type => {\n            let collisionType = this.types[type];\n            collisionType.collidesWith.forEach(collides => {\n                this.processCollisionType(this.bodiesByType[collisionType.type], this.bodiesByType[collides])\n            });\n        })\n    }\n\n    processCollisionType(bodies, collidingBodies) {\n\n        bodies.forEach(source => {\n            if(source.collisions.length > 0) {\n                source.collisions = [];\n            }\n\n            collidingBodies.forEach(collidingBody => {\n                if(source.sprite.isAlive && collidingBody.sprite.isAlive && this.detectCollision(source, collidingBody)) {\n                    source.collisions.push(collidingBody);\n                    collidingBody.collisions.push(collidingBody);\n\n                    if(typeof source.sprite.handleCollision === 'function') {\n                        source.sprite.handleCollision(collidingBody.sprite);\n                    }\n                }\n            })\n        })\n    }\n\n    detectCollision(body1, body2) {\n        if(body1.shape === RigidBody.SHAPES.CIRCLE && body2.shape === RigidBody.SHAPES.RECTANGLE) {\n            return this.detectCircleRectangleCollision(body1, body2);\n        } else if (body2.shape === RigidBody.SHAPES.CIRCLE && body1.shape === RigidBody.SHAPES.RECTANGLE) {\n            return this.detectCircleRectangleCollision(body2, body1);\n        }\n    }\n\n    detectCircleRectangleCollision(circle, rectangle) {\n        let xDistance = Math.abs(circle.sprite.x - rectangle.sprite.center().x);\n        let yDistance = Math.abs(circle.sprite.y - rectangle.sprite.center().y);\n\n        if(xDistance > (rectangle.width/2 + circle.radius) || yDistance > (rectangle.height/2 + circle.radius)) {\n            return false;\n        }\n        if(xDistance <= (rectangle.width/2) || yDistance <= (rectangle.height/2)) {\n            return true;\n        }\n        //if(circleCenter.x - rectangle.sprite.x < circle.radius && circleCenter.x - rectangle.spri)\n    }\n}\n\n\n\n\n//# sourceURL=webpack://flappy-bird/./src/framework/physics/PhysicsSystem.js?");

/***/ }),

/***/ "./src/framework/physics/body/CircleBounds.js":
/*!****************************************************!*\
  !*** ./src/framework/physics/body/CircleBounds.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const RigidBody = __webpack_require__(/*! ./RigidBody */ \"./src/framework/physics/body/RigidBody.js\")\n\nmodule.exports = class CircleBounds extends RigidBody {\n    constructor(type, sprite, radius) {\n        super(type, sprite, RigidBody.SHAPES.CIRCLE);\n        this.radius = radius;\n    }\n}\n\n//# sourceURL=webpack://flappy-bird/./src/framework/physics/body/CircleBounds.js?");

/***/ }),

/***/ "./src/framework/physics/body/RectangleBody.js":
/*!*****************************************************!*\
  !*** ./src/framework/physics/body/RectangleBody.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const RigidBody = __webpack_require__(/*! ./RigidBody */ \"./src/framework/physics/body/RigidBody.js\")\n\nmodule.exports = class RectangleBody extends RigidBody {\n    constructor(type, sprite) {\n        super(type, sprite, RigidBody.SHAPES.RECTANGLE);\n    }\n\n    get width() {\n        return this.sprite.width;\n    }\n\n    get height() {\n        return this.sprite.height;\n    }\n}\n\n//# sourceURL=webpack://flappy-bird/./src/framework/physics/body/RectangleBody.js?");

/***/ }),

/***/ "./src/framework/physics/body/RigidBody.js":
/*!*************************************************!*\
  !*** ./src/framework/physics/body/RigidBody.js ***!
  \*************************************************/
/***/ ((module) => {

eval("class RigidBody {\n\n    constructor(type, sprite, shape) {\n        this.type = type;\n        this.sprite = sprite;\n        this.shape = shape;\n        this.collisions = [];\n    }\n\n}\n\nRigidBody.SHAPES = {CIRCLE: 'CIRCLE', RECTANGLE: 'RECTANGLE'};\n\nmodule.exports = RigidBody\n\n//# sourceURL=webpack://flappy-bird/./src/framework/physics/body/RigidBody.js?");

/***/ }),

/***/ "./src/framework/renderer/BasicCanvasRenderer.js":
/*!*******************************************************!*\
  !*** ./src/framework/renderer/BasicCanvasRenderer.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const RigidBody = __webpack_require__(/*! ../physics/body/RigidBody */ \"./src/framework/physics/body/RigidBody.js\")\n\nmodule.exports = class BasicCanvasRenderer {\n    constructor(game, width, height) {\n        this.game = game;\n\n        this.width = width;\n        this.height = height;\n\n        let canvas = this.canvas = document.createElement('canvas');\n\n        canvas.width = width;\n        canvas.height = height;\n\n        canvas.style.margin = 0;\n        canvas.style.padding = 0;\n\n        document.body.appendChild(canvas);\n\n        this.context = canvas.getContext('2d');\n\n        // Defaults to identity matrix\n        this.debug = false;\n        this.transformMatrix = [1, 0, 0, 1, 0, 0];\n    }\n\n    drawScene() {\n\n        this.context.save();\n        this.context.fillStyle = this.game.backgroundColor;\n        this.context.fillRect(0, 0, this.width, this.height);\n\n        for(let i in this.game.sprites) {\n            let sprite = this.game.sprites[i];\n\n            this.draw(sprite);\n            this.context.restore();\n        }\n        if(this.debug) {\n\n             this.drawCollisionBoxes();\n\n            for(let i in this.game.sprites) {\n                this.debugSprite(this.game.sprites[i]);\n            }\n        }\n    }\n\n    draw(sprite) {\n        for(let i in sprite.children) {\n            this.draw(sprite.children[i])\n        }\n\n        let relativeX, relativeY;\n        let center = sprite.center();\n\n        this.context.beginPath();\n\n        this.context.globalAlpha = sprite.opacity;\n\n        this.context.translate(sprite.x, sprite.y);\n        this.context.rotate(sprite.rotation);\n        this.context.rect(0, 0, sprite.width, sprite.height);\n\n        this.context.fillStyle = sprite.color;\n\n        this.context.fill();\n\n        if(sprite.texture) {\n            relativeX = -sprite.width * sprite.anchor.x;\n            relativeY = -sprite.height * sprite.anchor.y;\n\n            this.context.drawImage(this.game.textures[sprite.texture], relativeX, relativeY);\n        }\n\n\n        if(sprite.text && sprite.font) {\n            this.context.font = sprite.font;\n            this.context.fillStyle = 'black';\n\n            this.context.fillText(sprite.text, relativeX, relativeY);\n        }\n\n        this.context.setTransform.call(this.context, this.transformMatrix);\n    }\n\n    debugSprite(sprite) {\n        for(let i in sprite.children) {\n            this.debugSprite(sprite.children[i])\n        }\n\n        let info = {\n            x: sprite.x,\n            y: sprite.y,\n            width: sprite.width,\n            height: sprite.height\n        };\n\n        this.context.font = '14px serif';\n        this.context.fillStyle = 'black';\n\n        let yPosition = 0;\n\n        Object.keys(info).forEach((key) => {\n            this.context.fillText(`${key}: ${Math.round(info[key])}px`, sprite.x + 10, sprite.y + yPosition);\n            yPosition += 15;\n        });\n\n        this.context.beginPath();\n        this.context.arc(sprite.x, sprite.y, 5, 0, 2 * Math.PI);\n        this.context.fill();\n    }\n\n    drawCollisionBoxes() {\n        this.game.physicsSystem.bodies.forEach((body) => {\n            if(body.shape === RigidBody.SHAPES.RECTANGLE) {\n                this.drawRectangle(body);\n            } else if(body.shape === RigidBody.SHAPES.CIRCLE) {\n                this.drawCircle(body)\n            }\n        });\n    }\n\n    drawCircle(body) {\n        if(body.collisions.length > 0) {\n            this.context.fillStyle = 'rgba(255, 0, 0, 0.5)';\n        } else {\n            this.context.fillStyle = 'rgba(0, 0, 0, 0.5)';\n        }\n\n        this.context.beginPath();\n        this.context.arc(body.sprite.x, body.sprite.y, body.radius, 0, 2 * Math.PI);\n        this.context.fill();\n    }\n\n    drawRectangle(body) {\n        if(body.collisions.length > 0) {\n            this.context.fillStyle = 'rgba(255, 0, 0, 0.5)';\n        } else {\n            this.context.fillStyle = 'rgba(0, 0, 0, 0.5)';\n        }\n\n        let drawX = body.sprite.x - (body.sprite.width * body.sprite.anchor.x),\n            drawY = body.sprite.y - (body.sprite.height * body.sprite.anchor.y);\n\n        this.context.beginPath();\n\n        this.context.rect(drawX, drawY, body.width, body.height);\n        this.context.fill();\n    }\n}\n\n//# sourceURL=webpack://flappy-bird/./src/framework/renderer/BasicCanvasRenderer.js?");

/***/ }),

/***/ "./src/framework/sprites/Group.js":
/*!****************************************!*\
  !*** ./src/framework/sprites/Group.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Sprite = __webpack_require__(/*! ./Sprite */ \"./src/framework/sprites/Sprite.js\")\n\nmodule.exports = class Group extends Sprite {\n    constructor(game) {\n        super(game, 0, 0, 0, 0);\n\n        this.children = []\n    }\n\n    update(timeDelta) {\n        for(let i in this.children) {\n            this.children[i].update(timeDelta);\n        }\n    }\n\n    addChild(sprite) {\n        this.children.push(sprite)\n    }\n}\n\n//# sourceURL=webpack://flappy-bird/./src/framework/sprites/Group.js?");

/***/ }),

/***/ "./src/framework/sprites/Sprite.js":
/*!*****************************************!*\
  !*** ./src/framework/sprites/Sprite.js ***!
  \*****************************************/
/***/ ((module) => {

eval("module.exports = class Sprite {\n    constructor(game, x, y, width, height) {\n        this.game = game;\n        this.x = x;\n        this.y = y;\n        this.width = width;\n        this.height = height;\n        this.yDelta = 50;\n        this.currentRotation = 0;\n\n        this.children = [];\n\n        this.opacity = 1;\n        this.color = 'red';\n\n        this.anchor = {x: 0, y:0};\n\n        this.texture = null;\n        this.currentFrame = 0;\n\n        this.rotation = 0;\n\n        this.isAlive = true;\n        this.freezeAnimation = false;\n\n        this.text = null;\n\n        this.font = null;\n    }\n\n    body() {\n        return new Float32Array([\n            this.x, this.y,\n            this.x + this.width, this.y,\n            this.x, this.y + this.height,\n            this.x, this.y + this.height,\n            this.x + this.width, this.y,\n            this.x + this.width, this.y + this.height\n        ]);\n    }\n\n    cullChildren() {\n        let alive = [];\n        for(let i in this.children) {\n            if(this.children[i].isAlive) {\n                alive.push(this.children[i])\n            }\n        }\n        this.children = alive;\n    }\n\n    registerBody(body) {\n        this.body = body;\n        this.game.physicsSystem.addBody(body);\n    }\n\n    update(timeDelta) {\n\n    }\n\n    animate(frames, speed) {\n        this.frames = frames;\n        this.animateSpeed = speed;\n        this.currentAnimation = speed;\n    }\n\n    killChildren() {\n        this.children.forEach((child)=>{\n            child.isAlive = false;\n        })\n\n        this.children = []\n    }\n\n    incrementFrame(frameDiff) {\n        if(!this.freezeAnimation && this.frames && this.frames.length > 0  ) {\n            this.currentAnimation -= frameDiff;\n            if(this.currentAnimation < 0) {\n                this.currentFrame = (this.currentFrame + 1) % this.frames.length;\n                this.texture = this.frames[this.currentFrame]\n                this.currentAnimation = this.animateSpeed;\n            }\n        }\n    }\n\n    center() {\n        let x = (this.x - (this.width * this.anchor.x)) + this.width * .5,\n            y = (this.y - (this.height * this.anchor.y)) + this.height * .5;\n\n        return {x, y};\n    }\n\n    rotate(degrees) {\n        this.rotation = degrees * Math.PI / 180;\n    }\n}\n\n//# sourceURL=webpack://flappy-bird/./src/framework/sprites/Sprite.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const FlappyBird = __webpack_require__(/*! ./FlappyBird */ \"./src/FlappyBird.js\")\n\n(function () {\n  var old = console.log;\n  var logger = document.getElementById('log');\n  console.log = function () {\n    for (var i = 0; i < arguments.length; i++) {\n      if (typeof arguments[i] == 'object') {\n          logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(arguments[i], undefined, 2) : arguments[i]) + '<br />';\n      } else {\n          logger.innerHTML += arguments[i] + '<br />';\n      }\n    }\n  }\n})();\n\ndocument.addEventListener('DOMContentLoaded', ()=>{\n  let game = new FlappyBird(window.innerWidth, window.innerHeight);\n\n  game.start();\n})\n\nvar overscroll = function(el) {\n  el.addEventListener('touchstart', function() {\n      var top = el.scrollTop\n          , totalScroll = el.scrollHeight\n          , currentScroll = top + el.offsetHeight\n      //If we're at the top or the bottom of the containers\n      //scroll, push up or down one pixel.\n      //\n      //this prevents the scroll from \"passing through\" to\n      //the body.\n      if(top === 0) {\n          el.scrollTop = 1\n      } else if(currentScroll === totalScroll) {\n          el.scrollTop = top - 1\n      }\n  })\n  el.addEventListener('touchmove', function(evt) {\n      //if the content is actually scrollable, i.e. the content is long enough\n      //that scrolling can occur\n      if(el.offsetHeight < el.scrollHeight)\n          evt._isScroller = true\n  })\n}\noverscroll(document.querySelector('.scroll'));\ndocument.body.addEventListener('touchmove', function(evt) {\n  //In this case, the default behavior is scrolling the body, which\n  //would result in an overflow.  Since we don't want that, we preventDefault.\n  if(!evt._isScroller) {\n      evt.preventDefault()\n  }\n})\n\n//# sourceURL=webpack://flappy-bird/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;