<?php
// define variables and set to empty values
$displayErr = "";
$username = $password = "";

if ($_SERVER["REQUEST_METHOD"] == "POST")
{
    $username = $_POST["username"];
    $password = $_POST["password"];
    
    include 'dbConnect.php';
    
    $conn = OpenCon();
    $UserID_name = checkedUser($conn,$username,$password);
    
    if($UserID_name)
    {
        $username = $password = "";
        session_start();
        $_SESSION["UserID"] = $UserID_name[0];
        $_SESSION["UserName"] = $UserID_name[1];
        $_SESSION["loginFlag"] = 0;
        $_SESSION['uploadFlag'] = 0;
        $_SESSION['fileName'] = "";
        $_SESSION['country'] = "";
        if($UserID_name[0] == 'U69' | $UserID_name[0] == 'U5') // admin can order data for other person
            $_SESSION["AllUser"] = getAllUserIDandFullName($conn);
        CloseCon($conn);
        header("Location: user.php");
    }
    
    else
    {
        session_start();
        $_SESSION["loginFlag"] = 1;
        $_SESSION["noLogin"] = "0";
        CloseCon($conn);
        header("Location: index.php");
    }
}

function checkedUser($conn,$username,$password)
{
    $data = $conn -> query("SELECT * FROM UserCredentials WHERE UserName = '$username' and Password ='$password' ");//UserID
    $result = ($data->num_rows == 1 ? $data->fetch_assoc()['UserID'] : 0);
    if($result)
    {
        $data_approved = $conn -> query("SELECT FullName FROM UserBasicInfo WHERE UserID = '$result' and userApproved=1 ");
        if($data_approved->num_rows == 1)
        {
            $FullName = $data_approved->fetch_assoc()['FullName'];
            $result = array($result,$FullName);
        }
        else $result = 0;
    }
    return $result;
}
?>