<?php
include("authentication/connect.php");
session_start();


if (isset($_POST['submit'])) {

    $date = $_POST['date'];
    $name = $_POST['name'];
    $class = $_POST['class'];
    $color = $_POST['color'];

    $query = "SELECT eventdate FROM calendarevents WHERE eventdate = '$date' ";
    $result = mysqli_query($conn, $query);

    if ($result && mysqli_num_rows($result) > 0) {

        $find = "SELECT eventname FROM calendarevents WHERE eventdate = '$date' ";
        $findresult = mysqli_query($conn, $find);
        $row = mysqli_fetch_assoc($findresult);
        // $oldname = $row['eventname'];
        // $add = $oldname + $name;
        // $final = str_pad($add, 8, '0', STR_PAD_LEFT);

        $updatequery = "UPDATE `calendarevents` SET `eventname`='$name', `eventclass`='$class', `eventcolor`='$color', `eventcount` = eventcount+1 WHERE eventdate = '$date' ";
        mysqli_query($conn, $updatequery);

        header("Location: index.html#updated");
    } else {


        if ($date != '' && $name != '' && $class != '' && $color != '') {

            $query = "INSERT INTO `calendarevents`(`eventdate`, `eventname`, `eventclass`, `eventcolor`,`eventcount`) VALUES ('$date','$name','$class','$color','1')";
            mysqli_query($conn, $query);

            header("Location: index.html#success");
        } else {

            header("Location: index.html#errorempty");
        }
    }
} else {
    header("Location: index.html#error");
}



// $date = $_POST['date'];
// $name = $_POST['name'];
// $name = substr($nm, 1);
// $class = $_POST['class'];
// $color = $_POST['color'];

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="favicon/favicon-16x16.png">
    <link rel="manifest" href="favicon/site.webmanifest">
    <title>Contacting Database</title>
</head>

<body>
    <hr>
    <!-- <div class="">
        <p>date = <?php // echo $date ?></p>
        <p>name = <?php // echo $name ?></p>
        <p>class = <?php // echo $class ?></p>
        <p>color = <?php // echo $color ?></p>
    </div> -->

    <?php // echo $new = implode(":", str_split(strval($row['eventname']), 2)); ?>

</body>

</html>