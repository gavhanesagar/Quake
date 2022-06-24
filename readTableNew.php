<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" )
{
    include "dbConnect.php";

    // Create connection
    $conn = OpenCon();
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    session_start();
    $userID = $_SESSION["UserID"];
    $country = $_SESSION["country"];
    /*echo '<script>console.log("country: '.$country.'");</script>';*/
    $demo = $_POST["demo"];
    
    $fileName = array();
    $time = array();
    
//    echo'UserID: '.$userID."<br/>";
    
    $sql = "SELECT fileName, timeOfUpload FROM UserUploads where UserID = '$userID' AND Country = '$country'";
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            array_push($fileName, $row["fileName"]);
            array_push($time, $row["timeOfUpload"]);
        }
    } else {
        echo "0 No Data";
    }
    
    echo json_encode($fileName);
    echo json_encode($time);
}   /*$conn->close();*/
?>