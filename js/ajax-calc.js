// $("#range-form").on("submit", function (e) {

//     var dataString = $(this).serialize();

//     $.ajax({
//         type: "POST",
//         url: "get-tables.php",
//         data: dataString,
//         success: function (data) {
//             $("#formDiv").html(data);

//          }
//     });

//     e.preventDefault();
// });


$("#range-form").on("submit", function (e) {

    const today = new Date();
    const todayDate = today.toISOString().substring(0, 10);

    const customRange = document.getElementById("customRange").value;

    var customDate = document.getElementById('date-label').value;
    if (customDate == "") {
        customDate = todayDate;
    }
    // console.log(customDate);

    $.ajax({
        type: "POST",
        url: "get-tables-date.php",
        data: {
            customDate: customDate,
            customRange: customRange,
        },
        success: function (data) {
            $("#formDiv").html(data);

         }
    });

    e.preventDefault();
});