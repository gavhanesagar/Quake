<?php
session_start();
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $country = $_POST["countryName"];
    $filename = $_FILES["csvFile"]["name"];
    $tempname = $_FILES["csvFile"]["tmp_name"];

    $uploadDir = "../data" . "/" . $_SESSION["UserID"] . "/" . $country . "/input";
    $uploadFile = $uploadDir . "/" . $filename;
    

    if (file_exists($uploadFile)) {
        $resp = ["error" => true, "message" => "File already exists"];
        echo json_encode($resp);
    } else {
        $res = move_uploaded_file($tempname, $uploadFile) ? 1 : 0;
        if ($res === 1) {
            $resp = ["error" => false, "message" => "File uploaded successfully"];
            echo json_encode($resp);
        } else {
            $resp = ["error" => true, "message" => "File cannot be uploaded"];
            echo json_encode($resp);
        }
    }
}
