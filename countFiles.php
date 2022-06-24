<?php 
  session_start();

  $userID = $_SESSION["UserID"];
  $country = $_SESSION["country"];
  $portfolio = $_POST['portfolio'];
  $peril = $_POST['peril'];

  
$directory = '/var/www/html/quake/quakeModelManasa/resources/data/UserUploads/'.$userID.'/Results/'.$peril.'/'.$country.'/'.$portfolio.'/'; 
echo '$directory: '.$directory;
$filecount = 0; 
  
$files2 = glob( $directory ."*" ); 
  
if( $files2 ) { 
    $filecount = count($files2); 
} 
  
echo $filecount ; 
  
?> 