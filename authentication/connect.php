<?php
 $hostName = "localhost";
 $userName = "root";
 $password = "";
 $dbName = "activitytracker";

 $conn = new mysqli($hostName,$userName,$password,$dbName);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>