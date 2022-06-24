<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" )
{
    $servername = "localhost";
    $username = "VATI_database";
    $password = "database_VATI";
    $dbname = "FLAKE";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        echo'';
        die("Connection failed: " . $conn->connect_error);
    }
    session_start();
    $userID = $_POST["UserID"];
    $country = $_POST["country"];
    
    $quake = "";
    $flood = "";
    $peril = array();
    
    $sql = "SELECT * FROM availblePerils WHERE Country = '$country'";
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {            
            $quake = $row["quake"];
            $flood = $row["flood"];
        }
    } else {
        echo "0 No Data";
    }
    echo json_encode($quake);
    echo json_encode($flood);
    
}
?>