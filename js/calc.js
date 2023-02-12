// <!-- Running Functions on Window Load -->

window.onload = function () {
    checkViewMode();
    ajaxLimit();

    // <!-- DATEPICKER FUNCTIONS -->


    function formatDate(date) {
        return (
            date.getDate() +
            "-" +
            (date.getMonth() + 1) +
            "-" +
            date.getFullYear()
        );
    }

    const datepickerinput = document.getElementById('addon-wrapping');
    const dateshow = document.getElementById('date-label');
    
    var currentDate = formatDate(new Date());

    function convertDate(date) {
        var year = date.getFullYear();
        var month = (1 + date.getMonth()).toString().padStart(2, '0');
        var day = date.getDate().toString().padStart(2, '0');

        return year + '-' + month + '-' + day;
    }
    $(datepickerinput).datepicker({
        format: "yyyy-mm-dd",
        autoclose: true,
        todayHighlight: true,
        startDate: currentDate,
        orientation: "auto"
    });

    $(datepickerinput).on("click", function (event) {
        $(datepickerinput)
            .datepicker("show")
            .on("changeDate", function (dateChangeEvent) {
                $(datepickerinput).datepicker("hide");
                $(dateshow).val(convertDate(dateChangeEvent.date));
            });
    });
}

function ajaxLimit() {
    $.ajax({
        url: "get-limit.php",
        type: "GET",
        success: function (response) {
            // console.log(response);
            document.getElementById("customRange").max = response-1;
        },
        error: function (xhr, status, error) {
            console.log("Error: " + error);
        }
    });

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


/** 
 *! OLD CALCULATION

// <!-- CALCULATION OF VALUES AND PRINTING KWH INSIDE VALUE SPAN -->

// const addButton = document.getElementById('addition');
// const displayButton = document.getElementById('display');
// const priceOutput = document.getElementById('price_output');


// displayButton.addEventListener("click", function () {
//     setTimeout(calculation, 50);
//     priceOutput.innerText = "0";
// });

//     // CALCULATION BEGINS

// const wattInput = document.getElementById('wattInput');

// function customWatt() {
    
//     if (wattInput.value != 0) {
//         return wattInput.value;
//     } else {
//         return 14.01;
//     }
// }
// // const P = 14.01;
// // const E = P * T / 1000;

// function calculation() {
    

//     const headerRow = document.getElementById("headerRow");
//     const buttonRow = document.getElementById("buttonRow");
//     const priceCont = document.getElementById('price_container');

//     const limit = document.getElementById("customRange").value;
//     const formDiv = document.getElementById("formDiv");
//     const searchString = '0 RESULTS';

//     if (formDiv.innerHTML.length == 0 || formDiv.innerHTML.indexOf(searchString) !== -1) {

//         if (headerRow.classList.contains('d-none')) {
//             // console.log("Header Contains d-none");
//         } else {
//             headerRow.classList.add('d-none');
//             priceCont.classList.add('d-none');
//         }
//         if (buttonRow.classList.contains('d-none')) {
//             // console.log("Button Contains d-none");
//         } else {
//             buttonRow.classList.add('d-none');
//             priceCont.classList.add('d-none');
//         }

//     } else {

//         if (headerRow.classList.contains('d-none')) {
//             headerRow.classList.remove('d-none');
//             priceCont.classList.remove('d-none');
//         } else {
//             // console.log("d-none s present in headerrow");
//         }
//         if (buttonRow.classList.contains('d-none')) {
//             buttonRow.classList.remove('d-none');
//             priceCont.classList.remove('d-none');
//         } else {
//             // console.log("d-none s present in buttonrow");
//         }

       
//         let i = 0;
//         do {

//             const P = customWatt();
//             // console.log(P);

//             i += 1;

//             let displayTime = document.getElementById(`time.${i}`).value;
//             let displayVal = document.getElementById(`value.${i}`);
//             const first2 = parseInt(displayTime.slice(0, 2));
//             displayVal.innerText = first2;

//             // CONVERTING HOURS INTO KWH/UNITS 

//             let T = document.getElementById(`value.${i}`).innerText;
//             displayVal.innerText = P * T / 1000;

//         } while (i < limit);
//     }



// }

// // <!-- CALCULATING AND PRINTING PRICE -->

// addButton.addEventListener("click", function () {
    
//     var unitArray = [];

//     const units = document.getElementsByClassName('kwh');
//     const priceOutput = document.getElementById('price_output');

//     for (var i = 0; i < units.length; i++) {

//         // TAKING UNITS OF PER DAY AND PUSHING THEM INTO AN ARRAY FOR ADDITION

//         let items = units[i];
//         unitArray.push(+items.innerText);
//         // console.log(unitArray);

//         // ADDING THE UNITS FOR FURTHER CALCULATION


//         var total = 0;
//         for (var j in unitArray) {
//             total += unitArray[j];
//         }
//         // console.log(total);
//         let sliceNumber = (num, len) => +String(num).slice(0, len);

//         if (total >= 0 && total <= 100) {

//             let rupees = total*3.36;
//             priceOutput.innerText = sliceNumber(rupees, 5);

//         } else if (total >= 101 && total <= 300) {

//             let rupees = total*7.34;
//             priceOutput.innerText = sliceNumber(rupees, 5);


//         } else if (total >= 301 && total <= 500) {

//             let rupees = total*10.37;
//             priceOutput.innerText = sliceNumber(rupees, 5);


//         } else if (total >= 501 && total <= 1000) {

//             let rupees = total*11.86;
//             priceOutput.innerText = sliceNumber(rupees, 5);


//         } else if (total > 1000) {

//             let rupees = total*11.86;
//             priceOutput.innerText = sliceNumber(rupees, 5);

//         }

//     }
// });
*! OLD CALCULATION ENDS HERE
*/

// <!-- /**  NEW CALCULATION STARTS FROM HERE **/ -->


// <!-- CALCULATION OF VALUES AND PRINTING KWH INSIDE VALUE SPAN -->

const addButton = document.getElementById('addition');
const displayButton = document.getElementById('display');
const priceOutput = document.getElementById('price_output');


displayButton.addEventListener("click", function () {
    setTimeout(calculate, 100);
    priceOutput.innerText = "0";
});


const wattInput = document.getElementById('wattInput');

function customWatt() {

    if (wattInput.value != 0) {
        wattInput.placeholder = wattInput.value;
        return wattInput.value;
    } else {
        wattInput.placeholder = 14.01;
        return 14.01;
    }

}


function calculation() {

    // TOGGLING D-NONE FROM TABLES


    const headerRow = document.getElementById("headerRow");
    const buttonRow = document.getElementById("buttonRow");
    const priceCont = document.getElementById('price_container');

    const limit = document.getElementById("customRange").value;
    const formDiv = document.getElementById("formDiv");
    const searchString = '0 RESULTS';

    if (formDiv.innerHTML.length == 0 || formDiv.innerHTML.indexOf(searchString) !== -1) {

        if (headerRow.classList.contains('d-none')) {
            // console.log("Header Contains d-none");
        } else {
            headerRow.classList.add('d-none');
            priceCont.classList.add('d-none');
        }
        if (buttonRow.classList.contains('d-none')) {
            // console.log("Button Contains d-none");
        } else {
            buttonRow.classList.add('d-none');
            priceCont.classList.add('d-none');
        }

    } else {

        if (headerRow.classList.contains('d-none')) {
            headerRow.classList.remove('d-none');
            priceCont.classList.remove('d-none');
        } else {
            // console.log("d-none s present in headerrow");
        }
        if (buttonRow.classList.contains('d-none')) {
            buttonRow.classList.remove('d-none');
            priceCont.classList.remove('d-none');
        } else {
            // console.log("d-none s present in buttonrow");
        }

        // DO-WHILE LOOP TO PRINT VALUES OF TIME AND KWH IN DOM

        let i = 0;
        do {

            const P = parseInt(customWatt());
            // console.log(P);

            i += 1;

            let displayTime = document.getElementById(`time.${i}`).value;
            let displayVal = document.getElementById(`value.${i}`);
            const first2 = parseInt(displayTime.slice(0, 2));
            displayVal.innerText = first2;

            // CONVERTING HOURS INTO KWH/UNITS

            let T = document.getElementById(`value.${i}`).innerText;
            displayVal.innerText = P * T / 1000;

        } while (i < limit);


        // DO-WHILE LOOP TO PUSH ALL HOURS INTO AN ARRAY

        let timeStrings = [];

        let t = 1;
        let displayTime = document.getElementById(`time.${t}`).value;

        // Loop until no more time elements are found
        do {
            // Push the time string to the array
            timeStrings.push(displayTime);

            // Increment the counter and get the next time element
            t++;
            displayTime = document.getElementById(`time.${t}`).value;

        } while (t < limit);
        // Run the loop one more time
        timeStrings.push(displayTime);

        return timeStrings;
    }



}

// <!-- FUNCTION TO CALCULATE THE TOTAL HOURS -->


function calculateTotalConsumption(timeStrings) {
    let totalHours = 0;
    let totalMinutes = 0;
    let totalSeconds = 0;
    let totalMilliseconds = 0;

    // Loop through the time strings
    for (const timeString of timeStrings) {
        // Extract the hours, minutes, and seconds from the time string
        const [hours, minutes, seconds] = timeString.split(":");

        // Convert the hours, minutes, and seconds to numbers
        const hoursNum = parseInt(hours);
        const minutesNum = parseInt(minutes);
        const secondsNum = parseInt(seconds);

        // Extract the milliseconds if present
        let millisecondsNum = 0;
        const millisecondsIndex = seconds.indexOf(".");
        if (millisecondsIndex !== -1) {
            millisecondsNum = parseInt(seconds.slice(millisecondsIndex + 1));
        }

        // Add the hours, minutes, seconds, and milliseconds to the total
        totalHours += hoursNum;
        totalMinutes += minutesNum;
        totalSeconds += secondsNum;
        totalMilliseconds += millisecondsNum;
    }

    // Carry over any excess minutes and seconds
    totalMinutes += Math.floor(totalSeconds / 60);
    totalSeconds = totalSeconds % 60;
    totalHours += Math.floor(totalMinutes / 60);
    totalMinutes = totalMinutes % 60;

    // Carry over any excess hours and minutes
    totalHours += Math.floor(totalMinutes / 60);
    totalMinutes = totalMinutes % 60;

    // Pad the time values with leading zeros if needed
    const paddedHours = String(totalHours).padStart(2, "0");
    const paddedMinutes = String(totalMinutes).padStart(2, "0");
    const paddedSeconds = String(totalSeconds).padStart(2, "0");
    const paddedMilliseconds = String(totalMilliseconds).padStart(3, "0");

    // Return the total time as a string
    // return `${paddedHours}:${paddedMinutes}:${paddedSeconds}.${paddedMilliseconds}`;
    const totalTimeString = `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;

    // <!-- ROUNDING HOURS -->


    function roundTimeToNearestHour(timeString) {
        const [hours, minutes, seconds] = timeString.split(":");

        let hoursNum = parseInt(hours);
        const minutesNum = parseInt(minutes);

        if (minutesNum >= 30) {

            hoursNum += 1;
        }

        return hoursNum;
    }

    return roundTimeToNearestHour(totalTimeString);

}

// <!-- CALCULATING AND KWH & UNIT -->

function calculate() {

    let hourArray = calculation();
    const powerRating = parseInt(customWatt());

    // Calculate the total consumption in KWH
    const totalConsumption = calculateTotalConsumption(hourArray);

    // kWh = totalConsumption * wattage / 1000;
    // units = kWh * 1000 / wattage;
    // return units;

    units = (totalConsumption * powerRating / 1000) * 1000 / powerRating;
    // console.log(units);
    return units;


}

// <!-- CALCULATING AND PRINTING PRICE -->

addButton.addEventListener("click", function () {

    const total = calculate();
    const priceOutput = document.getElementById('price_output');

    // let sliceNumber = (num, len) => +String(num).slice(0, len);

        // grouping and comparing with units, according to my light bill values 
    if (total >= 0 && total <= 100) {

        // units * rupees + tax(in rupees)
        let rupees = (total * 3.36) + 0.650;
        priceOutput.innerText = Math.round(rupees);

    } else if (total >= 101 && total <= 300) {

        let rupees = (total * 7.34) + 1.450;
        priceOutput.innerText = Math.round(rupees);


    } else if (total >= 301 && total <= 500) {

        let rupees = (total * 10.37) + 2.050;
        priceOutput.innerText = Math.round(rupees);


    } else if (total >= 501 && total <= 1000) {

        let rupees = (total * 11.86) + 2.350;
        priceOutput.innerText = Math.round(rupees);


    } else if (total > 1000) {

        let rupees = (total * 11.86) + 2.350;
        priceOutput.innerText = Math.round(rupees);

    }

});


// CHANGING NAVBAR CLASS

function changeClass() {
    let element = document.querySelector(".navbar-toggler");
    let switchElement = document.querySelector(".switch");

    element.classList.toggle("responsiveNavBtn");
    switchElement.classList.toggle("responsiveSwitchBtn");
}
