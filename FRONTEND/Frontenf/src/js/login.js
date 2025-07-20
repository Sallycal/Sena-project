document.addEventListener("DOMContentLoaded", function () {
  console.log("Documento cargado");

  const form = document.getElementById("loginForm");

  if (!form) {
    console.error("Formulario no encontrado. ¿Está seguro de que el ID es 'loginForm'?");
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("Formulario enviado");

    let usuario = document.getElementById("username").value.trim();
    let contraseña = document.getElementById("password").value.trim();

    if (usuario === "" || contraseña === "") {
      alert("Por favor, complete todos los campos.");
      return;
    }

    if (contraseña.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    console.log("Enviando solicitud con:", { usuario, contraseña });

    fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: usuario,
        password: contraseña,
      }),
    })
      .then((response) => {
        console.log("Respuesta del backend:", response.status);
        if (!response.ok) {
          throw new Error("Correo o contraseña inválidos.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Respuesta parseada:", data);

        if (data.token) {
          localStorage.setItem("token", data.token);
          console.log("Token guardado en localStorage");
        } else {
          console.warn("No se recibió token");
        }

        if (data.user) {
          localStorage.setItem("userInfo", JSON.stringify(data.user));
          console.log("Datos de usuario guardados");
        } else {
          console.warn("No se recibió información del usuario");
        }

        // alert("Inicio de sesión exitoso. Usuario: " + data.user.name);

        window.location.href = "book-list.html";
        
        // window.location.href = "pagina-principal.html";
      })
      .catch((error) => {
        console.error("Error en login:", error);
        alert("Error al iniciar sesión: " + error.message);
      });
  });
});