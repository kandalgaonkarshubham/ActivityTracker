    // <!-- Running Functions on Window Load -->
 
    window.onload = function () {
            svgColor();
            checkViewMode();
            fetchLaps();
            setTimeout(aquireWakeLock, 10000);
            checkCookie();
            $('[data-toggle="tooltip"]').tooltip();
        }

    var startTime;
    var stopTime;

    // <!-- Stopwatch Javascript -->

 
        let hr = min = sec = ms = "0" + 0,
            startTimer;

        const startBtn = document.querySelector(".start"),
            stopBtn = document.querySelector(".stop"),
            eodBtn = document.querySelector(".eod"),
            resetBtn = document.querySelector(".reset"),
            aTags = document.getElementsByTagName('a');

        startBtn.addEventListener("click", start);
        stopBtn.addEventListener("click", stop);
        // resetBtn.addEventListener("click", reset);

        function start() {
            startBtn.classList.add("active");
            stopBtn.classList.remove("stopActive");

            startTimer = setInterval(() => {
                ms++
                ms = ms < 10 ? "0" + ms : ms;

                if (ms == 100) {
                    sec++;
                    sec = sec < 10 ? "0" + sec : sec;
                    ms = "0" + 0;
                }
                if (sec == 60) {
                    min++;
                    min = min < 10 ? "0" + min : min;
                    sec = "0" + 0;
                }
                if (min == 60) {
                    hr++;
                    hr = hr < 10 ? "0" + hr : hr;
                    min = "0" + 0;
                }
                putValue();
            }, 10); //1000ms = 1s

            eodBtn.setAttribute("disabled", "");
            eodBtn.classList.add('disabled');

            // Stopping Page from Closing or Reload

            window.onbeforeunload = function (evt) {
                var message = "Are you sure?";
                /* InternetExplorer/Firefox*/
                var e = evt || window.event
                e.returnValue = message
                /* WebKit browser */
                return message;
            }

            $('a').attr('target', '_blank');

            startTime = new Date().toLocaleTimeString();
        }

        function stop() {
            startBtn.classList.remove("active");
            stopBtn.classList.add("stopActive");
            clearInterval(startTimer);

            eodBtn.removeAttribute("disabled");
            eodBtn.classList.add('disabled');

            $('a').removeAttr('target');
        }

        function reset() {
            startBtn.classList.remove("active");
            stopBtn.classList.remove("stopActive");
            clearInterval(startTimer);
            hr = min = sec = ms = "0" + 0;
            putValue();
            removeRow();
        }

        function putValue() {
            document.querySelector("#millisecond").innerText = ms;
            document.querySelector("#second").innerText = sec;
            document.querySelector("#minute").innerText = min;
            document.querySelector("#hour").innerText = hr;
        }


    // <!-- Custom Js for Lap and Record -->

 
    let lapbtn = document.querySelector(".lapp");
    
    function fetchLaps() {

        let today = new Date();
        let date = today.toISOString().slice(0, 10);

        $.ajax({
            type: "GET",
            url: "get-laps.php",
            data: {date: date},
            success: function (data) {
                if (data!=0) {
                    $(".accordion-body").html(data);
                } else {
                    $(".lapp").prop("disabled", true);
                }
            }
        });
    }

    lapbtn.addEventListener("click", () => {
        $(".accordion-button").click();
    });



    // <!-- Custom Js for PHP & MYSQL -->

 
        // <!--Checking Submitted values and Pushing Notifications-->
        
        const successPlaceholder = document.getElementById('success');

        function checkForm() {

            let laph = document.querySelector("#hour").innerText,
                lapm = document.querySelector("#minute").innerText,
                laps = document.querySelector("#second").innerText,
                lapms = document.querySelector("#millisecond").innerText;

            let vcheck = laph + lapm + laps + lapms;

            const alert = (message, type) => {
                const wrapper = document.createElement('div')
                wrapper.innerHTML = [
                    `<div class="alert alert-${type} alert-dismissible fade show" role="alert">`,
                    `   <div>${message}</div>`,
                    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
                    '</div>'
                ].join('')
                successPlaceholder.append(wrapper)
            }

            if (vcheck <= 0) {
                alert('The stopwatch has not yet started', 'warning');
            } else {
                // alert('Value Stored in Database', 'success')
                storeForm();
            }

        }

        // <!--Submiting values-->

        function storeForm() {

            storeLog();

            var todayDate = new Date().toISOString().slice(0, 10);

            const laph = document.querySelector("#hour").innerText,
                  lapm = document.querySelector("#minute").innerText,
                  laps = document.querySelector("#second").innerText,
                  lapms = document.querySelector("#millisecond").innerText;

            const totaltime = `${laph}:${lapm}:${laps}.${lapms}`;
            const storedtime = document.querySelector("#storedvalue").innerText;

            // console.log(`"Value current ${totaltime}`);
            // console.log(`"Value fetched from db ${storedtime}`);

            d1 = moment.duration(totaltime);
            d2 = moment.duration(storedtime);
            d1.add(d2);
            finaltime = moment.utc(d1.asMilliseconds()).format("HH:mm:ss.SS");
            // console.log('The formatted time is:', finaltime);
            
            const add2 = 2;
            const newString = finaltime
                .replaceAll(':', '')
                .replaceAll('.', '');
            const concatString = '' + add2 + newString;
            const concatNum = Number(concatString);
            // console.log(`Concatted String for comparison is ${concatNum}`);
            

                if (concatNum <= 201000000) {
                    var todayClass = "badge bg-success";
                    var todayColor = "green";
                } else if (concatNum > 201000000 && concatNum <= 206000000) {
                    var todayClass = "badge bg-warning";
                    var todayColor = "yellow";
                } else if (concatNum > 206000000 && concatNum <= 299000000) {
                    var todayClass = "badge bg-danger";
                    var todayColor = "red";
                }
                 

                document.getElementById("inpdate").value = todayDate;
                document.getElementById("inpname").value = finaltime;
                document.getElementById("inpclass").value = todayClass;
                document.getElementById("inpcolor").value = todayColor;
                document.getElementById("inplogs").value = JSON.stringify(eveLog);
                document.getElementById("submit").click();
                
        }

 


    // <!-- DARK MODE -->
 
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


    // <!--Checking returned hash from PHP page and Pushing Notifications-->

 
        if (window.location.hash === '#success') {
            successStoring();
            setTimeout(removeHash, 200);
        }
        if (window.location.hash === '#updated') {
            updatedName();
            setTimeout(removeHash, 200);
        }
        if (window.location.hash === '#errorempty') {
            errorEmpty();
            setTimeout(removeHash, 200);
        }
        if (window.location.hash === '#error') {
            errorStoring();
            setTimeout(removeHash, 200);
        }


        function successStoring() {

            const successPlaceholder = document.getElementById('success');

            const alert = (message, type) => {
                const wrapper = document.createElement('div')
                wrapper.innerHTML = [
                    `<div class="alert alert-${type} alert-dismissible fade show" role="alert">`,
                    `   <div>${message}</div>`,
                    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
                    '</div>'
                ].join('')
                successPlaceholder.append(wrapper)
            }

            alert('Value Stored in Database', 'success');

        }

        function updatedName() {

            const successPlaceholder = document.getElementById('success');

            const alert = (message, type) => {
                const wrapper = document.createElement('div')
                wrapper.innerHTML = [
                    `<div class="alert alert-${type} alert-dismissible fade show" role="alert">`,
                    `   <div>${message}</div>`,
                    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
                    '</div>'
                ].join('')
                successPlaceholder.append(wrapper)
            }

            alert(`Today's Values Updated in Database`, 'success');

        }

        function errorStoring() {

            const dangerPlaceholder = document.getElementById('danger');

            const alert = (message, type) => {
                const wrapper = document.createElement('div')
                wrapper.innerHTML = [
                    `<div class="alert alert-${type} alert-dismissible fade show" role="alert">`,
                    `   <div>${message}</div>`,
                    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
                    '</div>'
                ].join('')
                dangerPlaceholder.append(wrapper)
            }

            alert('Problem Storing Value in Database', 'danger');

        }

        function errorEmpty() {

            const dangerPlaceholder = document.getElementById('danger');

            const alert = (message, type) => {
                const wrapper = document.createElement('div')
                wrapper.innerHTML = [
                    `<div class="alert alert-${type} alert-dismissible fade show" role="alert">`,
                    `   <div>${message}</div>`,
                    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
                    '</div>'
                ].join('')
                dangerPlaceholder.append(wrapper)
            }

            alert('Some Fields were Empty, Could not store data in the Database', 'danger');

        }

