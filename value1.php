<?php
include "dbConnect.php";


$deduc1=$_POST['deductible_layer1'];
$max1=$_POST['max_limit_layer1'];
$deduc2=$_POST['deductible_layer2'];
$max2=$_POST['max_limit_layer2'];
$deduc3=$_POST['deductible_layer3'];
$max3=$_POST['max_limit_layer3'];
$deduc4=$_POST['deductible_layer4'];
$max4=$_POST['max_limit_layer4'];
$pname=$_POST['programName'];
$currency=$_POST['currency'];
session_start();
    $userID = $_SESSION["UserID"];
  $country=$_SESSION["country"];
  $con = OpenCon();

$qry = mysqli_query($con,"SELECT * from `reinsurance` WHERE `UserID` = '$userID' and `programName` = '$pname' and `country` = '$country'");
$row = mysqli_num_rows($qry);

if($row>0)
{
	 echo json_encode(["error"=> true, "message"=> "Program name already exists"]);
               
}
else{
$sql = "INSERT INTO reinsurance (deductible_layer1, max_limit_layer1,deductible_layer2,max_limit_layer2,deductible_layer3,max_limit_layer3,deductible_layer4,max_limit_layer4,programName,UserID,country,currency,timeOfUpload)
VALUES ('$deduc1', '$max1', '$deduc2','$max2','$deduc3','$max3','$deduc4','$max4','$pname','$userID','$country','$currency',CURRENT_TIMESTAMP())";

if ($con->query($sql) === TRUE) {
  echo json_encode(["error"=> false, "message"=> "Program created successfully"]);

} else {
  echo json_encode(["error"=> true, "message"=> "Program could not be created"]);

}

$con->close();
}

?>
