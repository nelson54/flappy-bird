const Sprite = require("../../framework/sprites/Sprite");

module.exports = class Score1s extends Sprite {
  update() {
    let score = this.game.scoreText;
    this.texture = this.game.scoreText[score.length-1]
  }
}
