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
    // Revisa si la bola sale del tablero y asigna el punto dependiendo de la posicion de la bola
    if (this.score(this.board.ball, this.board)) {
      if (this.board.ball.x < 500) {
        this.board.bars[0].sumPoint();
      } else {
        this.board.bars[1].sumPoint();
      }

      setTimeout(() => {
        this.board.playing = !this.board.playing;
      }, 20);
      this.board.ball.reset();
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
      if (this.board.bars[0].score >= 2) {
        alert("GANÓ LA BARRA ROJA!!!!");
        location.reload();
      }
      if (this.board.bars[1].score >= 2) {
        alert("GANÓ LA BARRA AZUL!!");
        location.reload();
      }
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
      switch (element.id) {
        case 0:
          ctx.fillRect(element.x, element.y, element.width, element.height);
          ctx.fillStyle = "black";
          break;
        case 1:
          ctx.fillRect(element.x, element.y, element.width, element.height);
          ctx.fillStyle = "blue";
          break;
      }
      break;
    case "circle":
      ctx.beginPath();
      ctx.arc(element.x, element.y, element.radius, 0, 7);

      ctx.fill();
      ctx.fillStyle = "red";
      ctx.closePath();
      break;
  }
}
