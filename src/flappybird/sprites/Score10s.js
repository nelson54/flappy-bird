const Sprite = require("../../framework/sprites/Sprite");

module.exports = class Score10s extends Sprite {
  update() {
    let score = this.game.scoreText;
    this.texture = score[score.length-2]
  }
}
