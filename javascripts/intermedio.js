const board = document.getElementById("puzzle-board");
const movesSpan = document.getElementById("moves");
const timeSpan = document.getElementById("time");

let size = 4; // 4x4
let tiles = [];
let empty = { x: size - 1, y: size - 1 };
let moves = 0;
let timer;
let seconds = 0;

// Inicializar tablero
function initBoard() {
  board.innerHTML = "";
  tiles = [];
  let numbers = Array.from({ length: size * size - 1 }, (_, i) => i + 1);
  numbers.push(""); // espacio vacío
  numbers = shuffle(numbers);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let value = numbers[y * size + x];
      let tile = document.createElement("div");
      tile.classList.add("tile");
      if (value === "") {
        tile.classList.add("empty");
        empty = { x, y };
      } else {
        tile.textContent = value;
        tile.addEventListener("click", () => moveTile(x, y));
      }
      board.appendChild(tile);
      tiles.push(tile);
    }
  }
  moves = 0;
  movesSpan.textContent = moves;
  seconds = 0;
  timeSpan.textContent = "00:00";
  clearInterval(timer);
  timer = setInterval(updateTime, 1000);
}

// Mezclar tablero
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Mover ficha
function moveTile(x, y) {
  if ((Math.abs(empty.x - x) === 1 && empty.y === y) ||
      (Math.abs(empty.y - y) === 1 && empty.x === x)) {
    const index = y * size + x;
    const emptyIndex = empty.y * size + empty.x;

    tiles[emptyIndex].textContent = tiles[index].textContent;
    tiles[emptyIndex].classList.remove("empty");
    tiles[index].textContent = "";
    tiles[index].classList.add("empty");

    empty = { x, y };
    moves++;
    movesSpan.textContent = moves;
  }
}

// Temporizador
function updateTime() {
  seconds++;
  let mins = Math.floor(seconds / 60).toString().padStart(2, "0");
  let secs = (seconds % 60).toString().padStart(2, "0");
  timeSpan.textContent = `${mins}:${secs}`;
}

initBoard();
