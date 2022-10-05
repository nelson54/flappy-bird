const Sprite = require("../../framework/sprites/Sprite");

module.exports = class Pipe extends Sprite {
  constructor(game, x, y, width, height, trackScore) {
    super(game, x, y, width, height);
    this.color = 'green';
    this.isPassed = trackScore;
  }

  update(timeDelta) {
    this.x -= 40 * timeDelta * .001;

    if(!this.game.isGameOver && !this.isPassed && (this.x + (this.width * .5)) < this.game.bird.x) {
      this.isPassed = true;
      this.game.score++;
    }
  }
}
