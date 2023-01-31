<?php
include("../authentication/connect.php");
session_start();

if(isset($_POST['functionname'])) {

  $functionname = $_POST['functionname'];
  switch ($functionname) {

    case 'submit':

        $task = $_POST['task'];
        $tasksetdate = date("Y-m-d");
        $taskenddate = $_POST['enddate'];

        $insertquery = "INSERT INTO `tasks`(`taskname`, `taskstatus`, `tasksetdate`, `taskenddate`) VALUES ('$task','due','$tasksetdate','$taskenddate')";

        if (mysqli_query($conn, $insertquery)) {
            echo "Values Stored In Database";
        } else {
            echo mysqli_error($conn);
        }
    break;

    case 'complete':

        $taskid = $_POST['taskid'];
        $taskcompdate = date("Y-m-d");

        $compquery = "UPDATE `tasks` SET `taskstatus`='completed',`taskcompdate`='$taskcompdate' WHERE id=$taskid";

        if (mysqli_query($conn, $compquery)) {
            echo "Task Updated as Completed";
        } else {
            echo mysqli_error($conn);
        }
        
    break;

    case 'due':

        $taskid = $_POST['taskid'];
        $taskcompdate = 0000-00-00;

        $compquery = "UPDATE `tasks` SET `taskstatus`='due',`taskcompdate`='$taskcompdate' WHERE id=$taskid";

        if (mysqli_query($conn, $compquery)) {
            echo "Task Updated as Completed";
        } else {
            echo mysqli_error($conn);
        }
    break;

    case 'edit':

        $taskid = $_POST['taskid'];
        $newtask = $_POST['taskname'];

        $checkquery = "SELECT `taskname` FROM `tasks` WHERE id=$taskid";
        $result = mysqli_query($conn, $checkquery);

        $row = mysqli_fetch_assoc($result);
        $oldtask = $row['taskname'];

        if (strcmp($newtask, $oldtask) !== 0) {

           $editquery = "UPDATE `tasks` SET `taskname`='$newtask' WHERE id=$taskid";

           if (mysqli_query($conn, $editquery)) {
                echo "TaskName Updated";
            } else {
                echo mysqli_error($conn);
            }
        }
    break;

    case 'delete':

        $taskid = $_POST['taskid'];

        $delquery = "DELETE FROM `tasks` WHERE id=$taskid";

        if (mysqli_query($conn, $delquery)) {
            echo "Task Deleted";
        } else {
            echo mysqli_error($conn);
        }
    break;

    case 'clear':

        $clearquery = "DELETE FROM `tasks` WHERE `taskstatus`='completed'";

        if (mysqli_query($conn, $clearquery)) {
            echo "Cleared Completed Tasks";
        } else {
            echo mysqli_error($conn);
        }
    break;


    case 'filter':
        $_SESSION["filter"] = $_POST['filter'];
    break;

    case 'order':
        $_SESSION["order"] = $_POST['order'];

    break;

    case 'sort':
        $_SESSION["sort"] = $_POST['sort'];
    break;

    default:
        echo "No Functions Found";
    break;
}


}



?>
