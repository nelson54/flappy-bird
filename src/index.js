const FlappyBird = require('./FlappyBird')

document.addEventListener('DOMContentLoaded', ()=>{
  let game = new FlappyBird(window.innerWidth, window.innerHeight);

  game.start();
})