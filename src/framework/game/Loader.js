module.exports = class Loader {
    constructor(game) {
        this.game = game;
    }

    addImage(name, url) {
        let image = new Image();
        image.src = url;

        this.game.textures[name] = image;
    }
}