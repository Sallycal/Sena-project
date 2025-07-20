document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const userInfo = localStorage.getItem("userInfo");

  // Si no hay token o datos de usuario, redirigir a login
  if (!token || !userInfo) {
    alert("Debes iniciar sesión para ver esta página.");
    window.location.href = "login.html";
    return;
  }

  const user = JSON.parse(userInfo);

  // Asignar valores a los campos del formulario
  document.getElementById("nombre").value = user.name || "";
  document.getElementById("email").value = user.email || "";
  document.getElementById("usuario").value = user.username || user.email.split('@')[0];
});