const Sprite = require("../../framework/sprites/Sprite");

module.exports = class Background extends Sprite {

  constructor(game, x, y, width, height, speed) {
    super(game, x, y, width, height);
    this.speed = speed;
  }

  update(timeDelta) {
    if(this.x < -this.width) {
      this.x = this.game.width - 1 ;
    }

    this.x -= this.speed * timeDelta * .001;
  }
}
