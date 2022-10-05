const Sprite = require('./Sprite')

module.exports = class Group extends Sprite {
    constructor(game) {
        super(game, 0, 0, 0, 0);

        this.children = []
    }

    update(timeDelta) {
        for(let i in this.children) {
            this.children[i].update(timeDelta);
        }
    }

    addChild(sprite) {
        this.children.push(sprite)
    }
}