// <!-- // AQUIRE WAKE LOCK ONLOAD FUNCTION -->

    function aquireWakeLock(){
        document.getElementById("wakebtn").click();
        document.getElementById("reaquire").click();
        // console.log("aquired Wakelock");
        setTimeout(checkWakeLock, 10000);;
    }

    function checkWakeLock(){
        // console.log("Checked Wakelock");
        wkeBtn = document.getElementById("wakebtn");
        if (wkeBtn.innerText == "Turn Wake Lock ON") {
            wkeBtn.click();
        }

    }

// <!-- BULB COLOR CHANGE AND HOVER FUNCTION-->


    var timer;
    const bulb = document.getElementById('bulb');
    const footer = document.getElementById('footer');

    function svgColor() {
        timer = setInterval(function () {

            let compText = "Wake Lock is active!";
            let status = document.querySelector("#status > p").innerText;

            if (compText === status) {
                bulb.style.color = "green";
                bulb.title = status;
            }else{
                bulb.style.color = "red";
                bulb.title = status;
            }

        }, 5000);
    }

// <!-- FOOTER DISPLAY NONE TOGGLE -->

    function debugWkLck() {

        if (footer.classList.contains('d-none')) {
            footer.classList.remove('d-none');
        } else {
            footer.classList.add('d-none');
        }
    }


