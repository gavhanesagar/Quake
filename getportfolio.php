<?php
    session_start();
    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        $filename = $_POST["fileName"];
        $country = $_POST["countryName"];

        $filepath = "../data" . "/" . $_SESSION["UserID"] . "/" . $country . "/portfolio" . "/" . $filename;

        $filecontent = file_get_contents($filepath);

        echo rtrim($filecontent, "\n");
    }
