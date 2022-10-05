const Sprite = require("../../framework/sprites/Sprite");

module.exports = class GameOver extends Sprite {
  constructor(game, width, height) {
    super(game, .5 * (game.width - width), game.height * .75, 188, 38);
  }
}
