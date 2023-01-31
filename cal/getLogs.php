<?php
include("../authentication/connect.php");

$date = $_GET['date'];

$sql = "SELECT `eventlogs` FROM calendarevents WHERE `eventdate`='$date'";

$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        echo $row['eventlogs'];
    }
} else {
    echo "No data found";
}

?>