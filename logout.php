<?php

    session_start();
    // Remove session variables UserID and Phone and direct back to index page
    unset($_SESSION["UserID"]);
    unset($_SESSION["UserName"]);

    session_destroy();
    header("Location: index.php");
?>