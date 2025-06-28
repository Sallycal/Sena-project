// Esperamos a que el DOM se cargue completamente
window.addEventListener('DOMContentLoaded', function() {
    console.log("Script cargado correctamente.");

    // Datos de los libros
    const books = [
      {
        id: 1,
        title: "El Principito",
        author: "Antoine de Saint-Exupéry",
        year: 1943,
        genre: "Ficción",
        description: "Un clásico de la literatura sobre un pequeño príncipe y sus aventuras.",
        cover: "el_principito.jpg"
      },
      {
        id: 2,
        title: "Cien Años de Soledad",
        author: "Gabriel García Márquez",
        year: 1967,
        genre: "Realismo Mágico",
        description: "La historia de la familia Buendía en el pueblo ficticio de Macondo.",
        cover: "cien_anos.jpg"
      }
    ];

    // Obtener el parámetro 'id' de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = parseInt(urlParams.get("id"));

    // Verificar si bookId existe y mostrarlo en consola
    console.log("Book ID:", bookId);

    // Buscar el libro con el id correspondiente
    const book = books.find(b => b.id === bookId);

    if (book) {
      console.log("Book:", book); // Verifica los detalles del libro

      // Si encontramos el libro, mostramos sus detalles
      document.getElementById("book-detail").innerHTML = `
        <img src="assets/${book.cover}" alt="${book.title}">
        <h2>${book.title}</h2>
        <p><strong>Autor:</strong> ${book.author}</p>
        <p><strong>Año:</strong> ${book.year}</p>
        <p><strong>Género:</strong> ${book.genre}</p>
        <p><strong>Descripción:</strong> ${book.description}</p>
        <a href="index.html" class="btn">Volver a la Lista</a>
      `;
    } else {
      // Si no encontramos el libro, mostramos un mensaje de error
      console.error("Libro no encontrado");
      document.getElementById("book-detail").innerHTML = `
        <p>Libro no encontrado. <a href="index.html" class="btn">Volver a la lista</a></p>
      `;
    }
});

