document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("registroForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Evita que el formulario se envíe si hay errores

        let nombre = document.getElementById("nombre").value.trim();
        let email = document.getElementById("correo").value.trim();
        let confirmarEmail = document.getElementById("confirmarCorreo").value.trim();
        let contraseña = document.getElementById("contraseña").value.trim();
        let confirmarContraseña = document.getElementById("confirmarContraseña").value.trim();

        if (nombre === "" || email === "" || confirmarEmail === "" || contraseña === "" || confirmarContraseña === "") {
            alert("Por favor, complete todos los campos.");
            return;
        }

        if (contraseña.length < 6) {
            alert("La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        if (email !== confirmarEmail) {
            alert("Los correos electrónicos no coinciden.");
            return;
        }

        if (contraseña !== confirmarContraseña) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        // Si todo está correcto, se envía el formulario
        alert("Registro exitoso. ¡Bienvenido a ConectaLibros!");
        this.submit();
    });
}); 