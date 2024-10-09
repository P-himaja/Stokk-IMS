<?php
$host = 'localhost'; // Your host
$user = 'root'; // Your MySQL username
$password = 'Wafiya123'; // Your MySQL password
$database = 'product'; // Your database name

$conn = new mysqli($host, $user, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
