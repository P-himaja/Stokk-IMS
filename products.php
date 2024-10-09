<?php
header('Content-Type: application/json');
include 'db.php';

// Fetch products
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $conn->query("SELECT * FROM products");
    $products = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($products);
}

// Add a product
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $name = $data['name'];
    $description = $data['description'];

    $stmt = $conn->prepare("INSERT INTO products (name, description, completed) VALUES (?, ?, ?)");
    $completed = false; // Set to false by default
    $stmt->bind_param("ssi", $name, $description, $completed);
    $stmt->execute();
    
    echo json_encode(['id' => $stmt->insert_id, 'name' => $name, 'description' => $description]);
}

// Update a product
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $_GET['id'];
    $name = $data['name'];
    $description = $data['description'];
    $completed = $data['completed'];

    $stmt = $conn->prepare("UPDATE products SET name = ?, description = ?, completed = ? WHERE id = ?");
    $stmt->bind_param("ssii", $name, $description, $completed, $id);
    $stmt->execute();
    
    echo json_encode(['id' => $id, 'name' => $name, 'description' => $description, 'completed' => $completed]);
}

// Delete a product
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $id = $_GET['id'];
    $stmt = $conn->prepare("DELETE FROM products WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    
    echo json_encode(['message' => 'Product deleted']);
}

$conn->close();
?>