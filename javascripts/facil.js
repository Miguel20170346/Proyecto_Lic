let moves = 0;
let seconds = 0;
let timer;
let isPlaying = false;

const movesSpan = document.getElementById("moves");
const timeSpan = document.getElementById("time");
const board = document.getElementById("puzzle-board");

let tiles = [];
let emptyIndex = 8; // Última celda vacía en el tablero 3x3

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

// Formatear tiempo mm:ss
function formatTime(sec) {
  let m = Math.floor(sec / 60);
  let s = sec % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

// Crear tablero dinámico
function createBoard() {
  tiles = [];
  board.innerHTML = ""; // limpiar tablero
  for (let i = 0; i < 9; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    if (i === 8) {
      tile.classList.add("empty");
    } else {
      let x = (i % 3) * -100;
      let y = Math.floor(i / 3) * -100;
      tile.style.backgroundPosition = `${x}px ${y}px`;
      tile.dataset.index = i; // posición original
      tile.addEventListener("click", () => moveTile(i));
    }
    tiles.push(tile);
    board.appendChild(tile);
  }
  shuffleBoard();
}

// Mezclar el tablero con movimientos válidos
function shuffleBoard() {
  let lastMove;
  for (let i = 0; i < 100; i++) {
    let possibleMoves = getValidMoves();
    // evitar que repita siempre el mismo
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

// Obtener movimientos válidos desde la posición vacía
function getValidMoves() {
  const validMoves = [];
  const row = Math.floor(emptyIndex / 3);
  const col = emptyIndex % 3;

  if (row > 0) validMoves.push(emptyIndex - 3); // arriba
  if (row < 2) validMoves.push(emptyIndex + 3); // abajo
  if (col > 0) validMoves.push(emptyIndex - 1); // izquierda
  if (col < 2) validMoves.push(emptyIndex + 1); // derecha

  return validMoves;
}

// Intercambiar fichas
function swapTiles(i, j) {
  [tiles[i].className, tiles[j].className] = [tiles[j].className, tiles[i].className];
  [tiles[i].style.backgroundPosition, tiles[j].style.backgroundPosition] = [tiles[j].style.backgroundPosition, tiles[i].style.backgroundPosition];
}

// Movimiento de fichas por clic
function moveTile(index) {
  if (getValidMoves().includes(index)) {
    swapTiles(index, emptyIndex);
    emptyIndex = index;
    moves++;
    movesSpan.textContent = moves;
    startTimer();
  }
}

// Inicializar juego
createBoard();
