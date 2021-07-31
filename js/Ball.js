let leftBallArrowDown = false;
let leftBallArrowUp = false;
let rightBallArrowDown = false;
let rightBallArrowUp = false;
let throwLeftBall = false;
let throwRightBall = false;

class Ball {
  constructor(classGame, x, y, imageSrc, dx, score) {
    // i need context from the class Game so I am passing it down from
    // the Game where I use it to create cup object
    this.canvas = document.getElementById("canvas");
    this.game = classGame;
    this.x = x;
    this.initX = x;
    this.y = y;
    this.width = 20;
    this.height = 20;
    this.img = new Image();
    this.img.src = imageSrc;
    this.dx = dx;
    this.score = score;
    this.sound = new Audio("sounds/swoosh2.mp3");
    this.moveBallSound = new Audio("sounds/move-ball.flac");
  }

  // to make ball appear on the canvas
  drawComponent() {
    this.game.context.drawImage(
      this.img,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  // move ball up and down
  moveBall() {
    if (this.moveDown === true) {
      this.y += 25;
      //enforce boundaries
      if (this.y > this.canvas.height - this.width) {
        this.y = this.canvas.height - this.width;
      }
    }
    if (this.moveUp === true) {
      this.y -= 25;
      //enforce boundaries
      if (this.y < 0) {
        this.y = 0;
      }
    }
  }

  //   score() {
  //     this.cupsRemaining;
  //   }

  //   takeTurns() {
  //     document.getElementById("score-left").onclick = () => {
  //       this.moveBallLeft();
  //       console.log("moveBallLeft");
  //     };
  //     document.getElementById("score-right").onclick = () => {
  //       this.moveBallRight();
  //       console.log("moveBallRight");
  //     };
  //   }

  throwBall() {
    if (this.ballRolling === true) {
      this.x += this.dx;
      // increase width and height up to middle of canvas
      if (this.initX < canvas.width / 2) {
        if (this.x < this.canvas.width / 2) {
          this.width++;
          this.height++;
        } else {
          this.width--;
          this.height--;
        }
      } else {
        if (this.x > this.canvas.width / 2) {
          this.width++;
          this.height++;
        } else {
          this.width--;
          this.height--;
        }

        // once it reaches middle of canvas, start decreasing width and height.
      }
      // reset ball
      if (this.x > this.canvas.width || this.x < 0) {
        this.resetBall();
      }
    }
  }
  resetBall() {
    this.x = this.initX;
    this.width = 20;
    this.height = 20;
    this.ballRolling = false;
    this.sound.pause();
  }
}
