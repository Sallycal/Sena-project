document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("registroForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let nombre = document.getElementById("nombre").value.trim();
    let email = document.getElementById("correo").value.trim();
    let contraseña = document.getElementById("contraseña").value.trim();

    if (!nombre || !email || !contraseña) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    if (contraseña.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    // Conexión con API Laravel
    fetch("http://127.0.0.1:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include", // si usas cookies
      body: JSON.stringify({
        name: nombre,
        email: email,
        password: contraseña,
        password_confirmation: contraseña // Laravel aún requiere esto
      }),
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(errorData => {
          // Mostrar errores del backend (por ejemplo, email ya registrado)
          throw new Error(errorData.message || "No se pudo completar el registro.");
        });
      }
      return response.json();
    })
    .then(data => {
      console.log("Registro exitoso:", data);

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      alert("Registro exitoso. Bienvenida, " + data.user.name);
      // Redirigir si quieres:
      // window.location.href = "login.html";
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Ocurrió un error: " + error.message);
    });
  });
});
