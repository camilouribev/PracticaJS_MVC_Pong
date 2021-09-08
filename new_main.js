let board = new Board(1000, 600);
let bar = new Bar(5, 100, 40, 100, board);
let bar_2 = new Bar(955, 100, 40, 100, board);
let canvas = document.getElementById("canvas");
let board_view = new BoardView(canvas, board);
let ball = new Ball(350, 100, 10, board);

document.addEventListener("keydown", function (ev) {
  if (ev.keyCode == 38) {
    ev.preventDefault();
    bar.up();
  } else if (ev.keyCode == 40) {
    ev.preventDefault();
    bar.down();
  } else if (ev.keyCode === 87) {
    ev.preventDefault();
    //W
    bar_2.up();
  } else if (ev.keyCode === 83) {
    ev.preventDefault();
    //S
    bar_2.down();
  } else if (ev.keyCode === 32) {
    ev.preventDefault();
    board.playing = !board.playing;
  }
});

board_view.draw();

window.requestAnimationFrame(controller);

function controller() {
  board_view.play();
  requestAnimationFrame(controller);
}
