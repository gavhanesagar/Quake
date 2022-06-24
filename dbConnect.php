<?php
function OpenCon()
{
    $dbhost = "3.14.103.172";
    $dbuser = "satyukt";
    $dbpass = "Welcome@123";
    $db = "FLAKE";
    $conn = new mysqli($dbhost, $dbuser, $dbpass, $db) or die("Connect failed: %s\n" . $conn->error);
    return $conn;
}

function CloseCon($conn)
{
    $conn->close();
    return "closed";
}
?>