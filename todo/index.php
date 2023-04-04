<?php
require("../authentication/connect.php");
// error_reporting(E_ALL ^ E_NOTICE);
session_start();

if (!isset($_SESSION["filter"])) {
    $_SESSION["filter"] = 'due';
}
if (!isset($_SESSION["order"])) {
    $_SESSION["order"] = 'ASC';
}
if (!isset($_SESSION["sort"])) {
    $_SESSION["sort"] = 'tasksetdate';
}


$sql = "SELECT * FROM `tasks` WHERE `taskstatus`='{$_SESSION["filter"]}' ORDER BY {$_SESSION["sort"]} {$_SESSION["order"]}";
$sortresult = mysqli_query($conn, $sql);

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Taskify</title>

    <link rel="stylesheet" href="todo.css">
    <link rel="stylesheet" href="../bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="../bootstrap/css/bootstrap-icons.css">
    <link rel="stylesheet" href="../bootstrap/css/bootstrap-datepicker.min.css">
    
    <link rel="stylesheet" href="../css/mode.css">
    <link rel="stylesheet" href="../css/dark-mode.css">
    <link rel="stylesheet" href="../css/preloader.css">
    
    <link rel="apple-touch-icon" sizes="180x180" href="../favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="../favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="../favicon/favicon-16x16.png">
    <link rel="manifest" href="../favicon/site.webmanifest">
    
    <script src="../bootstrap/fontawesome-kit.js"></script>


</head>
<body id="stop-scrolling">

<div id="preloader">
    <div class="loader"></div>
</div>
        <header>
            <nav id="navbar" class="navbar navbar-expand-lg bg-light navbar-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#"><i>ActivityTracker</i></a>
                    <label for="burger" class="burger navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onchange="changeClass()" >
                    <input id="burger" type="checkbox">
                    <span></span>
                    <span></span>
                    <span></span>
                    </label>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link" aria-current="page" href="../index.html">Stopwatch</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="../cal/index.php">Calendar</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="../calc.html">Calculator</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active" href="#">Taskify</a>
                            </li>
                        </ul>
    
                        <label class="switch">
                            <input id="darkSwitch" type="checkbox" onclick="darkLight()">
                            <span class="slider" onclick="darkLight()"></span>
                        </label>
    
                    </div>
                </div>
            </nav>
    
        </header>
    
<main>

