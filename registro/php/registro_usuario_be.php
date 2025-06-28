<?php

    include 'conexion_be.php' ;

    $nombre_completo = $_POST['nombre_completo'];
    $correo = $_POST['correo'];
    $confirmar_correo = $_POST['confirmar_correo'];
    $contraseña = $_POST['contraseña'];
    $confirmar_contraseña = $_POST['confirmar_contraseña'];

    $query = "INSERT INTO usuarios(nombre_completo, correo, confirmar_correo, contraseña, confirmar_contraseña)
         VALUES('$nombre_completo', '$correo', '$confirmar_correo', '$contraseña', '$confirmar_contraseña' "

    $ejecutar = mysqli_query($conexion, $query);

    if($ejecutar) {
        echo '
            <script>
                alert("usuario almacenamiento exitosamente");
                window.location = "../main.jsx";
            </script> 
        ';

    }else{
        echo '
             <script>
                alert("intetalo de nuevo, usuario no almacenado");
                window.location = "../main.jsx";
            </script>
        '
    
    }
?>