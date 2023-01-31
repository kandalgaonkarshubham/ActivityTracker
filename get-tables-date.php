<?php
include("authentication/connect.php");
session_start();

$count = 0;
$limit = $_POST["customRange"];
$date = $_POST["customDate"];
$sql = "SELECT * FROM calendarevents WHERE `eventdate` < '$date' ORDER BY id DESC LIMIT $limit";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {

    while ($row = mysqli_fetch_assoc($result)) {
        $count += 1;
        echo "<div class=\"input-group mb-3\">
            <input type=\"text\" aria-label=\"First name\" class=\"form-control tabl\" id=\"date.$count\" value=\"$row[eventdate]\">
            <input type=\"text\" aria-label=\"First name\" class=\"form-control tabl\" id=\"time.$count\" value=\"$row[eventname]\">
            <span class=\"input-group-text kwh tabl\" id=\"value.$count\">VALUE</span>
            </div>";
    }
} else {
    echo "<h4 class=\"text-center\">0 RESULTS</h4>";
}
?>