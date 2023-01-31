<?php
include("../authentication/connect.php");
session_start();

$sql = "SELECT * from calendarevents";
$result = mysqli_query($conn, $sql);

?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Calendar</title>

  <!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"> -->

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
  <link rel="stylesheet" href="./src/calendar-gc.css">
  <link rel="stylesheet" href="../css/style.css">
  <link rel="stylesheet" href="../css/mode.css">
  <link rel="stylesheet" href="../css/dark-mode.css">
  <link rel="stylesheet" href="../css/preloader.css">

  <link rel="apple-touch-icon" sizes="180x180" href="../favicon/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="../favicon/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="../favicon/favicon-16x16.png">
  <link rel="manifest" href="../favicon/site.webmanifest">

  <script src="https://kit.fontawesome.com/cea1d3b9d3.js" crossorigin="anonymous"></script>


  <style>
    html,
    body {
      margin: 0;
      overflow-x: hidden;
    }
  </style>
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
              <a class="nav-link active" href="#">Calendar</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="../calc.html">Calculator</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="../todo/index.php">Taskify</a>
            </li>
          </ul>

          <label class="switch">
            <input id="darkSwitch" type="checkbox" onclick="darkLight()">
            <span class="slider" onclick="darkLight()"></span>
          </label>

        </div>
      </div>
    </nav>

    <div id = "alert_placeholder"></div>

  </header>

  <div id="calendar" style="padding: 1rem;"></div>





  <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
  <script src="./dist/calendar-gc.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-u1OknCvxWvY5kfmNBILK2hRnQC3Pr17a+RTT6rIHI7NnikvbZlHgTPOOmMi466C8" crossorigin="anonymous"></script>
  <script src="../js/dark-mode-switch.js"></script>
  <script src="../js/preloader.js"></script>



<script>

