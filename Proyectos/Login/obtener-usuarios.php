<?php
// Conectarse a la base de datos MySQL
$servername = "bsyz3ocq9wfhtgylxvtb-mysql.services.clever-cloud.com";
$username = "uuuboh4wjo78fckn";
$password = "0Th09VoGUCE797w4gefL";
$dbname = "bsyz3ocq9wfhtgylxvtb";

// Crear la conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
  die("Conexión fallida: " . $conn->connect_error);
}

// Consulta SQL para obtener los datos de la tabla "tareas"
$sql = "SELECT * FROM usuarios";
$result = $conn->query($sql);

// Convertir los resultados en un array asociativo
$rows = array();
if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    $rows[] = $row;
  }
}

// Devolver los resultados en formato JSON
header('Content-Type: application/json');
echo json_encode($rows);

// Cerrar la conexión
$conn->close();
?>