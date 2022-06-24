<?php
    if($_SERVER["REQUEST_METHOD"] == "POST")
    {
        session_start();
        $_SESSION["country"]= $_POST["country"];
        echo '<script>console.log("set country: "'.$_SESSION["country"].');</script>';
    }
?>