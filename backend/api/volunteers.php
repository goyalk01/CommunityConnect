<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

require_once __DIR__ . '/../config/db.php';

try {
    $db = getDB();

    // Optional filters
    $skill  = $_GET['skill'] ?? '';
    $area   = $_GET['area'] ?? '';
    $page   = max(1, (int) ($_GET['page'] ?? 1));
    $limit  = min(100, max(1, (int) ($_GET['limit'] ?? 50)));
    $offset = ($page - 1) * $limit;

    $where  = [];
    $params = [];

    if ($skill) {
        $where[]  = 'FIND_IN_SET(?, skills) > 0';
        $params[] = $skill;
    }
    if ($area) {
        $where[]  = 'area_of_interest = ?';
        $params[] = $area;
    }

    $whereClause = $where ? 'WHERE ' . implode(' AND ', $where) : '';

    // Total count
    $countStmt = $db->prepare("SELECT COUNT(*) FROM volunteers {$whereClause}");
    $countStmt->execute($params);
    $total = (int) $countStmt->fetchColumn();

    // Fetch rows
    $params[] = $limit;
    $params[] = $offset;
    $stmt     = $db->prepare(
        "SELECT id, name, email, phone, skills, availability, area_of_interest, created_at
         FROM volunteers {$whereClause}
         ORDER BY created_at DESC
         LIMIT ? OFFSET ?"
    );
    $stmt->execute($params);
    $volunteers = $stmt->fetchAll();

    echo json_encode([
        'success'    => true,
        'total'      => $total,
        'page'       => $page,
        'limit'      => $limit,
        'volunteers' => $volunteers,
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
