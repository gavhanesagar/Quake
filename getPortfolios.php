<?php
if($_SERVER["REQUEST_METHOD"] == "POST")
{    
include "dbConnect.php";
    
    $userID = $_POST["userID"];
    $country = $_POST["country"];
    $conn = OpenCon();
    session_start();
    /*$userID = $_SESSION["UserID"];
    $country = $_SESSION["country"];*/
//    echo '<script>console.log("country Here: '.$country.'");</script>';
    $demo = $_POST["demo"];
    
    $fileName = array();
    $time = array();
    $quakeStatus=array();
    $floodStatus=array();
    
    //echo'UserID: '.$userID."<br/>";
    $sql = "SELECT portfolioName, timeOfUpload, quake, flood FROM portfolioDetails where UserID = '$userID' and Country = '$country'";
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            array_push($fileName,$row["portfolioName"]);
            array_push($time,$row["timeOfUpload"]);
            array_push($quakeStatus,$row["quake"]);
            array_push($floodStatus,$row["flood"]);
        }
    } else {
        echo "0 No data";
    }
    
//    echo'<script>console.log("quake in getPortfolios: "'.$quakeStatus.');</script>';
    
    echo json_encode($fileName);
    echo json_encode($time);
    echo json_encode($quakeStatus);
    echo json_encode($floodStatus);
}
?>
