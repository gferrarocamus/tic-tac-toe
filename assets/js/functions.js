const board = (() => {
  let arr = [];
  const initializeBoard = () => {
    for (let i = 0; i < 9; i++) {
      arr.push('');
      const div = document.getElementById(i);
      div.onclick = updateCell;
    }
  };
  const updateCell = () => {
    const id = event.srcElement.id;
    arr[id] = "H";
    updateBoard();
  }
  const updateBoard = () => {
    arr.forEach((marker, index) => {
      const div = document.getElementById(index);
      div.textContent = marker;
    });
  };
  return { arr, initializeBoard, updateBoard };
})();

const displayController = (() => {

  return { };
})();

const player = (name, marker) => {
  const markCell = (cell) => {
    cell.textContent = marker;
  }
  return { name, marker, markCell };
};

const player1 = player("Player 1", "X");
const player2 = player("Player 2", "O");

// board.initializeBoard();
// board.updateBoard();

const play = (() => {
  let moves = 0;
  while (moves < 9) {
    [player1, player2].forEach( player => {
      console.log(player.marker);
      //Player makes move
      moves++;
    });
  }
})();