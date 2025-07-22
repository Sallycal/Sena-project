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
    const res = await fetch(`http://127.0.0.1:8000/api/books/category/${categoryId}`);

    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`);
    }

    const booksInCategory = await res.json();
    const categoryName = booksInCategory[0]?.categories[0]?.name || "Desconocida"; // Asume que todos los libros tienen la misma categoría

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
      <a href="book-details.html?id=${book.id}">Ver Detalles</a>
    `;

    container.appendChild(card);
  });
}