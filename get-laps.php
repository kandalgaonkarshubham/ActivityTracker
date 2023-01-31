<?php
include("authentication/connect.php");
session_start();

$count = 0;
$date = $_GET["date"];
// $date = "2023-01-19";

$sql = "SELECT `eventlogs` FROM calendarevents WHERE `eventdate` = '$date'";
$result = mysqli_query($conn, $sql);


if ($result) {
    $count = 0;
    while ($row = mysqli_fetch_assoc($result)) {
        $logs = json_decode($row['eventlogs'], true);
        if ($logs != null) {
            foreach ($logs as $log) {
                foreach ($log as $log_item) {
                    $start = new DateTime($log_item['tstart']);
                    $end = new DateTime($log_item['tend']);
                    $interval = $start->diff($end);
                    $count += 1;
                    echo "<div class=\"lap\">
                            <span class=\"result\">$count&nbsp;-</span>
                            <span class=\"hour\" id=\"lhour\">" . $interval->format("%H") . "</span>
                            <span class=\"colon\">:</span>
                            <span class=\"minute\" id=\"lminute\">" . $interval->format("%I") . "</span>
                            <span class=\"colon\">:</span>
                            <span class=\"second\" id=\"lsecond\">" . $interval->format("%S") . "</span>
                        </div>";
                }
            }
        }
    }
} else {
    echo "";
}

?>
