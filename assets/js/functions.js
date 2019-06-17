const player = (name, marker) => {
  const makeMove = (cellId) => {
    board.arr[cellId] = marker
  }
  return { name, marker, makeMove };
};

const player1 = player("Player 1", "X");
const player2 = player("Player 2", "O");

const board = (() => {
  let arr = [];
  const initializeBoard = () => {
    for (let i = 0; i < 9; i++) {
      arr.push('');
      const div = document.getElementById(i);
      div.addEventListener('click', gameLogic.play, false);
    }
  };
  const updateArray = marker => {
    const id = event.srcElement.id;
    arr[id] = marker;
  }
  const updateBoard = () => {
    arr.forEach((marker, index) => {
      const div = document.getElementById(index);
      div.textContent = marker;
    });
  };
  return { arr, initializeBoard, updateBoard, updateArray };
})();

const gameLogic = (() => {
  let activeTurn = 0;
  let players = [player1, player2];
  const togglePlayer = () => {
    activeTurn = activeTurn === 0 ? 1 : 0;
  };
  const play = (e) => {
    board.updateArray(players[activeTurn].marker);
    board.updateBoard();
    togglePlayer();
    e.target.removeEventListener('click', play, false);
  };
  return { play };
})();


board.initializeBoard();
// board.updateBoard();

// const play = (() => {
//   let moves = 0;
//   while (moves < 9) {
//     [player1, player2].forEach(player => {
//       displayController.setCurrentPlayer(player);
//       //Player makes move
//       moves++;
//     });
//   }
// })();
