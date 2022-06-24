<?php
session_start();
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $country = $_POST["countryName"];
    $filename = $_FILES["csvFile"]["name"];
    $tempname = $_FILES["csvFile"]["tmp_name"];

    $uploadDir = "../data" . "/" . $_SESSION["UserID"] . "/" . $country . "/portfolio";
    $uploadFile = $uploadDir . "/" . $filename;
    // Directory permissions
    // chmod($uploadDir, 0775);
    // echo substr(sprintf('%o', fileperms($uploadDir)), -4);

    // Check if directory is present or not
    // if(is_dir($uploadDir)){
    //     echo "exists";
    // }
    // else{
    //     echo "does not exist";
    // }

    if (file_exists($uploadFile)) {
        $resp = ["error" => true, "message" => "File already exists"];
        echo json_encode($resp);
    } else {
        $res = move_uploaded_file($tempname, $uploadFile) ? 1 : 0;
        if ($res === 1) {
            $resp = ["error" => false, "message" => "File saved successfully"];
            echo json_encode($resp);
        } else {
            $resp = ["error" => true, "message" => "File cannot be saved"];
            echo json_encode($resp);
        }
    }
}
