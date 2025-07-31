document.addEventListener("DOMContentLoaded", async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const bookId = urlParams.get("id");
  const API_URL = `http://127.0.0.1:8000/api/books/${bookId}`;
  const token = localStorage.getItem("token");

  console.log("🔍 Consultando libro con ID:", bookId);


  if (!token) {
    const modal = document.getElementById("login-modal");
    if (modal) {
    modal.style.display = "flex";
  }
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

    // Mostrar los detalles del libro en el HTML
    console.log("📖 Detalles del libro:", book);
    document.getElementById("titulo").textContent = book.data.titulo;
    document.getElementById("autor").textContent = book.data.autor;
    document.getElementById("descripcion").textContent = book.data.descripcion;
    document.getElementById("imagen").src = `${book.data.imagen}`;

    // Actualizar el enlace "Ir al libro" con la URL para abrir el PDF
    const btnLeer = document.getElementById("btn-leer");
    btnLeer.href = `/lectura.html?id=${bookId}`;

    const primeraCategoria = book.data.categories?.[0]?.id_categorie;
    if(primeraCategoria){
      cargarLibrosRelacionados(primeraCategoria, book.data.id);
    }

  } catch (error) {
    console.error("❌ Error:", error);
    alert("❌ Error al cargar los detalles del libro.");
  }
});

async function cargarLibrosRelacionados(categoryId, libroActualId) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/books/category/${categoryId}`);
    const libros = await response.json();

    // Filtrar el libro actual y limitar a 10 libros
    const librosFiltrados = libros
      .filter(libro => libro.id !== libroActualId)
    
    function mezclarArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    const librosAleatorios = mezclarArray(librosFiltrados).slice(0, 10);
  

    const carrusel = document.getElementById("carrusel-libros");

    librosAleatorios.forEach(libro => {
      const item = document.createElement("div");
      item.classList.add("carrusel-item");

      item.innerHTML = `
        <img src="${libro.imagen}" alt="${libro.titulo}" style="width:100px;height:auto;">
        <h4>${libro.titulo}</h4>
        <p><small>${libro.autor}</small></p>
        <a href="/book-details.html?id=${libro.id}">Ver más</a>
      `;

      carrusel.appendChild(item);
    });


    // Carrusel navegación
    let scrollIndex = 0;
    const scrollStep = 1;
    const izquierda = document.querySelector(".carrusel-btn.izquierda");
    const derecha = document.querySelector(".carrusel-btn.derecha");

    izquierda.addEventListener("click", () => {
      if (scrollIndex > 0) {
        scrollIndex -= scrollStep;
        actualizarScroll();
      }
    });

    derecha.addEventListener("click", () => {
      if (scrollIndex < librosFiltrados.length - 5) {
        scrollIndex += scrollStep;
        actualizarScroll();
      }
    });

    function actualizarScroll() {
      const card = carrusel.querySelector(".carrusel-item");
      const cardWidth = card.offsetWidth + 16; // Ajusta si tienes `gap` o `margin`
      carrusel.scrollTo({
        left: scrollIndex * cardWidth,
        behavior: "smooth"
      });
    }
  } catch (error) {
    console.error("❌ Error cargando libros relacionados:", error);
  }
}