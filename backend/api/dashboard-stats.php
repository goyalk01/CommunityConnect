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

    // 1. Monthly Registrations (Last 6 months)
    $monthlyStmt = $db->query("
        SELECT DATE_FORMAT(created_at, '%b %Y') as name, COUNT(*) as volunteers 
        FROM volunteers 
        GROUP BY DATE_FORMAT(created_at, '%Y-%m'), DATE_FORMAT(created_at, '%b %Y')
        ORDER BY DATE_FORMAT(created_at, '%Y-%m') DESC 
        LIMIT 6
    ");
    $monthlyData = array_reverse($monthlyStmt->fetchAll(PDO::FETCH_ASSOC));

    // If empty (no data yet), provide dummy data for the chart to render nicely
    if (empty($monthlyData)) {
        $monthlyData = [
            ['name' => 'Jan 2026', 'volunteers' => 12],
            ['name' => 'Feb 2026', 'volunteers' => 19],
            ['name' => 'Mar 2026', 'volunteers' => 30],
            ['name' => 'Apr 2026', 'volunteers' => 45],
            ['name' => 'May 2026', 'volunteers' => 60],
            ['name' => 'Jun 2026', 'volunteers' => 85],
        ];
    } else {
        foreach($monthlyData as &$row) {
            $row['volunteers'] = (int)$row['volunteers'];
        }
    }

    // 2. Program Distribution
    $distributionStmt = $db->query("
        SELECT area_of_interest as name, COUNT(*) as value 
        FROM volunteers 
        WHERE area_of_interest IS NOT NULL AND area_of_interest != ''
        GROUP BY area_of_interest
    ");
    $distributionData = $distributionStmt->fetchAll(PDO::FETCH_ASSOC);

    // If empty, provide dummy data
    if (empty($distributionData)) {
        $distributionData = [
            ['name' => 'Education', 'value' => 40],
            ['name' => 'Environment', 'value' => 30],
            ['name' => 'Community Support', 'value' => 30]
        ];
    } else {
        foreach($distributionData as &$row) {
            $row['value'] = (int)$row['value'];
        }
    }

    // 3. Recent Activity Table
    $recentStmt = $db->query("
        SELECT id, name, email, area_of_interest, created_at 
        FROM volunteers 
        ORDER BY created_at DESC 
        LIMIT 50
    ");
    $recentActivity = $recentStmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'success' => true,
        'data' => [
            'monthly_registrations' => $monthlyData,
            'program_distribution' => $distributionData,
            'recent_activity' => $recentActivity
        ]
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
