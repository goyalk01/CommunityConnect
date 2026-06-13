<?php
require_once 'config/db.php';

try {
    $db = getDB();
    $sql = file_get_contents('schema.sql');
    $db->exec($sql);
    echo "Schema executed successfully. Tables created!";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
