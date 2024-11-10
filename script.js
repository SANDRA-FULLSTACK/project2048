const scoreEl = document.getElementById("score");
const recordScore = document.getElementById("record-score");
const gameBoard = document.getElementById("game-board");

let board = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];
let score = 0;
let recupScore = 0;

function startGame() {
  resetBoard();
  addRandomTile();
  addRandomTile();
  updateBoard();
  recupOldRecord(recordScore, recupScore);
}

function recupOldRecord(scoreEl, score) {
  if (scoreEl) {
    scoreEl.innerText = score.toString();
  }
}

function resetBoard() {
  board = board.map((row) => row.map(() => 0));
  score = 0;

  if (scoreEl) {
    scoreEl.innerText = score.toString();
  }
}

function addRandomTile() {
  const emptyTiles = [];
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (board[row][col] === 0) emptyTiles.push({ row, col });
    }
  }

  if (emptyTiles.length) {
    const { row, col } =
      emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    board[row][col] = Math.random() < 0.9 ? 2 : 4;
  }
}

function updateBoard() {
  if (!gameBoard) return;

  gameBoard.innerHTML = "";
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      const tile = createTile(board[row][col]);
      gameBoard.appendChild(tile);
    }
  }
}

function createTile(value) {
  const tile = document.createElement("div");
  tile.className = "tile";
  tile.textContent = value ? value : "";
  tile.style.backgroundColor = getTileColor(value);
  tile.style.backgroundImage = 'url("path/to/wood-texture.jpg")';
  tile.style.backgroundSize = "cover";
  tile.style.borderRadius = "50px";
  tile.style.boxShadow = "0 2px px rgba(0, 0, 0, 0.3)";
  tile.style.color = [2, 4, 8].includes(value) ? "#4c4c4c" : "#f3e8d9";
  return tile;
}

function getTileColor(value) {
  const colors = [
    "rgba(205, 170, 125, 0.9)",
    "rgba(181, 136, 99, 0.9)",
    "rgba(159, 120, 92, 0.9)",
    "rgba(139, 101, 74, 0.9)",
    "rgba(121, 85, 59, 0.9)",
    "rgba(101, 68, 41, 0.9)",
    "rgba(85, 51, 26, 0.9)",
    "rgba(69, 48, 30, 0.9)",
    "rgba(59, 42, 25, 0.9)",
    "rgba(50, 34, 20, 0.9)",
    "rgba(44, 28, 15, 0.9)",
    "rgba(35, 20, 10, 0.9)",
  ];
  return value === 0
    ? colors[0]
    : colors[Math.log2(value)] || colors[colors.length - 1];
}

function isValidMove(row, col, newRow, newCol) {
  if (newRow < 0 || newRow >= 4 || newCol < 0 || newCol >= 4) return false;

  return (
    board[newRow][newCol] === 0 || board[newRow][newCol] === board[row][col]
  );
}

function moveTiles(direction) {
  const moveFunctions = {
    up: (row, col) => ({ newRow: row - 1, newCol: col }),
    down: (row, col) => ({ newRow: row + 1, newCol: col }),
    left: (row, col) => ({ newRow: row, newCol: col - 1 }),
    right: (row, col) => ({ newRow: row, newCol: col + 1 }),
  };

  if (!moveFunctions[direction]) return;

  let tileMoved = false;

  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      const { newRow, newCol } = moveFunctions[direction](row, col);
      if (isValidMove(row, col, newRow, newCol)) {
        board[newRow][newCol] += board[row][col];
        board[row][col] = 0;

        score += board[newRow][newCol];
        tileMoved = true;
      }
    }
  }

  if (tileMoved) {
    addRandomTile();
    updateBoard();
    if (scoreEl) {
      scoreEl.innerText = score.toString();
    }
    if (score > recupScore) {
      recupScore = score;
      recupOldRecord(recordScore, recupScore);
    }
  }
}

document.addEventListener("keydown", function (event) {
  const directionKeys = {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right",
  };
  if (directionKeys[event.key]) moveTiles(directionKeys[event.key]);
});

const newGameBtn = document.getElementById("new-game-btn");
if (newGameBtn) {
  newGameBtn.addEventListener("click", startGame);
}

startGame();
