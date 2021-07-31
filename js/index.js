// 7 pieces of the game

// 1. game itself
// 2. cups class for right and left side cups (array of 10 each)
// 3. player class for players 1 and 2
// 4. component for each player's ball

const game = new Game();

window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    game.start();
    document.getElementById("score-left").onclick = () => {
      console.log("Throw left ball");
      game.ballLeft.sound.play();
      game.ballLeft.ballRolling = true;
    };
    document.getElementById("score-right").onclick = () => {
      console.log("Throw right ball");
      game.ballRight.sound.play();
      game.ballRight.ballRolling = true;
    };

    document.addEventListener("keydown", (event) => {
      console.log(event.code);
      switch (event.code) {
        case "KeyS":
          game.ballLeft.moveDown = true;
          game.ballLeft.moveBallSound.play();
          break;
        case "KeyW":
          game.ballLeft.moveUp = true;
          game.ballLeft.moveBallSound.play();
          break;
        case "ArrowDown":
          game.ballRight.moveDown = true;
          game.ballRight.moveBallSound.play();
          break;
        case "ArrowUp":
          game.ballRight.moveUp = true;
          game.ballRight.moveBallSound.play();
          break;
      }
    });

    document.addEventListener("keyup", (event) => {
      console.log(event.code);
      switch (event.code) {
        case "KeyS":
          game.ballLeft.moveDown = false;
          break;
        case "KeyW":
          game.ballLeft.moveUp = false;
          break;
        case "ArrowDown":
          game.ballRight.moveDown = false;
          break;
        case "ArrowUp":
          game.ballRight.moveUp = false;
          break;
      }
    });
  };
};
