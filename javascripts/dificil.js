let moves = 0;
let seconds = 0;
let timer;
let isPlaying = false;
let nivelActual = 0; // controla cuál puzzle está activo

const movesSpan = $("#moves");
const timeSpan = $("#time");
const board = $("#puzzle-board");
const previewImg = $(".preview-img");

// Lista de imágenes a usar
const imagenes = [
  "../imagenes/nvlDificil/Centro_Historico.jpg",
  "../imagenes/nvlDificil/Coatepeque2.jpeg",
  "../imagenes/nvlDificil/Cotuza.jpg",
  "../imagenes/nvlDificil/Ilamatepec.jpg",
  "../imagenes/nvlDificil/Salvador_del_Mundo.jpg"
];

// Arreglo que contiene las piezas del puzzle
let tiles = [];
let emptyIndex;

// Funcion que inicia el cronometro
function startTimer() {
  if (!isPlaying) {
    isPlaying = true;
    timer = setInterval(() => {
      seconds++;
      timeSpan.text(formatTime(seconds));
    }, 1000);
  }
}

//Funcion que controla el formato del cronometro
function formatTime(sec) {
  let m = Math.floor(sec / 60);
  let s = sec % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

//Funcion que crea el tablero del puzzle
function createBoard() {
  tiles = [];
  board.empty();
  const size = 5;
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

//Funcion que ordena aleatoriamente el puzzle
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

//Funcion que obtiene los movimientos validos del puzzle
function getValidMoves() {
  const size = 5;
  const validMoves = [];
  const row = Math.floor(emptyIndex / size);
  const col = emptyIndex % size;

  if (row > 0) validMoves.push(emptyIndex - size);
  if (row < size - 1) validMoves.push(emptyIndex + size);
  if (col > 0) validMoves.push(emptyIndex - 1);
  if (col < size - 1) validMoves.push(emptyIndex + 1);

  return validMoves;
}

//Funcion que intercambia las piezas del puzzle
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

//Funcion que mueve las piezas del puzzle
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

//Funcion que controla si el puzzle esta correctamente armado
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
    window.location.href = "felicitaciones.html";
  }

  return true;
}

// Iniciar primer puzzle al cargar
$(document).ready(() => {
  createBoard();
});
