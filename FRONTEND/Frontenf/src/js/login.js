document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let usuario = document.getElementById("username").value.trim();    // ✅ coincide con id="username"
    let contraseña = document.getElementById("password").value.trim(); // ✅ coincide con id="password"

    if (usuario === "" || contraseña === "") {
      alert("Por favor, complete todos los campos.");
      return;
    }

    if (contraseña.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

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
        if (!response.ok) {
          throw new Error("Correo o contraseña inválidos.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Login exitoso:", data);

        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        alert("Inicio de sesión exitoso. Usuario: " + data.user.name);

        // Redirige cuando tengas una página lista
        // window.location.href = "pagina-principal.html";
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error al iniciar sesión: " + error.message);
      });
  });
});
