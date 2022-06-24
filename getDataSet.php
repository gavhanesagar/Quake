<?php
session_start();
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $country = $_POST["countryName"];
    $user = $_SESSION["UserID"];

    $searchDir = "/var/www/html/Quake_2022/quake_model/data/" . "/" . $user . "/" . $country . "/input";
//    $searchDir = "/var/www/html/quake/quakeModelManasa/resources/data/UserUploads/" . $_SESSION["UserID"] . "/UserUpload/" . $country . "/Portfolio/";

    if (!is_dir($searchDir)) { 
        $resp = ["error" => true, "message" => "Folder not found"];
        echo $resp;
    }

    $files = array();
    foreach (scandir($searchDir) as $file) {
        if ($file !== '.' && $file !== '..') {
            array_push($files, [$file, date('d-m-Y', filemtime($searchDir . "/" . $file))]);
        }
    }
    
    
    
    
    
    
    
    echo json_encode($files);
}