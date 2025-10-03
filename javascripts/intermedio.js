const board = document.getElementById("board");
const size = 4; // 4x4
let tiles = [];

// Crear las piezas del puzzle
function createPuzzle() {
  let order = [...Array(size * size).keys()]; // [0...15]
  order.sort(() => Math.random() - 0.5); // Desordenar

  order.forEach((pos, index) => {
    const tile = document.createElement("div");
    tile.classList.add("tile");

    if (pos === 0) {
      tile.classList.add("empty"); // Espacio vacío
    } else {
      let x = (pos % size) * -75; 
      let y = Math.floor(pos / size) * -75;
      tile.style.backgroundPosition = `${x}px ${y}px`;
    }

    tile.dataset.index = index;
    board.appendChild(tile);
    tiles.push(tile);
  });
}

createPuzzle();
