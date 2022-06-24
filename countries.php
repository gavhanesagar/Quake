<?php
// Endpoint to return all the subscribed countries list
session_start();
$dir = "/var/www/html/Quake_2022/quake_model/data/" . $_SESSION['UserID'] . "/";

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $scanned_directory = scandir($dir);

    // remove linux dots ., ..
    array_shift($scanned_directory);
    array_shift($scanned_directory);

    echo (json_encode($scanned_directory));
}