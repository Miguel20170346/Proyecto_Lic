let moves = 0;
let seconds = 0;
let timer;
let isPlaying = false;
let nivelActual = 0; // controla cuál puzzle está activo

const movesSpan = $("#moves");
const timeSpan = $("#time");
const board = $("#puzzle-board");
const previewImg = $(".preview-img");

// Lista de imágenes (5 puzzles diferentes)
const imagenes = [
  "../imagenes/nvlIntermedio/Cuzuco.jpg",
  "../imagenes/nvlIntermedio/Izalco.jpg",
  "../imagenes/nvlIntermedio/maquilishuat2.jpg",
  "../imagenes/nvlIntermedio/Suchitoto.jpg",
  "../imagenes/nvlIntermedio/Tapir.jpg"
];

let tiles = [];
let emptyIndex;

function startTimer() {
  if (!isPlaying) {
    isPlaying = true;
    timer = setInterval(() => {
      seconds++;
      timeSpan.text(formatTime(seconds));
    }, 1000);
  }
}

function formatTime(sec) {
  let m = Math.floor(sec / 60);
  let s = sec % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

function createBoard() {
  tiles = [];
  board.empty();
  const size = 4;
  const total = size * size;
  const imgURL = imagenes[nivelActual];

  board.css({
    gridTemplateColumns: `repeat(${size}, 100px)`,
    gridTemplateRows: `repeat(${size}, 100px)`
  });

  for (let i = 0; i < total; i++) {
    const tile = $("<div>").addClass("tile");
    tile.attr("data-piece", i);

    if (i === total - 1) {
      tile.addClass("empty");
      emptyIndex = i;
    } else {
      const row = Math.floor(i / size);
      const col = i % size;
      tile.css({
        backgroundImage: `url(${imgURL})`,
        backgroundPosition: `-${col * 100}px -${row * 100}px`,
        backgroundSize: `${size * 100}px ${size * 100}px`
      });
    }

    tile.on("click", () => moveTile(tiles.indexOf(tile[0])));
    board.append(tile);
    tiles.push(tile[0]);
  }

  previewImg.attr("src", imgURL);
  shuffleBoard();
}

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
  movesSpan.text(moves);
  timeSpan.text("00:00");
}

function getValidMoves() {
  const size = 4;
  const validMoves = [];
  const row = Math.floor(emptyIndex / size);
  const col = emptyIndex % size;

  if (row > 0) validMoves.push(emptyIndex - size);
  if (row < size - 1) validMoves.push(emptyIndex + size);
  if (col > 0) validMoves.push(emptyIndex - 1);
  if (col < size - 1) validMoves.push(emptyIndex + 1);

  return validMoves;
}

function swapTiles(i, j) {
  // Verificar que ambos índices existan en el arreglo
  if (!tiles[i] || !tiles[j]) return;

  const tileA = $(tiles[i]);
  const tileB = $(tiles[j]);
  const tempClass = tileA.attr("class");
  const tempPos = tileA.css("background-position");
  const tempImg = tileA.css("background-image");

  // Intercambiar clases y estilos
  tileA.attr("class", tileB.attr("class"));
  tileB.attr("class", tempClass);
  tileA.css("background-position", tileB.css("background-position"));
  tileB.css("background-position", tempPos);
  tileA.css("background-image", tileB.css("background-image"));
  tileB.css("background-image", tempImg);

  // Verificar que ambos elementos tengan dataset antes de intercambiarlo
  if (tiles[i] && tiles[j]) {
    [tiles[i].dataset.piece, tiles[j].dataset.piece] = [tiles[j].dataset.piece, tiles[i].dataset.piece];
  }
}


function moveTile(index) {
  if (getValidMoves().includes(index)) {
    swapTiles(index, emptyIndex);
    emptyIndex = index;
    moves++;
    movesSpan.text(moves);
    startTimer();
    revisarSolucion();
  }
}

function revisarSolucion() {
  const total = tiles.length;
  if (emptyIndex !== total - 1) return false;

  for (let i = 0; i < total - 1; i++) {
    if (parseInt(tiles[i].dataset.piece, 10) !== i) return false;
  }

  clearInterval(timer);
  isPlaying = false;

  alert(`¡Puzzle ${nivelActual + 1} completado!`);

  // Avanzar al siguiente nivel
  nivelActual++;
  if (nivelActual < imagenes.length) {
    setTimeout(createBoard, 800);
  } else {
    alert("¡Completaste todos los puzzles del nivel intermedio! Pasando al nivel difícil...");
    window.location.href = "dificil.html";
  }

  return true;
}

// Iniciar primer puzzle al cargar
$(document).ready(() => {
  createBoard();
});
