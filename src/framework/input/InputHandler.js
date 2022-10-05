module.exports = class InputHandler {
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