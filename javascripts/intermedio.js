const board = document.getElementById("board");
const timerElement = document.getElementById("timer");
const size = 4; // 4x4
const tileSize = 75; // tamaño de cada pieza
let tiles = [];
let seconds = 0;
let timer;

// Crear puzzle
function createPuzzle() {
  let order = [...Array(size * size).keys()]; // [0...15]
  order.sort(() => Math.random() - 0.5); // Desordenar

  order.forEach((pos, index) => {
    const tile = document.createElement("div");
    tile.classList.add("tile");

    if (pos === 0) {
      tile.classList.add("empty"); // Espacio vacío
    } else {
      // Calcular la parte de la imagen que le corresponde a esta pieza
      let x = (pos % size) * -tileSize;
      let y = Math.floor(pos / size) * -tileSize;
      tile.style.backgroundPosition = `${x}px ${y}px`;
    }

    // Guardar posición inicial
    tile.dataset.correct = pos;
    tile.dataset.index = index;

    board.appendChild(tile);
    tiles.push(tile);
  });
}

// Cronómetro
function startTimer() {
  timer = setInterval(() => {
    seconds++;
    let min = String(Math.floor(seconds / 60)).padStart(2, '0');
    let sec = String(seconds % 60).padStart(2, '0');
    timerElement.textContent = `${min}:${sec}`;
  }, 1000);
}

createPuzzle();
startTimer();
