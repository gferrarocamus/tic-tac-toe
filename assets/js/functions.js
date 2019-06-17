const player = (name, marker) => {
  return { name, marker };
};

const board = (() => {
  const arr = [];
  const updateArray = (marker) => {
    const id = event.target.id;
    arr[id] = marker;
  };
  return { arr, updateArray };
})();

const displayController = (() => {
  const updateBoard = () => {
    board.arr.forEach((marker, index) => {
      const div = document.getElementById(index);
      div.textContent = marker;
    });
  };
  const setMessage = (msg) => {
    const messagesDiv = document.getElementById("messages");
    messagesDiv.textContent = msg;
  };
  return { updateBoard, setMessage };
})();

const gameLogic = (() => {
  let activeTurn = 0;
  let players = [];

  const setPlayers = (arr) => {
    players = arr;
  };
  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const togglePlayer = () => {
    activeTurn = activeTurn === 0 ? 1 : 0;
  };
  const draw = () => {
    return board.arr.indexOf("") === -1;
  };
  const win = () => {
    for (let i = 0; i < winCombos.length; i++) {
      let first = board.arr[winCombos[i][0]];
      if (
        first !== "" &&
        first === board.arr[winCombos[i][1]] &&
        first === board.arr[winCombos[i][2]]
      ) {
        return true;
      }
    }
    return false;
  };
  const play = e => {
    board.updateArray(players[activeTurn].marker);
    displayController.updateBoard();
    e.target.removeEventListener("click", play, false);
    if (win()) {
      stopGame(players[activeTurn].name + " is the winner!");
    } else if (draw()) {
      stopGame("It's a draw!");
    } else {
      togglePlayer();
      displayController.setMessage(players[activeTurn].name + "'s turn!");
    }
  };
  const startGame = () => {
    for (let i = 0; i < 9; i+=1) {
      board.arr.push('');
      const div = document.getElementById(i);
      div.addEventListener('click', play, false);
    }
    displayController.setMessage(players[activeTurn].name + "'s turn!");
  };
  const stopGame = msg => {
    displayController.setMessage(msg);
    const cells = document.getElementsByClassName("cell");
    [...cells].forEach(element => {
      element.removeEventListener("click", play, false);
    });
    const restartBtn = document.getElementById("restartBtn");
    restartBtn.classList.toggle("hide");
    restartBtn.onclick = () => {
      location.reload();
    };
  };
  return { startGame, setPlayers };
})();

const player1 = player("Player 1", "X");
const player2 = player("Player 2", "O");
gameLogic.setPlayers([player1, player2]);
gameLogic.startGame();
