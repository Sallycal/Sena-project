document.addEventListener("DOMContentLoaded", async function () {
  const API_URL = "http://127.0.0.1:8000/api/user/saved-books";
  const token = localStorage.getItem("token");

  if (!token) {
    alert("No se encontró token. Por favor inicia sesión.");
    return;
  }

  try {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      }
    });

    const result = await response.json();
    const books = result.data;

    const container = document.getElementById("book-saved");
    container.innerHTML = "";

    if (!books || books.length === 0) {
      container.innerHTML = "<p>No hay libros guardados disponible.</p>";
      return;
    }

    books.forEach((book) => {
      const card = document.createElement("div");
      card.classList.add("saved-card"); 

      card.innerHTML = `
        <img src="${book.imagen}" alt="${book.titulo}">
        <h3>${book.titulo}</h3>
        <p>${book.autor}</p>
        <p>${book.fecha_de_lectura}</p>

        <a href="book-details.html?id=${book.id}">Ver Detalles</a>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error("Error al obtener libros guardados:", error);
    alert("Ocurrió un error al cargar los libros guardados.");
  }

});

document.getElementById("back-button").addEventListener("click", function () {
  window.history.back(); 
});
