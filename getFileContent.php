<?php
    session_start();
    if ($_SERVER["REQUEST_METHOD"] == "POST")
    {
        $filename = $_POST["fileName"];
        $country = $_POST["countryName"];
        $filepath = "/var/www/html/Quake_2022/quake_model/data" . "/" . $_SESSION["UserID"] . "/" . $country . "/input" . "/" . $filename;
//        $filepath = "/var/www/html/quake/quakeModelManasa/resources/data/UserUploads/" . $_SESSION["UserID"] . "/UserUpload/" . $country . "/Portfolio/" .$filename;
        $filecontent = file_get_contents($filepath);
//        echo '<script>console.log("$filecontent: "'.$filecontent.');</script>';
        echo rtrim($filecontent, "\n");
    }
?>