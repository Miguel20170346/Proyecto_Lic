let moves = 0;
let seconds = 0;
let timer;
let isPlaying = false;

const movesSpan = document.getElementById("moves");
const timeSpan = document.getElementById("time");
const board = document.getElementById("puzzle-board");

let tiles = [];
let emptyIndex;

// Iniciar temporizador
function startTimer() {
  if (!isPlaying) {
    isPlaying = true;
    timer = setInterval(() => {
      seconds++;
      timeSpan.textContent = formatTime(seconds);
    }, 1000);
  }
}

function formatTime(sec) {
  let m = Math.floor(sec / 60);
  let s = sec % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

// Crear tablero dinámico
function createBoard() {
  tiles = [];
  board.innerHTML = "";
  const size = 3;
  const total = size * size;

  board.style.gridTemplateColumns = `repeat(${size}, 100px)`;
  board.style.gridTemplateRows = `repeat(${size}, 100px)`;

  for (let i = 0; i < total; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");

    if (i === total - 1) {
      tile.classList.add("empty");
      emptyIndex = i;
    } else {
      const row = Math.floor(i / size);
      const col = i % size;
      tile.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;
    }

    tile.addEventListener("click", () => moveTile(tiles.indexOf(tile)));
    board.appendChild(tile);
    tiles.push(tile);
  }

  shuffleBoard();
}

// Mezclar el tablero
function shuffleBoard() {
  let lastMove;
  for (let i = 0; i < 150; i++) {
    let possibleMoves = getValidMoves();
    let move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    if (move !== lastMove) {
      swapTiles(move, emptyIndex);
      emptyIndex = move;
      lastMove = move;
    }
  }

  moves = 0;
  seconds = 0;
  isPlaying = false;
  clearInterval(timer);
  movesSpan.textContent = moves;
  timeSpan.textContent = "00:00";
}

// Movimientos válidos
function getValidMoves() {
  const size = 3;
  const validMoves = [];
  const row = Math.floor(emptyIndex / size);
  const col = emptyIndex % size;

  if (row > 0) validMoves.push(emptyIndex - size);
  if (row < size - 1) validMoves.push(emptyIndex + size);
  if (col > 0) validMoves.push(emptyIndex - 1);
  if (col < size - 1) validMoves.push(emptyIndex + 1);

  return validMoves;
}

// Intercambiar fichas
function swapTiles(i, j) {
  [tiles[i].className, tiles[j].className] = [tiles[j].className, tiles[i].className];
  [tiles[i].style.backgroundPosition, tiles[j].style.backgroundPosition] = [tiles[j].style.backgroundPosition, tiles[i].style.backgroundPosition];
}

// Mover ficha
function moveTile(index) {
  if (getValidMoves().includes(index)) {
    swapTiles(index, emptyIndex);
    emptyIndex = index;
    moves++;
    movesSpan.textContent = moves;
    startTimer();
  }
}

createBoard();

