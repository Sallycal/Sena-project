

const API_URL = "http://127.0.0.1:8000/api/books";
const booksPerPage = 50;
let currentPage = 1;
let books = [];

// Verificar si el script carga
console.log("✅ script.js cargado");

window.addEventListener("DOMContentLoaded", async () => {
  console.log("✅ DOMContentLoaded");

  try {
    console.log("🌐 Solicitando libros a la API:", API_URL);
    const res = await fetch(API_URL);

    if (!res.ok) {
    throw new Error(`Error HTTP: ${res.status}`);
    }

    books = await res.json();
    console.log("📚 Libros recibidos:", books);

    renderBooks();
    updatePagination();
  } catch (error) {
    console.error("❌ Error al cargar libros:", error);
  }
});

function renderBooks() {
  const start = (currentPage - 1) * booksPerPage;
  const end = start + booksPerPage;
  const pageBooks = books.slice(start, end);

  console.log(`🔍 Mostrando libros de ${start} a ${end}`);

  const container = document.getElementById("book-list");
  container.innerHTML = "";

  pageBooks.forEach(book => {
    const card = document.createElement("article");
    card.classList.add("book-card");

    card.innerHTML = `
        <img src="${book.imagen}" alt="Portada del libro">
      <h3>${book.titulo}</h3>
      <p><strong>Autor:</strong> ${book.autor}</p>
      <p>${book.descripcion}</p>
      <a href="book-details.html?id=${book.id}">Ver Detalles</a>
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

document.getElementById("prev-btn").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderBooks();
    updatePagination();
  }
});

document.getElementById("next-btn").addEventListener("click", () => {
  if (currentPage * booksPerPage < books.length) {
    currentPage++;
    renderBooks();
    updatePagination();
  }
});
  