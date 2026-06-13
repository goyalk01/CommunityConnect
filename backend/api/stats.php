<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require_once __DIR__ . '/../config/db.php';

try {
    $db = getDB();

    // Total Volunteers
    $volunteersStmt = $db->query('SELECT COUNT(*) as count FROM volunteers');
    $volunteersCount = $volunteersStmt->fetch()['count'];

    // Active Programs
    $programsStmt = $db->query('SELECT COUNT(*) as count FROM programs WHERE active = 1');
    $programsCount = $programsStmt->fetch()['count'];

    // Total Contacts
    $contactsStmt = $db->query('SELECT COUNT(*) as count FROM contacts');
    $contactsCount = $contactsStmt->fetch()['count'];

    echo json_encode([
        'success' => true,
        'data' => [
            'total_volunteers' => (int) $volunteersCount,
            'active_programs' => (int) $programsCount,
            'contact_requests' => (int) $contactsCount
        ]
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
