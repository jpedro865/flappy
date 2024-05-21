// Path: js/game.js

// getting the canvas
var game_canvas = document.getElementById("gameCanvas");

if (game_canvas.getContext) {
  start_game(game_canvas.getContext("2d"))
}else {
  console.error("Canvas not supported");
}

// game vars
let game_started = false;
let game_over = true;
let score = 0;

function start_game(ctx) {
  this.ctx = ctx
  this.x = 50;
  this.y = 100;
  this.ctx.font = '30px sherif'
  this.ctx.fillText("Press 'Space' to start !!!", 75, 240);

  onkeyup = (e) => {
    if (e.key == " " ||
        e.code == "Space"
    ) {
      this.ctx.clearRect(0, 0, game_canvas.width, game_canvas.height);
      game_started = true;
      game_over = false;
      score = 0;
      score_cv(this.ctx);
      flappy(this.ctx);
      gameLoop();
    }
  }
}

function score_cv(ctx) {
  start_score();
  this.ctx = ctx;
  this.x_score = 200;
  this.y_score = 25;
  this.ctx.font = '30px sherif';
  this.ctx.strokeText(score, x_score, x_score);

  this.update_score= () => {
    this.ctx.strokeText(score, x_score, y_score);
  }
}

function start_score() {
  if (game_started === true && game_over === false) {
    setInterval(() => {
      score += 1;
    }, 500);
  }
}

// flappy function
function flappy(ctx) {
  this.ctx = ctx;
  this.x = 50;
  this.y = 100;
  this.width = 25;
  this.height = 25;
  this.speed = 1;
  this.gravity = 0.1;
  this.velocity = 0;
  this.jump = -2;
  this.image = new Image();
  this.image.src = "../images/flappy.png";
  this.image.onload = () => {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  this.update = () => {
    this.velocity += this.gravity;
    this.y += this.velocity;

    // empeche de tomber
    if (this.y > game_canvas.height - this.height) {
      this.y = game_canvas.height - this.height;
      this.velocity = 0;
    }
    // empeche de voler
    if (this.y < 0 ) {
      this.y = 0;
      this.velocity = 0;
    }

    this.ctx.clearRect(0, 0, game_canvas.width, game_canvas.height);
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    this.update_score();
  }

  this.move = () => {
    this.velocity = this.jump;
  }
  onkeyup = (e) => {
    if (e.key == " " ||
        e.code == "Space"
    ) {
      console.log('space')
      this.move();
    }
  }
}

function gameLoop() {
  if (game_started === true) {
    this.update();
    window.requestAnimationFrame(gameLoop);
  }
}

gameLoop();


