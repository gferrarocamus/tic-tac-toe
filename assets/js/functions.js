const player = (name, marker) => {
  const makeMove = (e) => {
    const id = e.target.id;
    board.arr[id] = marker;
  };
  return { name, marker, makeMove };
};

const play = (e) => {
  gameLogic.currentPlayer().makeMove(e);
  displayController.updateBoard();
  displayController.disableClick(e.target);
  const stop = gameLogic.checkForWinner();
  if (!stop) {
    displayController.setMessage(`${gameLogic.currentPlayer().name}'s turn!`);
  }
};

const board = (() => {
  const arr = Array(9).fill("");
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
  const tie = () => {
    return arr.indexOf("") === -1;
  };
  const win = () => {
    for (let i = 0; i < winCombos.length; i += 1) {
      const first = arr[winCombos[i][0]];
      if (
        first !== "" &&
        first === arr[winCombos[i][1]] &&
        first === arr[winCombos[i][2]]
      ) {
        return true;
      }
    }
    return false;
  };
  return { arr, win, tie };
})();

const displayController = (() => {
  const updateBoard = () => {
    board.arr.forEach((marker, index) => {
      const div = document.getElementById(index);
      div.textContent = marker;
    });
  };
  const setMessage = msg => {
    const messagesDiv = document.getElementById("messages");
    messagesDiv.textContent = msg;
  };
  const stopGame = win => {
    const msg = win
      ? `${gameLogic.currentPlayer().name} is the winner!`
      : "It's a tie!";
    setMessage(msg);
    const cells = document.getElementsByClassName("cell");
    [...cells].forEach(element => {
      disableClick(element);
    });
    const restartBtn = document.getElementById("restartBtn");
    restartBtn.classList.toggle("hide");
    restartBtn.onclick = () => {
      location.reload();
    };
  };
  const startGame = () => {
    for (let i = 0; i < 9; i += 1) {
      const div = document.getElementById(i);
      enableClick(div);
    }
    setMessage(`${gameLogic.currentPlayer().name}'s turn!`);
  };
  const enableClick = (element) => {
    element.addEventListener("click", play, false);
  };
  const disableClick = (element) => {
    element.removeEventListener("click", play, false);
  };
  return { updateBoard, setMessage, stopGame, disableClick, startGame };
})();

const gameLogic = (() => {
  let activeTurn = 0;
  let players = [];
  const setPlayers = arr => {
    players = arr;
  };
  const togglePlayer = () => {
    activeTurn = activeTurn === 0 ? 1 : 0;
  };
  const currentPlayer = () => {
    return players[activeTurn];
  };
  const checkForWinner = () => {
    if (board.win()) {
      displayController.stopGame(true);
    } else if (board.tie()) {
      displayController.stopGame(false);
    } else {
      togglePlayer();
      return false;
    }
    return true;
  };
  return { setPlayers, currentPlayer, checkForWinner };
})();

const player1 = player("Player 1", "X");
const player2 = player("Player 2", "O");
gameLogic.setPlayers([player1, player2]);
displayController.startGame();
