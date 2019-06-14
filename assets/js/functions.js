const board = (() => {
  const arr = ["X","X","X","X","X","X","X","X","X"];
  const updateBoard = () => {
    arr.forEach(marker => {});
  };
  return { arr, updateBoard }; 
})();

const displayController = (() => {
  
  return { };
})();

const player = (name, marker) => {
  
  return { name, marker };
};

const player1 = player("Player 1", "X");
const player2 = player("Player 2", "O");