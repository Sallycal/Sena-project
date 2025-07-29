document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const bookId = params.get('id'); // Obtener el ID del libro desde la URL

    if (bookId) {
        cargarLectura(bookId);

        // ✅ Establecer el enlace dinámico del botón "Anterior"
        const backButton = document.getElementById("back-button");
        if (backButton) {
            backButton.href = `./book-details.html?id=${bookId}`;
        }
    } else {
        console.error("No se ha proporcionado un ID de libro.");
    }
});

async function cargarLectura(bookId) {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("⚠️ Debes iniciar sesión para leer este libro.");
        return;
    }

    try {
        const res = await fetch(`http://127.0.0.1:8000/api/books/${bookId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!res.ok) {
            throw new Error(`Error HTTP: ${res.status}`);
        }

        const book = await res.json();

        document.getElementById("titulo").textContent = book.titulo;
        // Mostrar el PDF (si existe)
        if (book.pdf_filename) {
            document.getElementById("pdf-viewer").src = book.pdf_filename;
        } else {
            document.getElementById("pdf-container").innerHTML = "<p>⚠️ Este libro no tiene un PDF disponible.</p>";
        }

    } catch (error) {
        console.error("❌ Error al cargar la lectura:", error);
        alert("Ocurrió un error al cargar el libro.");
    }
}
