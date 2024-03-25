<?php
// Obtener los datos enviados desde JavaScript
$datosActualizacionJSON = file_get_contents('php://input');
// Decodificar los datos JSON en un array asociativo
$datosActualizacion = json_decode($datosActualizacionJSON, true); 

// Acceder a los datos
$tarea = $datosActualizacion["tarea"];
$estado = $datosActualizacion["estado"];

// Conectarse a la base de datos MySQL
$servername = "bsyz3ocq9wfhtgylxvtb-mysql.services.clever-cloud.com";
$username = "uuuboh4wjo78fckn";
$password = "0Th09VoGUCE797w4gefL";
$dbname = "bsyz3ocq9wfhtgylxvtb";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}


// Actualizar el campo en la base de datos
$sql = "UPDATE tareas SET estado='$estado' WHERE tarea='$tarea'";

if ($conn->query($sql) === TRUE) {
    echo "Estado actualizado correctamente.";
} else {
    echo "Error al actualizar el estado: " . $conn->error;
}

// Cerrar conexión
$conn->close();
?>