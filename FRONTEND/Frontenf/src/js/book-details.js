document.addEventListener("DOMContentLoaded", async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const bookId = urlParams.get("id");
  const API_URL = `http://127.0.0.1:8000/api/books/${bookId}`;

  console.log("🔍 Consultando libro con ID:", bookId);

  const token = localStorage.getItem("token");

  if (!token) {
    alert("⚠️ Debes iniciar sesión para ver los detalles del libro.");
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener los detalles del libro.");
    }

    const book = await response.json();

    // Aquí va tu código para mostrar el libro en el HTML
    console.log("📖 Detalles del libro:", book);
    document.getElementById("titulo").textContent = book.titulo;
    document.getElementById("autor").textContent = book.autor;
    document.getElementById("descripcion").textContent = book.descripcion;
    document.getElementById("imagen").src = `${book.imagen}`;


  } catch (error) {
    console.error("❌ Error:", error);
    alert("❌ Error al cargar los detalles del libro.");
  }
});
