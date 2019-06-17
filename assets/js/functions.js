const board = (() => {
  let arr = [];
  const initializeBoard = () => {
    for (let i = 0; i < 9; i++) {
      arr.push('');
      const div = document.getElementById(i);
      const boundFunction = () => {
        updateArray.bind(i)
      }
      div.addEventListener('click', boundFunction, false);
    }
  };
  const updateBoard = () => {
    arr.forEach((marker, index) => {
      const div = document.getElementById(index);
      div.textContent = marker;
    });
  };
  const updateArray = markerI => {
    console.log(markerI)
  };
  return { arr, initializeBoard, updateBoard };
})();

const displayController = (() => {

  return { };
})();

const player = (name, marker) => {
  return { name, marker };
};

const player1 = player("Player 1", "X");
const player2 = player("Player 2", "O");

board.initializeBoard();
board.updateBoard();
