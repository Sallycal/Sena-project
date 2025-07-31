document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const bookId = params.get('id');

    if (bookId) {
        cargarLectura(bookId);

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
        alert("Debes iniciar sesión para leer este libro.");
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

        document.getElementById("titulo").textContent = book.data.titulo;
        // Mostrar el PDF (si existe)
        if (book.data.pdf_filename) {
            document.getElementById("pdf-viewer").src = book.data.pdf_filename;
            registrarLectura(bookId, token);
        } else {
            document.getElementById("pdf-container").innerHTML = "<p>Este libro no tiene un PDF disponible.</p>";
        }

    } catch (error) {
        console.error("Error al cargar la lectura:", error);
        alert("Ocurrió un error al cargar el libro.");
    }
}

async function registrarLectura(bookId, token) {
    try {
        const res = await fetch(`http://127.0.0.1:8000/api/books/${bookId}/read`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!res.ok) {
            throw new Error(`Error HTTP al registrar lectura: ${res.status}`);
        }

        const data = await res.json();
        console.log("Lectura registrada:", data.message);

    } catch (error) {
        console.error("Error al registrar lectura:", error);
    }
}

