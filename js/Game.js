const imgSource = "./images/cup.png";
let leftPlayer = false;

canvas.width = innerWidth - 100;
canvas.height = 300;

cupsWidth = 45;
cupsExtraWidth = 15;
cupsMiddlePoint = 25;

let gameOver = false;

class Game {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.context = this.canvas.getContext("2d");
    this.cupsArrRight = [
      new Cups(
        this,
        canvas.width - (cupsWidth + cupsExtraWidth),
        canvas.height / 2 - (cupsWidth + cupsMiddlePoint + 5),
        imgSource
      ),
      new Cups(
        this,
        canvas.width - (cupsWidth + cupsExtraWidth),
        canvas.height / 2 - cupsMiddlePoint,
        imgSource
      ),
      new Cups(
        this,
        canvas.width - (cupsWidth + cupsExtraWidth),
        canvas.height / 2 + cupsMiddlePoint,
        imgSource
      ),
      new Cups(
        this,
        canvas.width - (cupsWidth * 2 + cupsExtraWidth),
        canvas.height / 2 - cupsWidth / 2 - cupsMiddlePoint,
        imgSource
      ),
      new Cups(
        this,
        canvas.width - (cupsWidth * 2 + cupsExtraWidth),
        canvas.height / 2 + cupsWidth / 2 - (cupsMiddlePoint - 3),
        imgSource
      ),
      new Cups(
        this,
        canvas.width - (cupsWidth * 3 + cupsExtraWidth),
        canvas.height / 2 - cupsMiddlePoint,
        imgSource
      ),
    ];
    this.cupsArrLeft = [
      new Cups(
        this,
        10,
        canvas.height / 2 - (cupsWidth + cupsMiddlePoint + 5),
        imgSource
      ),
      new Cups(this, 10, canvas.height / 2 - cupsMiddlePoint, imgSource),
      new Cups(this, 10, canvas.height / 2 + cupsMiddlePoint, imgSource),
      new Cups(
        this,
        55,
        canvas.height / 2 - cupsWidth / 2 - cupsMiddlePoint,
        imgSource
      ),
      new Cups(
        this,
        55,
        canvas.height / 2 + cupsWidth / 2 - (cupsMiddlePoint - 3),
        imgSource
      ),
      new Cups(this, 100, canvas.height / 2 - cupsMiddlePoint, imgSource),
    ];
    this.imageSrc = "./images/table.png";
    this.backgroundImg = new Image();
    this.backgroundImg.src = this.imageSrc;
    this.ballLeft = new Ball(this, 10, 0, "./images/ball.png", 14, 6);
    this.ballRight = new Ball(
      this,
      canvas.width - 30,
      0,
      "./images/ball.png",
      -14,
      6
    );
    this.throwLeftBall = false;
    this.throwRightBall = false;
    this.dripSound = new Audio("sounds/drip.wav");
    this.soundTrack = new Audio("sounds/soundtrack.mp3");
    this.laughTrack = new Audio("sounds/laugh.wav");
    this.cheersTrack = new Audio("sounds/cheers.wav");
  }

  // game methods
  // init(){}
  start() {
    this.playerOne = document.getElementById("player-1").value;
    this.playerTwo = document.getElementById("player-2").value;
    this.soundTrack.play();
    console.log(gameOver);

    this.drawLoop();
  }

  drawBackground() {
    this.context.drawImage(
      this.backgroundImg,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );

    this.context.fillStyle = "black";
    this.context.font = "bold 18px Arial";
    this.context.fillText(
      `${this.playerOne}: ${this.ballLeft.score} cups left`,
      50,
      canvas.height - 10
    );

    this.context.fillText(
      `${this.playerTwo}: ${this.ballRight.score} cups left`,
      canvas.width - 200,
      canvas.height - 10
    );
  }

  drawLoop() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBackground();

    this.cupsArrLeft.forEach((element) => element.drawComponent());

    this.cupsArrRight.forEach((element) => element.drawComponent());

    this.ballLeft.drawComponent();
    this.ballRight.drawComponent();

    // this.ballLeft.takeTurns();
    // this.ballRight.takeTurns();

    this.ballLeft.moveBall();
    this.ballRight.moveBall();

    this.ballLeft.throwBall();
    this.ballRight.throwBall();

    // collision for left cups
    this.cupsArrLeft.forEach((cup, i) => {
      if (
        !(
          this.ballRight.x > cup.x + cup.width / 2 ||
          this.ballRight.x + this.ballRight.width / 2 < cup.x ||
          this.ballRight.y + this.ballRight.height / 2 < cup.y ||
          this.ballRight.y > cup.y + cup.height / 2
        )
      ) {
        console.log("col right");
        this.cupsArrLeft.splice(i, 1);
        this.ballRight.resetBall();
        this.ballLeft.score--;
        this.dripSound.play();
      }
    });

    // collision for right cups
    this.cupsArrRight.forEach((cup, i) => {
      if (
        !(
          this.ballLeft.x > cup.x + cup.width / 2 ||
          this.ballLeft.x + this.ballLeft.width / 2 < cup.x ||
          this.ballLeft.y + this.ballLeft.height / 2 < cup.y ||
          this.ballLeft.y > cup.y + cup.height / 2
        )
      ) {
        console.log("col left");
        this.cupsArrRight.splice(i, 1);
        this.ballLeft.resetBall();
        this.ballRight.score--;
        this.dripSound.play();
      }
    });

    this.gameOver();

    requestAnimationFrame(() => {
      this.drawLoop();
    });
  }

  gameOver() {
    if (this.ballLeft.score === 0) {
      console.log(gameOver);
      this.gameOverCheers();
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawBackground();

      this.context.fillStyle = "#ce0a14";
      this.context.font = "bold 50px Arial";
      const txt = `Player 2 won!`;
      this.context.fillText(
        `${this.playerTwo} won!`,
        canvas.width / 2 - this.context.measureText(txt).width / 2,
        canvas.height / 2
      );
    }

    if (this.ballRight.score === 0) {
      gameOver = true;
      console.log(gameOver);
      this.gameOverCheers();
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawBackground();

      this.context.fillStyle = "#ce0a14";
      this.context.font = "bold 50px Arial";
      const txt = `${this.playerOne} won!`;
      this.context.fillText(
        txt,
        canvas.width / 2 - this.context.measureText(txt).width / 2,
        canvas.height / 2
      );
    }
  }

  gameOverCheers() {
    this.cheersTrack.play();
  }
}
