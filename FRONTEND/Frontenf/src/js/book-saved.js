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

        <a href="book-details.html?id=${book.id}">Ver Detalles</a>
        <button class="save-btn" data-id="${book.id}" aria-label="Guardar libro">
        <i class="fa-bookmark icon-bookmark ${book.is_saved ? 'fa-solid saved' : 'fa-regular'}" data-id="${book.id}"></i>
      </button>
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

// Lógica de guardados
document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("icon-bookmark")) {
    const bookId = e.target.dataset.id;
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Debes iniciar sesión para guardar libros.");
      return;
    }

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/books/${bookId}/save`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error(`Error: ${res.status}`);

      const data = await res.json();
      const icon = e.target;

      if (data.saved) {
        icon.classList.add("fa-solid", "saved");
        icon.classList.remove("fa-regular");
      } else {
        icon.classList.remove("fa-solid", "saved");
        icon.classList.add("fa-regular");

        setTimeout(() => {
          const card = icon.closest(".saved-card");
          if (card) {
            card.remove();
          }
        }, 300); 

      }

    } catch (err) {
      console.error("Error al guardar/desguardar el libro:", err);
    }
  }
});