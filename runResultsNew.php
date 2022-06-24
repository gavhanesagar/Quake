<?php
    if($_SERVER["REQUEST_METHOD"] == "POST")
    {
        /*include 'dbConnect.php';
        $conn = OpenCon();*/
        
        include "dbConnect.php";

        // Create connection
       $conn = OpenCon();
        session_start();
        
        $port = $_POST["protfolio"];
        $reIn = $_POST["reinsurance"];
        $userID = $_SESSION["UserID"];
        $country = $_SESSION["country"];
        $peril = $_POST["peril"];
        $startTime = time();
        $outCome = 1;
        
//        echo '<script>console.log("In resultsNew"'.$reIn.');';
        
        $status = "QUEUE";
        
        /*$alterQuery = "UPDATE UserPortfolio SET status = '$status', reinsuranceProgram = '$reIn' WHERE UserID = '$userID' AND Country = '$country' AND portfolioName = '$port' AND peril = '$peril';";
        if()*/
        if($peril === 'quake')
            $updateQuery = "UPDATE portfolioDetails SET $peril = 1, reinsuranceProgram = '$reIn' WHERE UserID = '$userID' AND Country = '$country' AND portfolioName = '$port';";
        else
            $updateQuery = "UPDATE portfolioDetails SET $peril = 1 WHERE UserID = '$userID' AND Country = '$country' AND portfolioName = '$port';";
//        echo '<script>console.log("$updateQuery: "'.$peril.');</sctipt>';
        
//        $t = $conn->query($updateQuery);
        
//        echo '<script>console.log("$QueryStatus: "'.($conn->query($updateQuery)).');</sctipt>';
        if($conn->query($updateQuery) === TRUE){
//            CloseCon($conn);    
            echo json_encode(0);
        }else{
            CloseCon($conn);
            echo json_encode(1);
        }
    }
?>