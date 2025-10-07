document.addEventListener("DOMContentLoaded", function () {
  // Arreglo que contiene las descripciones de cada nivel (se podria haber hecho en un JSON pero se hizo asi antes de conocerlos)
  const descripciones = [
    "Ideal para principiantes. Puzzles sencillos para familiarizarte con el juego.",
    "Un reto moderado. Puzzles con dificultad media para quienes buscan un desafío.",
    "Solo para expertos. Puzzles complejos que pondrán a prueba tus habilidades.",
  ];

  //obtiene los botones y el párrafo donde se mostrarán las descripciones
  const botones = document.querySelectorAll(".btn-nivel");
  const parrafo = document.getElementById("parrafo").querySelector("p");

  // Agrega eventos de mouseenter y mouseleave a cada botón
  botones.forEach((btn, idx) => {
    btn.addEventListener("mouseenter", () => {
      parrafo.textContent = descripciones[idx];
    });
    btn.addEventListener("mouseleave", () => {
      parrafo.textContent = "";
    });
  });
});
