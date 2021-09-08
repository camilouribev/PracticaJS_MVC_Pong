class BoardView {
  constructor() {
    this.canvas = canvas;
    this.canvas.width = board.width;
    this.canvas.height = board.height;
    this.board = board;
    this.ctx = canvas.getContext("2d");
  }

  clean() {
    this.ctx.clearRect(0, 0, this.board.width, this.board.height);
  }

  draw() {
    for (let i = this.board.elements.length - 1; i >= 0; i--) {
      let el = this.board.elements[i];

      draw(this.ctx, el);
    }
  }

  checkBarCollisions() {
    for (let i = this.board.bars.length - 1; i >= 0; i--) {
      let bar = this.board.bars[i];
      if (this.hit(bar, this.board.ball, this.board)) {
        this.board.ball.collision(bar);
      }
    }
  }

  checkWallCollisions() {
    for (let i = this.board.bars.length - 1; i >= 0; i--) {
      let bar = this.board.bars[i];
      if (this.hitWall(this.board.ball, this.board)) {
        this.board.ball.wallCollision();
      }
    }
  }

  checkScore() {
    for (let i = this.board.bars.length - 1; i >= 0; i--) {
      let bar = this.board.bars[i];
      if (this.score(this.board.ball, this.board)) {
        bar.sumPoint();
        setTimeout(() => {
          this.board.playing = !this.board.playing;
        }, 20);

        this.board.ball.reset();
      }
    }
  }

  score(ball, board) {
    let hit = false;
    //Colision con muros verticales
    if (ball.x + ball.radius >= board.width || ball.x - ball.radius <= 0) {
      hit = true;
    }
    return hit;
  }

  play() {
    if (this.board.playing) {
      this.clean();
      this.draw();
      this.checkBarCollisions();
      this.checkWallCollisions();
      this.checkScore();
      this.board.ball.move();
    }
  }

  hit(a, b) {
    //Revisa si a colisiona con b
    let hit = false;
    //Colsiones horizontales
    if (b.x + b.width >= a.x && b.x < a.x + a.width) {
      //Colisiones verticales
      if (b.y + b.height >= a.y && b.y < a.y + a.height) hit = true;
    }
    //Colisión de a con b
    if (b.x <= a.x && b.x + b.width >= a.x + a.width) {
      if (b.y <= a.y && b.y + b.height >= a.y + a.height) hit = true;
    }
    //Colisión b con a
    if (a.x <= b.x && a.x + a.width >= b.x + b.width) {
      if (a.y <= b.y && a.y + a.height >= b.y + b.height) hit = true;
    }

    return hit;
  }

  hitWall(ball, board) {
    let hit = false;
    //Colision con muros
    if (ball.y + ball.radius >= board.height || ball.y - ball.radius <= 0) {
      hit = true;
    }
    return hit;
  }
}

function draw(ctx, element) {
  switch (element.kind) {
    case "rectangle":
      ctx.fillRect(element.x, element.y, element.width, element.height);
      break;
    case "circle":
      ctx.beginPath();
      ctx.arc(element.x, element.y, element.radius, 0, 7);
      ctx.fill();
      ctx.closePath();
      break;
  }
}

function drawScore(x, y, score) {
  ctx.fillStyle = "#fff";
  ctx.font = "35px sans-serif";

  // syntax --> fillText(text, x, y)
  ctx.fillText(score, x, y);
}