$(function (e) {

  var today = new Date();
  var todayFullDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

  var calendar = $("#calendar");
  var events = [
      {
        date:new Date(todayFullDate),
        eventName:"Present Day",
        className:"presentDay",
        onclick(e, data) {
          console.log(data);
        },
        dateColor:"#7D2Ae8",
      }
  ];

  $.ajax({
    type: "GET",
    url: "getEvents.php",
    dataType: "json",
    success: function (data) {
      data.forEach(function (row) {
        var eventDate = new Date(row.eventdate);
        var event = {
          date: eventDate,
          eventName: row.eventname + " - " + row.eventcount + " Times",
          className: row.eventclass,

          onclick(e, data) {

            date = data.date;
            var isoString = date.toISOString();
            var dateArr = isoString.split("T")[0].split("-");
            var year = dateArr[0];
            var month = dateArr[1];
            var day = dateArr[2];
            var formattedDate = year + "-" + month + "-" + day;

            $.ajax({
              type: "GET",
              url: "getLogs.php",
              data: {
                functionname: "getLogs",
                date: formattedDate,
              },
              success: function(response) {

                if (response) {
                  let responseLog = JSON.parse(response);
                  let m1 = $(makeModal(responseLog));
                  m1.modal('show');

                }else{
                  bootstrap_alert = function() {}
                  bootstrap_alert.warning = function(message) {
                    $('#alert_placeholder').html(`<div class="alert alert-warning alert-dismissible fade show" role="alert"><strong><i class="fa-solid fa-triangle-exclamation"></i>&nbsp;&nbsp;</strong>${message}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`)
                  }
                  bootstrap_alert.warning('No Logs found for the Selected Date.');
                };

                function simplyfyDate(dates) {
                  var formattedDate = dates.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                  });
                  return formattedDate;
                }

                function totalLogs(logArray) {
                  return Object.keys(logArray.times).length;
                }

                function makeModal(logs) {
                  
                  var times = logs.times;
                  var modalContent = "";
                  
                  for (var key in times) {
                    var log = times[key];
                    modalContent += `<p><b><i class="fa-solid fa-angles-right"></i></b>&nbsp;&nbsp;&nbsp;<i class="fa-solid fa-hourglass-start"></i> StartTime = ${log.tstart}&nbsp;&nbsp;<i class="fa-solid fa-minus"></i>&nbsp;&nbsp;EndTime = ${log.tend} <i class="fa-solid fa-hourglass-end"></i></p>`;
                  }
                  
                  return `<div class="modal" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title">Logs for ${simplyfyDate(eventDate)}</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                          <p class="title"><i class="fa-solid fa-hat-wizard"></i> On this Day, you used your PC a total of <b><i>${totalLogs(logs)}</i></b> times.</p>
                          <p class="lineBrk"><hr/></p>
                          ${modalContent}
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                        </div>
                      </div>
                    </div>
                  </div>`;
                }

              }
            });

          },
          dateColor: row.eventcolor
        }
        events.push(event);
      });
    }
  }).done(function () {
    calendar.calendarGC({
      dayBegin: 0,
      // prevIcon: '&#x3c;', 
      // nextIcon: '&#x3e;', 
      onPrevMonth: function (e) {
        // console.log("prev");
        // console.log(e)
      },
      onNextMonth: function (e) {
        // console.log("next");
        // console.log(e)
      },
      events: events,
      onclickDate: function (e, data) {
        // console.log(e, data);
      },
    });
  });
  checkViewMode();
});
</script>
  
  <!-- DARK MODE -->
  <script>
    const chkbx = document.getElementById('darkSwitch');
    const navbar = document.getElementById("navbar");
    
    function checkViewMode() {
        setTimeout(darkLight, 10);
    }


    function darkLight() {

        if (document.getElementById('darkSwitch').checked) {


            if (navbar.classList.contains('bg-light', 'navbar-light')) {

                navbar.classList.remove('bg-light', 'navbar-light');
                navbar.classList.add('bg-dark', 'navbar-dark', 'custom-border');


            } else {

                navbar.classList.remove('bg-dark', 'navbar-dark', 'custom-border');
                navbar.classList.add('bg-light', 'navbar-light');


            }

        }
    }

        // CHANGING NAVBAR CLASS

    function changeClass() {
        let element = document.querySelector(".navbar-toggler");
        let switchElement = document.querySelector(".switch");

        element.classList.toggle("responsiveNavBtn");
        switchElement.classList.toggle("responsiveSwitchBtn");
    }
  </script>




  <!-- <script>
    $(function(e) {
      var calendar = $("#calendar").calendarGC({
        dayBegin: 0,
        prevIcon: '&#x3c;', //"&lt;"
        nextIcon: '&#x3e;', //"&gt;"
        onPrevMonth: function(e) {
          console.log("prev");
          console.log(e)
        },
        onNextMonth: function(e) {
          console.log("next");
          console.log(e)
        },
        events: [
          // {
          //   date: new Date("2022-09-26"),
          //   eventName: "Holiday",
          //   className: "badge bg-danger",
          //   onclick(e, data) {
          //     console.log(data);
          //   },
          //   dateColor: "red"
          // }
        ],
        onclickDate: function(e, data) {
          console.log(e, data);
        },

      });
    })

    function fetchEventTimeout() {
      setTimeout(fetchEvents, 10);
    }

    function fetchEvents() {

      var calendar = $("#calendar").calendarGC({
        events: [
          <?php
          while ($row = mysqli_fetch_array($result)) {
          ?> {
              date: new Date("<?php echo "$row[eventdate]" ?>"),
              eventName: "<?php echo "$row[eventname]" ?> - <?php echo "$row[eventcount]" ?> Times",
              className: "<?php echo "$row[eventclass]" ?>",
              onclick(e, data) {
                console.log(data);
              },
              dateColor: "<?php echo "$row[eventcolor]" ?>"
            },
          <?php
          }
          ?>
        ],
      });

      const prevBtn = document.querySelector(".prev");
      prevBtn.click();
      checkViewMode();
    }
  </script> -->

</body>

</html>