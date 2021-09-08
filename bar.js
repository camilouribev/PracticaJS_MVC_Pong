class Bar {
  constructor(x, y, width, height, board) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.board = board;
    this.board.bars.push(this);
    this.kind = "rectangle";
    this.speed = 12;
  }

  down() {
    if (this.y >= 500) {
      return;
    }
    this.y += this.speed;
  }
  up() {
    if (this.y <= 0) {
      return;
    }
    this.y -= this.speed;
    this.toString();
  }
  toString() {
    return console.log("x: " + this.x + " y: " + this.y);
  }
}
