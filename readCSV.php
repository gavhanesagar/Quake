<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" )
{
    echo '<script>console.log("In readCSV");</script>';
    
//    include 'dbConnect.php';
    
    $servername = "localhost";
    $username = "VATI_database";
    $password = "database_VATI";
    $dbname = "FLAKE";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    
//    $conn = OpenCon();
    session_start();
    
    $userID = $_SESSION["UserID"];
    $country = $_SESSION["country"];
    
    echo ' In read CSV';
    
    $countfiles = count($_FILES['fileToUpload']['name']);
    
    // Looping all files
    for($i=0;$i<$countfiles;$i++){
        $csvFile = $_FILES["fileToUpload"]["name"][$i];
        
        $mydate=getdate(date("U"));
        /*$date = "$mydate[mday]-$mydate[mon]-$mydate[year], $mydate[hours]:$mydate[minutes]:$mydate[seconds]";*/
        $date = "$mydate[mday]-$mydate[mon]-$mydate[year]";
        
        $csvFile = str_replace(' ', '_', $csvFile);
        $fileName = str_replace('.csv','',$csvFile);
        
        /* $date = new DateTime();
        echo '<br><br>Time Date:'.$date->getTimestamp();
        echo'<br><br>:'.date("YmdHis",time());
        
        $csvFile = $userID.'_'.$csvFile.'_'.date("YmdHis",time());
        echo'<br>$csv: '.$csvFile;*/
        
        uploadTab($conn, $userID, $fileName, $date, $country);
        $t = uploadFolder($userID, $csvFile, $i, $country);
//        echo 't: '.$t;
    }
    if($t == 1)
    {
        header("Location: user.php");
    }
    else
        echo'<script>console.log(" File not uploaded!");<script>';
}

function uploadTab($conn, $userID, $csvFile, $date, $country)
{
    $sql = "INSERT INTO `UserUploads` ( `UserID`,`fileName`, `Country`, `timeOfUpload`) VALUES ('$userID','$csvFile', '$country', '$date')";
    if (mysqli_query($conn,$sql))
        echo "Table farmLevelDetails created successfully";
    else
        echo'<br><br>Error';
}

function uploadFolder($userID, $csvFile, $i, $country)
{    
    echo'<br>In uploadFolder';
//    $target_dir = "/data/" . $userID . "/" . $country . "/input/";
    $target_dir = "/var/www/html/quake-model-dev/data/" . $userID . "/" . $country . "/input/";
    
//    $target_dir = "resources/data/UserUploads/".$userID."/UserUpload/".$country."/";
    $target_file = $target_dir. $csvFile;
    echo '<br><br>$target_file:: '.$target_file.'<br><br>';
//    echo'<br>$target_file: '.$target_file.'<br>';
    $uploadFlag = (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"][$i], $target_file))?1:0;

    if($uploadFlag == 1)
    {
        $_SESSION['uploadFlag'] = $uploadFlag;
        $_SESSION['fileName'] = $csvFile;
        return 1;
    }
    else
        return 0;
}
?>


    