// <!-- REMOVING HASH FROM PAGE URL -->

    function removeHash() {
            history.pushState("", document.title, window.location.pathname + window.location.search);
        }

// <!-- Showing Popup on Startup by Using Cookies -->



    // function setCookie(name, value, days) {
    //         if (days) {
    //             var date = new Date();
    //             date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    //             var expires = "; expires=" + date.toGMTString();
    //         }
    //         else {
    //             var expires = "";
    //         }
    //         document.cookie = name + "=" + value + expires + "; path=/";
    // }

    function setCookie(name, value, minutes) {
            if (minutes) {
                var date = new Date();
                date.setTime(date.getTime() + (minutes * 60 * 1000));
                var expires = "; expires=" + date.toGMTString();
            } else {
                var expires = "";
            }
            document.cookie = name + "=" + value + expires + "; path=/";
    }


    function getCookie(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }
        
// <!- Checking the browser and Cookie then displaying the lacklist Prompt -->


function checkCookie() {

    
        function fnBrowserDetect() {
            
            let browserName;

            if (window.navigator.userAgent.indexOf("OPR") > -1 || window.navigator.userAgent.indexOf("Opera") > -1) {
                return browserName = "To Stop Opera from blacklisting the StopWatch Page, Open this tab - <b><i>opera://discards</i></b>";
            }
            else if (navigator.userAgent.indexOf("Edg") != -1) {
                return browserName = "To Stop MSEdge from blacklisting the StopWatch Page, Open this tab - <b><i>about://discards</i></b>";
            }
            else if (navigator.userAgent.indexOf("Chrome") != -1) {
                return browserName = "To Stop Chrome from blacklisting the StopWatch Page, Open this tab - <b><i>chrome://discards</i></b>";
            }
            else if (navigator.userAgent.indexOf("Safari") != -1) {
                return browserName = "Unfortunately, We do not have any information of Tab Snoozing of Safari. So If you dont want your browser to keep blacklisting the StopWatch Page, open it once in a while";
            }
            else if (navigator.userAgent.indexOf("Firefox") != -1) {
                return browserName = "WakeLock Api is not Supported in Firefox, To Stop Firefox from blacklisting the StopWatch Page, Open this tab - <b><i>firefox://discards</i></b>";
            }
            else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) //IF IE > 10
            {
                return browserName = "WHY ARE YOU USING INTERNET EXPLORER IN 21<sup>st</sup> CENTURY ????????";
            }
            else {
                return browserName = "We cannot detect which browser you are using.If you dont want your browser to keep blacklisting the StopWatch Page, open it once in a while";
            }

        }
        
            let sntime = getCookie("snoozeTime");
            let brname = fnBrowserDetect();
            // console.log(brname);

            if (!sntime) {

                setCookie("snoozeTime", "shown", 600);

                const alert = (message, type) => {
                    const wrapper = document.createElement('div')
                    wrapper.innerHTML = [
                        `<div class="alert alert-${type} alert-dismissible fade show" role="alert">`,
                        `   <div>${message}</div>`,
                        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
                        '</div>'
                    ].join('')
                    successPlaceholder.append(wrapper)
                }
                alert(`${brname}`, 'primary');
                
            }
        }
        

        
        
// <!- Storing the Start and End Time -->


    function createLogObject(tstart, tend) {
        var log = {
            "tstart": tstart,
            "tend": tend
        };
        return log;
    }

    function startLog() {
        startTime = new Date().toLocaleTimeString();
    }
    
    function storeLog() {
        stopTime = new Date().toLocaleTimeString();
        eveLog = createLogObject(startTime, stopTime);

        startTime = undefined;
        stopTime = undefined;

        return eveLog;
    }

    // CHANGING NAVBAR CLASS

    function changeClass() {
        let element = document.querySelector(".navbar-toggler");
        let switchElement = document.querySelector(".switch");

        element.classList.toggle("responsiveNavBtn");
        switchElement.classList.toggle("responsiveSwitchBtn");
    }