<?php
    if($_SERVER["REQUEST_METHOD"] == "POST")
    {
//        echo'In SaveCheck';
//        echo '<script>console.log("This is in saveCheckPortfolio1.php");</script>';
        include "dbConnect.php";

        
        $conn = OpenCon();
        
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        
        session_start();
        $userID = $_POST["userID"];
        $country = $_POST["country"];
        
        $param = $_POST["param"];
        $portfolio = $_POST["portfolio"];
        
        $path = "/var/www/html/quake/quakeModelManasa/resources/data/UserUploads/".$userID."/UserUpload/";
        $mydate=getdate(date("U"));
        
        $date = "$mydate[mday]-$mydate[mon]-$mydate[year]";
        $tableUpdated = updateTable($conn, $portfolio[0], $userID, $country, $date);
        
        $t = runPort($userID, $portfolio[0], $country, $param);
//        echo'<script>consle.log("runPort: "'. $t.');<script>';
        
    }

    function updateTable($conn, $portName,$userID, $country, $date)
    {
        $query = "select count(*) from UserPortfolio where UserID = '$userID' and portfolioName = '$portName' and Country = '$country'";
        $count = mysqli_fetch_array(mysqli_query($conn, $query));
        if($count[0] > "0")
            $updated = 2;
        else
        {
            $date = date("d-m-Y");
            $update = "insert into portfolioDetails (UserID, portfolioName, Country, timeOfUpload, quake, flood, reinsuranceProgram) values ('$userID', '$portName', '$country', '$date', '0', '0', 'NULL');";
            if($conn->query($update) === TRUE)
                $updated = 0;
            else
                $updated = 1;
        }
//        echo'$updated: '.$updated;
        return $updated;
    }

    function runPort($userID, $portfolio, $country, $dataSet)
    {
        
//        echo'<script>console.log("\n In runPort: "'.$dataSet.');</script>';
//        echo'<script>conosle.log("$userID: "+'.$userID.'+"\n$portfolio: "+'.$portfolio.'+"\n$country: "+'.$country.'+"\n $dataSet: "'.$dataSet.');</script>;';
//        echo'<script>console.log("python /var/www/html/quake/quakeModelManasa/resources/data/Src/portfolio.py "'.$userID.'" "'.$country.'" "'.$portfolio.'" "'.$dataSet.'" 2> /var/www/html/quake/quakeModelManasa/resources/data/logFiles/quake.log");</script>';

        /*$t = system("python /var/www/html/quake-beta/resources/data/Src/portfolio.py ".$userID." ".$country." ".$portfolio." ".$dataSet." 2> /home/purva/Documents/logFiles/quake.log");*/
        $t = system("python3 /var/www/html/quake/quakeModelManasa/resources/data/Src/portfolio.py ".$userID." ".$country." ".$portfolio." '".$dataSet."' > /var/www/html/quake/quakeModelManasa/resources/data/logFiles/quake.log 2&>1");
//        echo  '<br> Print t: '+$t;
        /*system("python /var/www/html/quake-beta/resources/data/Src/portfolio.py 2> /home/purva/Documents/logFiles/quake.log");*/
//        echo'<script>console.log("t in runPort: "'.$t.');</script>';
        return $t;
    }
?>
























