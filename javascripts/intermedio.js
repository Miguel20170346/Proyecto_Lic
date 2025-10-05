const board = document.getElementById("puzzle-board");
const movesSpan = document.getElementById("moves");
const timeSpan = document.getElementById("time");

let tiles = [];
let emptyIndex;
let moves = 0;
let seconds = 0;
let timer;
let isPlaying = false;
let size = 4; 

// Crear tablero 
function createBoard() {
  tiles = [];
  board.innerHTML = "";

  board.style.gridTemplateColumns = `repeat(${size}, 100px)`;
  board.style.gridTemplateRows = `repeat(${size}, 100px)`;

  const total = size * size;

  for (let i = 0; i < total; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");

    if (i === total - 1) {
      tile.classList.add("empty");
      emptyIndex = i; // última ficha vacía
    } else {
      const row = Math.floor(i / size);
      const col = i % size;

      tile.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;
    }

    tile.addEventListener("click", () => moveTile(i));
    board.appendChild(tile);
    tiles.push(tile);
  }

  shuffleBoard();
}

// Mezclar el tablero
function shuffleBoard() {
  let lastMove;
  for (let i = 0; i < 200; i++) { // más movimientos para mezclar bien
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
  const validMoves = [];
  const row = Math.floor(emptyIndex / size);
  const col = emptyIndex % size;

  if (row > 0) validMoves.push(emptyIndex - size); // arriba
  if (row < size - 1) validMoves.push(emptyIndex + size); // abajo
  if (col > 0) validMoves.push(emptyIndex - 1); // izquierda
  if (col < size - 1) validMoves.push(emptyIndex + 1); // derecha

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

// Temporizador
function startTimer() {
  if (!isPlaying) {
    isPlaying = true;
    timer = setInterval(() => {
      seconds++;
      let min = String(Math.floor(seconds / 60)).padStart(2, "0");
      let sec = String(seconds % 60).padStart(2, "0");
      timeSpan.textContent = `${min}:${sec}`;
    }, 1000);
  }
}


createBoard();
