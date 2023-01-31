<?php
include("authentication/connect.php");
session_start();


$todaydate = date("Y-m-d");
$query = "SELECT eventdate FROM calendarevents WHERE eventdate = '$todaydate' ";
$result = mysqli_query($conn, $query);

if ($result && mysqli_num_rows($result) > 0) {

    $find = "SELECT eventname FROM calendarevents WHERE eventdate = '$todaydate' ";
    $findresult = mysqli_query($conn, $find);
    $row = mysqli_fetch_assoc($findresult);
    $databasetime = $row['eventname'];
    echo $databasetime;
}else{
    echo 0;
}

?>