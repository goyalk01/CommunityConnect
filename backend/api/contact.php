<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

require_once __DIR__ . '/../config/db.php';

$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid JSON payload.']);
    exit;
}

// Validate
foreach (['name', 'email', 'message'] as $field) {
    if (empty(trim($data[$field] ?? ''))) {
        http_response_code(422);
        echo json_encode(['success' => false, 'message' => "Field '{$field}' is required."]);
        exit;
    }
}

$name    = htmlspecialchars(trim($data['name']));
$email   = filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL);
$message = htmlspecialchars(trim($data['message']));

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Invalid email address.']);
    exit;
}

// Basic spam guard: message min length
if (mb_strlen($message) < 10) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Message is too short (minimum 10 characters).']);
    exit;
}

try {
    $db   = getDB();
    $stmt = $db->prepare('INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)');
    $stmt->execute([$name, $email, $message]);

    $id = $db->lastInsertId();

    http_response_code(201);
    echo json_encode([
        'success' => true,
        'message' => 'Message received. We will get back to you within 24 hours.',
        'id'      => (int) $id,
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
