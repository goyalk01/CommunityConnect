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

// Parse body
$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid JSON payload.']);
    exit;
}

// Validate required fields
$required = ['name', 'email'];
foreach ($required as $field) {
    if (empty(trim($data[$field] ?? ''))) {
        http_response_code(422);
        echo json_encode(['success' => false, 'message' => "Field '{$field}' is required."]);
        exit;
    }
}

// Sanitize
$name             = htmlspecialchars(trim($data['name']));
$email            = filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL);
$phone            = htmlspecialchars(trim($data['phone'] ?? ''));
$skills           = htmlspecialchars(trim($data['skills'] ?? ''));
$availability     = htmlspecialchars(trim($data['availability'] ?? ''));
$area_of_interest = htmlspecialchars(trim($data['area_of_interest'] ?? ''));

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Invalid email address.']);
    exit;
}

try {
    $db = getDB();

    // Check duplicate email
    $check = $db->prepare('SELECT id FROM volunteers WHERE email = ? LIMIT 1');
    $check->execute([$email]);
    if ($check->fetch()) {
        http_response_code(409);
        echo json_encode(['success' => false, 'message' => 'This email is already registered.']);
        exit;
    }

    $stmt = $db->prepare(
        'INSERT INTO volunteers (name, email, phone, skills, availability, area_of_interest)
         VALUES (?, ?, ?, ?, ?, ?)'
    );
    $stmt->execute([$name, $email, $phone, $skills, $availability, $area_of_interest]);

    $id = $db->lastInsertId();

    http_response_code(201);
    echo json_encode([
        'success' => true,
        'message' => 'Registration successful. Welcome to VolunteerHub!',
        'id'      => (int) $id,
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
