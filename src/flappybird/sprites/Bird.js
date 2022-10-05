const Sprite = require("../../framework/sprites/Sprite");

module.exports = class Bird extends Sprite {

  constructor(game, x, y, width, height) {
    super(game, x, y, width, height);
    this.currentRotation = 365
    this.x = game.width * .6;
  }

  handleCollision(sprite) {
    this.game.endGame();
  }

  jump() {
    if(this.yDelta > -100) {
      this.yDelta = -400;
    }
  }

  update(timeDelta) {
    if(this.y < -200 || this.y > this.game.height + 200) {
      this.game.endGame();
    }

    if(this.yDelta <= 0) {
      this.texture = this.frames[0]
    } else if(this.yDelta > 0 && this.yDelta <= 200) {
      this.texture = this.frames[2]
    } else {
      this.texture = this.frames[1]
    }

    this.game.physicsSystem.update(this, timeDelta*.001);

    const rotation = ((this.yDelta + this.game.physicsSystem.MAXIMUM_FALL_VELOCITY) / (this.game.physicsSystem.MAXIMUM_FALL_VELOCITY * 2)) * 130;
    const lerp = (((rotation + ((Math.random() * 20) - 10 )) + (this.currentRotation * 5)) / 6)
    this.rotate((lerp + 300) % 365);
    this.currentRotation = rotation;
  }
}
