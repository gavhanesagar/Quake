<?php
    include "dbConnect.php";
     
    $conn = OpenCon();

    $a=array();
    session_start();
    $userID = $_SESSION["UserID"];
    $country = $_SESSION["country"];
//     echo '<script>console.log("country Here: '.$country.' \n userID: '.$userID.'");</script>';
    $conn = new mysqli($dbhost, $dbuser, $dbpass,$db) or die("Connect failed: %s\n". $conn -> error);
    $sql = "SELECT programName FROM reinsurance where userID = '$userID' and country = '$country'";
    /*echo'<script>console.log("query: "'.$sql.');</script>';*/
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) 
        {
            array_push($a,$row["programName"]);
        }
        /*echo'<script>console.log("a: "'.$a[0].');</script>';*/
        echo json_encode($a);

    } 
?>