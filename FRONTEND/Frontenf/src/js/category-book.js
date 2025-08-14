document.addEventListener("DOMContentLoaded", function() {
  const categoryId = new URLSearchParams(window.location.search).get("id");

  if (categoryId) {
    fetchCategoryBooks(categoryId);
  } else {
    console.error("No se ha proporcionado un ID de categoría.");
  }
});

async function fetchCategoryBooks(categoryId) {
  try {
    const API_URL = `http://127.0.0.1:8000/api/books/category/${categoryId}`;
    const token = localStorage.getItem("token");

    const headers = token
      ? { "Authorization": `Bearer ${token}` }
      : {};

    const res = await fetch(API_URL,{
      headers,
    });

    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`);
    }

    const json = await res.json();
    const booksInCategory = json.data;
    const categoryName = booksInCategory[0]?.categories[0]?.name || "Desconocida";

    document.getElementById("category-name").textContent = categoryName;
    renderCategoryBooks(booksInCategory);
  } catch (error) {
    console.error("Error al cargar los libros de la categoría:", error);
  }
}

function renderCategoryBooks(booksInCategory) {
  const container = document.getElementById("category-book-list");
  container.innerHTML = ""; // Limpiar contenido previo

  booksInCategory.forEach(book => {
    const card = document.createElement("article");
    card.classList.add("book-card");

    card.innerHTML = `
      <img src="${book.imagen}" alt="Portada del libro">
      <h3>${book.titulo}</h3>
      <h3>${book.autor}</h3>

      <div class="card-actions">
       <a href="book-details.html?id=${book.id}">Ver Detalles</a>
       <button class="save-btn" data-id="${book.id}" aria-label="Guardar libro">
         <i class="fa-bookmark icon-bookmark ${book.is_saved ? 'fa-solid saved' : 'fa-regular'}" data-id="${book.id}"></i>
        </button>
      </div>
    `;

    container.appendChild(card);
  });
}

// Lógica de guardados
document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("icon-bookmark")) {
    const bookId = e.target.dataset.id;
    const token = localStorage.getItem("token");

    // Verificar si el usuario está autenticado
    if (!token) {
      alert("Debes iniciar sesión para guardar libros.");
      return;
    }

    try {
      // Solicitar la API para guardar o desguardar el libro
      const res = await fetch(`http://127.0.0.1:8000/api/books/${bookId}/save`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error(`Error: ${res.status}`);

      const data = await res.json();

      // Alternar clase visual según si el libro fue guardado o no
      const icon = e.target;

      if (data.saved) {
        icon.classList.add("fa-solid", "saved");
        icon.classList.remove("fa-regular");
      } else {
        icon.classList.remove("fa-solid", "saved");
        icon.classList.add("fa-regular");
      }

      // Actualizar el estado del libro en el frontend
      const book = books.find(b => b.id === parseInt(bookId));
      if (book) {
        book.is_saved = data.saved;  // Actualizar el estado de guardado
      }

    } catch (err) {
      console.error("Error al guardar/desguardar el libro:", err);
    }
  }
});