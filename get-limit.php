<?php
include("authentication/connect.php");
session_start();

// Run the SELECT COUNT(*) query
$sql = "SELECT COUNT(*) FROM calendarevents";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Output the number of rows
    $row = $result->fetch_assoc();
    $numRows = $row["COUNT(*)"];
    echo $numRows;
} else {
    echo 0;
}
?>