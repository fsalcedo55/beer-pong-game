// has 5 cups to start with, either right or left
// controls either left or right ball
// alternate turns
// shares y coordinates with the ball

class Player {
  constructor(classGame, x, y, playerImageSrc) {
    // i need context from the class Game so I am passing it down from
    // the Game where I use it to create cup object
    this.game = classGame;
    this.cups = 5;
    this.x = y;
    this.y = y;
    this.width = 180;
    this.height = 180;
    this.playerImg = new Image();
    this.playerImg.src = playerImageSrc;
  }

  // to make ball appear on the canvas
  drawComponent() {
    this.game.context.drawImage(
      this.playerImg,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
