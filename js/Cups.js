class Cups {
  constructor(classGame, x, y, imageSrc) {
    // i need context from the class Game so I am passing it down from
    // the Game where I use it to create cup object
    this.game = classGame;
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 60;
    this.img = new Image();
    this.img.src = imageSrc;
  }

  // to make cup appear on the canvas
  drawComponent() {
    this.game.context.drawImage(
      this.img,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
