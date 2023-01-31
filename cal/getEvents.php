<?php
include("../authentication/connect.php");

// Prepare the query
$sql = "SELECT * FROM calendarevents";

// Execute the query
$result = mysqli_query($conn, $sql);

// Check if the query returned any rows
if (mysqli_num_rows($result) > 0) {
    // Fetch the rows as an associative array
    $rows = mysqli_fetch_all($result, MYSQLI_ASSOC);
} else {
    $rows = array();
}



// Encode the array as a JSON object and return it
echo json_encode($rows);
