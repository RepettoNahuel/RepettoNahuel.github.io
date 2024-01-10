<?php
// Obtener los datos enviados desde JavaScript
$datosActualizacionJSON = file_get_contents('php://input');
// Decodificar los datos JSON en un array asociativo
$datosActualizacion = json_decode($datosActualizacionJSON, true); 

// Acceder a los datos
$tarea = $datosActualizacion["tarea"];

// Conectarse a la base de datos MySQL
$servername = "localhost";
$username = "id21717728_lucyrepetto";
$password = "Basquetbol123*";
$dbname = "id21717728_usuarios";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Construir la consulta SQL para eliminar el registro
$sql = "DELETE FROM tareas WHERE tarea = '$tarea'";

// Ejecutar la consulta y verificar si fue exitosa
if ($conn->query($sql) === TRUE) {
    echo "Registro eliminado exitosamente";
} else {
    echo "Error al eliminar el registro: " . $conn->error;
}

// Cerrar la conexión
$conn->close();
?>