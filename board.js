class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.game_over = false;
    this.bars = [];
    this.ball = null;
    this.playing = false;
  }

  get elements() {
    let elements = this.bars.map(function (bar) {
      return bar;
    });
    elements.push(this.ball);
    return elements;
  }

  setBall(ball) {
    this.ball = ball;
  }
}
