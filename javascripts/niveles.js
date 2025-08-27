document.addEventListener("DOMContentLoaded", function () {
  const descripciones = [
    "Ideal para principiantes. Puzzles sencillos para familiarizarte con el juego.",
    "Un reto moderado. Puzzles con dificultad media para quienes buscan un desafío.",
    "Solo para expertos. Puzzles complejos que pondrán a prueba tus habilidades.",
  ];

  const botones = document.querySelectorAll(".btn-nivel");
  const parrafo = document.getElementById("parrafo").querySelector("p");

  botones.forEach((btn, idx) => {
    btn.addEventListener("mouseenter", () => {
      parrafo.textContent = descripciones[idx];
    });
    btn.addEventListener("mouseleave", () => {
      parrafo.textContent = "";
    });
  });
});
