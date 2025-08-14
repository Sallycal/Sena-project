const API_URL = "http://127.0.0.1:8000/api/books";
const booksPerPage = 50;
let currentPage = 1;
let books = [];


console.log(" script.js cargado");

async function fetchAllBooks() {
  try {
    console.log("Solicitando libros a la API:", API_URL);
    const token = localStorage.getItem("token");

    const headers = token
      ? { "Authorization": `Bearer ${token}` }
      : {};  // Sin token, sin headers

    const res = await fetch(API_URL, {
      headers,
    });

    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`);
    }

    //books = await res.json();
    const data = await res.json();
    books = data.data;

    console.log("Libros recibidos:", books);
    renderBooks();
    updatePagination();
  } catch (error) {
    console.error("Error al cargar libros:", error);
  }
}

window.addEventListener("DOMContentLoaded", fetchAllBooks);

function renderBooks() {
  const start = (currentPage - 1) * booksPerPage;
  const end = start + booksPerPage;
  const pageBooks = books.slice(start, end);

  const container = document.getElementById("book-list");
  container.innerHTML = "";  // Limpiar el contenedor de libros

  pageBooks.forEach(book => {
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

function updatePagination() {
  const pageInfo = document.getElementById("page-info");
  pageInfo.textContent = `Página ${currentPage}`;

  document.getElementById("prev-btn").disabled = currentPage === 1;
  document.getElementById("next-btn").disabled = currentPage * booksPerPage >= books.length;
}

document.getElementById("search-btn").addEventListener("click", async () => {
  const query = document.getElementById("search").value.trim();

  if (!query) {

    currentPage = 1;
    await fetchAllBooks();
    return;
  }

  try {
    const res = await fetch(`http://127.0.0.1:8000/api/books/search?q=${encodeURIComponent(query)}`);

    if (!res.ok) {
     
      throw new Error(`Error HTTP: ${res.status}`);

    }

    books = await res.json();
    currentPage = 1;
    renderBooks();
    updatePagination();
  } catch (error) {
    console.error("Error en la búsqueda:", error);
  }
});

function scrollToBooks() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.getElementById("prev-btn").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderBooks();
    updatePagination();
    scrollToBooks(); 
  }
});

document.getElementById("next-btn").addEventListener("click", () => {
  if (currentPage * booksPerPage < books.length) {
    currentPage++;
    renderBooks();
    updatePagination();
    scrollToBooks(); 
  }
});


// Lógica para el menú desplegable
document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("menu-button");
  const dropdownMenu = document.getElementById("dropdown-menu");

  if (menuButton && dropdownMenu) {
    menuButton.addEventListener("click", (e) => {
      e.preventDefault(); // Evita que recargue la página
      dropdownMenu.classList.toggle("show"); // Muestra u oculta el submenú
    });
  }
});

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