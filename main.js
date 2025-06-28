document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Evita que el formulario se envíe si hay errores

        let usuario = document.getElementById("usuario").value.trim();
        let contraseña = document.getElementById("contraseña").value.trim();

        if (usuario === "" || contraseña === "") {
            alert("Por favor, complete todos los campos.");
            return;
        }

        if (contraseña.length < 6) {
            alert("La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        // Si todo está correcto, se envía el formulario
        this.submit();
    });
});
