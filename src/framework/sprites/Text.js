const Sprite = require('./Sprite')

module.exports = class Text extends Sprite {
    constructor(game, text, font='14px serif', x=0, y=0, width=0, height=0) {
        super(game, x, y, width, height);
        this.text = text;
        this.font = font;
    }
}
