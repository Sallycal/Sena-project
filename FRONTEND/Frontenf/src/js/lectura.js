document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const bookId = params.get('id'); // Obtener el ID del libro desde la URL

    if (bookId) {
        loadPDF(bookId);
    } else {
        console.error("No se ha proporcionado un ID de libro.");
    }
});

async function loadPDF(bookId) {
    try {
        // Asegúrate de que la URL está bien formada y tiene las comillas correctas
        const res = await fetch(`http://127.0.0.1:8000/api/books/${bookId}`);
        
        if (!res.ok) {
            throw new Error(`Error HTTP: ${res.status}`);
        }

        const book = await res.json();
        
        // Verifica que la URL del PDF se ha recibido correctamente
        console.log("📜 PDF URL: ", book.pdf_filename);

        // Ahora, carga el PDF en el iframe
        const pdfUrl = book.pdf_filename;
        document.getElementById('pdf-viewer').src = pdfUrl;
    } catch (error) {
        console.error("Error al cargar el PDF:", error);
        alert("Error al cargar el PDF.");
    }
}