<div id="noti"></div>

    <div class="container-fluid m-5 p-2 rounded mx-auto bg-light shadow">

    <!-- APP TITLE -->

        <div class="row m-1 p-4">
            <div class="col">
                <div class="p-1 h1 text-Custom text-center mx-auto display-inline-block">
                    <i class="fa-solid fa-bars-staggered todoLogo rounded p-2"></i>
                    <b>Taskify</b>
                </div>
            </div>
        </div>

        
    <!-- CREATE TODO SECTION -->

        <div class="row m-1 p-3">
            <div class="col col-11 mx-auto">
                <div class="row bg-white rounded shadow-sm p-2 add-todo-wrapper align-items-center justify-content-center">
                    <div class="col">
                        <input id="task" name="task" class="form-control form-control-lg border-0 add-todo-input bg-transparent rounded" type="text" placeholder="Add new ...">
                    </div>
                    <div class="col-auto m-0 px-2 d-flex align-items-center">
                         <label class="text-secondary my-2 p-0 px-1 view-opt-label due-date-label d-none">Due date not set</label>
                        <i class="fa fa-calendar my-2 px-1 text-Custom btn due-date-button" data-toggle="tooltip" data-placement="bottom" title="Set a Due date"></i>
                    </div>
                    <div class="col-auto px-0 mx-0 mr-2">
                        <button type="submit" name="submit" class="btn btn-custom" onclick="submitForm(); return false;">Add</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="p-2 mx-4 border-black-25 border-bottom"></div>

        <!-- VIEW OPTION SECTION -->

        <div class="row m-1 p-3 px-5 justify-content-end">
            <div class="labelContainerParent d-none col-2 d-flex align-items-center justify-content-end">
                <label class="text-secondary pr-2 mx-4 view-opt-label">Actions</label>
                <label title="Enable Changes" class="labelContainer">
                <input id="checkEdit" type="checkbox">
                <div class="checkmark"></div>
                </label>
                <i title="Clear Completed" class="fa-solid fa-trash" onclick="clearComp()"></i>
            </div>
            <div class="col-lg-auto col-auto d-flex align-items-center">
                <label class="text-secondary my-2 pr-2 view-opt-label">Filter</label>
                <select id="taskStatus" class="form-select-sm btn my-2">
                    <!-- <option value="all" selected>All</option> -->
                    <option value="due" selected>Has Due Date</option>
                    <option value="completed">Completed</option>
                    <!-- <option value="active">Active</option> -->
                </select>
            </div>
            <div class="col-lg-auto col-auto d-flex align-items-center px-1 pr-3">
                <label class="text-secondary my-2 pr-2 view-opt-label">Sort</label>
                <select id="taskDate" class="form-select-sm btn my-2">
                    <option value="tasksetdate" selected>Added date</option>
                    <option value="taskenddate">Due date</option>
                </select>
                <i id="orderBtn" class="fa fa fa-sort-amount-asc btn mx-0 px-0 pl-1" onclick="sortOrder()"></i>
            </div>
        </div>

                <!--/ Todo list section -->

        <div class="row mx-1 pb-3 w-80">

            <div id="phpElements" class="col mx-auto">

                <?php
                if (mysqli_num_rows($sortresult) > 0) {
                    while($row = mysqli_fetch_assoc($sortresult)) {
                ?> 
                <div class="phpElementsRow rounded row p-4 m-4">

                    <div class="badgeHolder d-none">
                        <span data-id="badge<?php echo $row['id'] ?>" class="badge position-absolute">
                            <i class="fa fa-hourglass-2"></i><?php echo date("d M Y", strtotime($row['taskenddate'])); ?>
                        </span>
                    </div>

                    <div class="col-lg-1 col-1 p-0 d-flex align-items-center justify-content-center">
                        <label id="complete" class="checkboxLabel" data-toggle="tooltip" data-placement="bottom" title="Mark as complete">
                            <input data-id="id<?php echo $row['id'] ?>" class="checkboxInput" type="checkbox">
                            <span class="checkboxSpan"></span>
                        </label>
                    </div>

                    <div class="col px-0 m-0 d-flex align-items-center justify-content-start ">
                        <p data-id="task<?php echo $row['id'] ?>" class="form-control form-control-md border-0 edit-todo-input bg-transparent rounded px-3"><?php echo $row['taskname'] ?></p>
                    </div>

                    
                    <div style="transform: translateY(-5px)" class="col-lg-2 col-auto d-flex align-items-center justify-content-lg-end justify-content-center">

                        <button id="actionsMenu" class="customButton">
                            <div class="icon">
                                <i class="fa-solid fa-sliders shere"></i>

                                <i data-id="edit<?php echo $row['id'] ?>" class="fa-solid fa-pen-to-square text-info btn mx-2 p-0 icon-shere" data-toggle="tooltip" data-placement="bottom" title="Edit todo"></i>
                                <i data-id="delete<?php echo $row['id'] ?>" class="fa-solid fa-trash text-danger btn mx-2 p-0 icon-shere" data-toggle="tooltip" data-placement="bottom" title="Delete todo"></i>
                                <i data-id="due<?php echo $row['id'] ?>" class="fa-solid fa-circle-question text-black-50 btn mx-2 p-0 icon-shere" data-toggle="tooltip" data-placement="bottom" title="Due date <?php echo $row['taskenddate'] ?>" data-value="<?php echo $row['taskenddate'] ?>"></i>

                                <i data-id="push<?php echo $row['id'] ?>" class="d-none fa-solid fa-arrow-up-right-dots text-warning btn mx-2 p-0 icon-shere" data-toggle="tooltip" data-placement="bottom" title="Push Date"></i>
                            </div>
                            <p class="my-1">Options</p>
                        </button>

                        <button id="infoMenu" class="customButton d-none">
                            <div class="icon">
                                <i class="fa-solid fa-receipt shere"></i>

                                <i class="fa-solid fa-calendar-plus text-warning btn mx-2 p-0 icon-shere" data-toggle="tooltip" data-placement="bottom" title="Task was Created on <?php echo $row['tasksetdate'] ?>"></i>
                                <i class="fa-solid fa-calendar-week text-warning btn mx-2 p-0 icon-shere" data-toggle="tooltip" data-placement="bottom" title="Task Due Date was <?php echo $row['taskenddate'] ?>"></i>
                                <i class="fa-solid fa-calendar-check text-warning btn mx-2 p-0 icon-shere" data-toggle="tooltip" data-placement="bottom" title="Task was Completed on <?php echo $row['taskcompdate'] ?>"></i>
                            </div>
                            <p class="my-1">Info</p>
                        </button>

                        <button data-id="cMenu<?php echo $row['id'] ?>" id="confirmMenu" class="cssbuttons-io-button d-none"> Save
                            <div class="saveIcon">
                                <i data-id="save<?php echo $row['id'] ?>" class="fa-solid fa-floppy-disk" data-toggle="tooltip" data-placement="bottom" title="Save Changes"></i>
                            </div>
                        </button>

                        
                        <button data-id="delMenu<?php echo $row['id'] ?>" class="noselect d-none">
                            <span class="text">Delete</span>
                            <span class="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                                </svg>
                            </span>
                        </button>

                    </div>

                </div>
                <?php
                }
                }
                ?>

   
            </div>
        </div>

                
    </div>
</main>
    
        <footer></footer>

        <script src="../bootstrap/js/bootstrap.bundle.js"></script>
        <script src="../bootstrap/jquery-3.6.1.min.js"></script>
        <script src="../js/dark-mode-switch.js"></script>
        <script src="../js/preloader.js"></script>
        <script src='../bootstrap/js/bootstrap-datepicker.min.js'></script>

        <script>
            const phpFilter = "<?php echo $_SESSION['filter']; ?>";
            const phpOrder = "<?php echo $_SESSION['order']; ?>";
            const phpSort = "<?php echo $_SESSION['sort']; ?>";
        </script>
        <script src="todo.js"></script>
</body>
</html>