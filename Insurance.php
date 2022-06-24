<?php
    include 'dbConnect.php';
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    session_start(); 
    $country = $_POST["countryName"];
    $userID = $_SESSION["UserID"];
    $conn = OpenCon();
// Check connection
if ($conn->connect_error) {
die("Connection failed: " . $conn->connect_error);
}
$sql = "SELECT deductible_layer1, max_limit_layer1, deductible_layer2, max_limit_layer2, deductible_layer3, max_limit_layer3, deductible_layer4, max_limit_layer4, programName, UserID, country, timeOfUpload, currency FROM reinsurance where UserID = '$userID' AND Country = '$country'";
$result = $conn->query($sql);
$responsehtml= [];
if ($result->num_rows > 0) {
// output data of each row
while($row = $result->fetch_assoc()) {
array_push($responsehtml,[$row["programName"],$row["deductible_layer1"],$row["max_limit_layer1"],$row["deductible_layer2"],$row["max_limit_layer2"] ,$row["deductible_layer3"],$row["max_limit_layer3"],$row["deductible_layer4"] ,$row["max_limit_layer4"],$row["max_limit_layer4"], $row["country"],$row["UserID"],$row["timeOfUpload"]]);
}

} 
$conn->close();
echo json_encode($responsehtml);
    }
