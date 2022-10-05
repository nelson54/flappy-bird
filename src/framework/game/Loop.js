module.exports = class GameLoop {

    constructor(gameFunc) {
        this.gameFunc = gameFunc
    }

    start(lastStepTime) {
        this.inputHandler.start();
        this.cancel = window.requestAnimationFrame(this.gameFunc);
    }

    stop() {
        this.cancel && this.cancel()
    }
}