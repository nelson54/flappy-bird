const FlappyBird = require('./flappybird/FlappyBird')

document.addEventListener('DOMContentLoaded', ()=>{
  let game = new FlappyBird(window.innerWidth, window.innerHeight);

  game.start();
})
