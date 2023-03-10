// <!-- Running Functions on Window Load -->

window.onload = function () {

    checkViewMode();
    checkOptions();
    
    // bootlint.showLintReportForCurrentDocument([], {
    //     hasProblems: false,
    //     problemFree: false
    // });

    $('[data-toggle="tooltip"]').tooltip();

    function formatDate(date) {
        return (
            date.getDate() +
            "/" +
            (date.getMonth() + 1) +
            "/" +
            date.getFullYear()
        );
    }

    var currentDate = formatDate(new Date());

    function convertDate(date) {
        var year = date.getFullYear();
        var month = (1 + date.getMonth()).toString().padStart(2, '0');
        var day = date.getDate().toString().padStart(2, '0');

        return year + '-' + month + '-' + day;
    }

    $(".due-date-button").datepicker({
        // format: "dd/mm/yyyy",
        format: "yyyy-mm-dd",
        autoclose: true,
        todayHighlight: true,
        startDate: currentDate,
        orientation: "bottom right",
        startDate: '-0m', // disable previous dates
    });

    $(".due-date-button").on("click", function (event) {
        $(".due-date-button")
            .datepicker("show")
            .on("changeDate", function (dateChangeEvent) {
                $(".due-date-button").datepicker("hide");
                $(".due-date-label").text(convertDate(dateChangeEvent.date));

                const dateLabel = document.querySelector(".due-date-label");
                dateLabel.classList.remove('d-none');
            });
    });
};
    // <!-- DARK MODE -->
    
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

// <!-- SET VIEW OPTIONS -->

    const statusSelect = document.getElementById('taskStatus');
    const dateSelect = document.getElementById('taskDate');



    function checkOptions() {

        if (phpFilter == "completed") {
            statusSelect.value = 'completed';

            if (statusSelect.value == "completed") {

                const labelContP = document.querySelector('.labelContainerParent');
                const checkBoxEdit = document.getElementById('checkEdit');
                const labels = document.querySelectorAll('label[id="complete"]');
                const checkboxes = document.querySelectorAll('input[type="checkbox"][data-id]');
                const paragraphs = document.querySelectorAll('p[data-id]');
                const infoBtns = document.querySelectorAll('button[id="infoMenu"]');
                const actionBtns = document.querySelectorAll('button[id="actionsMenu"]');
                const badgeHolders = document.querySelectorAll('span[data-id^="badge"]');

                // const taskBg = document.querySelector(`p[data-id="task${fetchNum}"]`);

                labels.forEach(function (label) {
                    label.removeAttribute('data-toggle');
                });
                checkboxes.forEach(function (checkbox) {
                    checkbox.setAttribute('checked', 'checked');
                    checkbox.setAttribute('disabled', 'disabled');
                });
                paragraphs.forEach(function (para) {
                    para.style.color = '#24c78e';
                });
                infoBtns.forEach(function (infoBtn) {
                    infoBtn.classList.remove('d-none');
                });
                actionBtns.forEach(function (actionBtn) {
                    actionBtn.classList.add('d-none');
                });
                badgeHolders.forEach(function (badgeHolder) {
                    badgeHolder.style.display = "none";
                });

                labelContP.classList.remove('d-none');
                $(checkBoxEdit).click(function () {
                    checkboxes.forEach(function (checkbox) {
                        if (checkbox.hasAttribute('disabled')) {
                            checkbox.removeAttribute('disabled');
                        } else {
                            checkbox.setAttribute('disabled', 'true');
                        }
                    });
                });

            }
        } else if (phpFilter == "due") {
            statusSelect.value = 'due';
        }

        if (phpOrder == "DESC") {
            $('#orderBtn').removeClass('fa-sort-amount-asc').addClass('fa-sort-amount-desc');
        }

        if (phpSort == "taskenddate") {
            dateSelect.value = 'taskenddate';
        }


    }
    // <!-- AJAX FORM SUBMISSION -->

function submitForm() {

    const task = document.getElementById('task').value;
    const dueLabel = document.querySelector('.due-date-label').innerText;
    const notiPlaceholder = document.getElementById('noti');

    if (task.length === 0 || dueLabel == "Due date not set") {
        
        const alert = (message, type) => {
            const wrapper = document.createElement('div')
            wrapper.innerHTML = [
                `<div class="alert alert-${type} alert-dismissible fade show" role="alert">`,
                `   <div>${message}</div>`,
                '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
                '</div>'
            ].join('')
            notiPlaceholder.append(wrapper)
        }
        alert(`Empty Input or Due Date not selected`, 'warning');

    } else {

        $.ajax({
            url: "submit.php",
            type: "POST",
            data: {
                functionname: "submit",
                task: $('#task').val(),
                enddate: $('.due-date-label').text(),
            },
            success: function (response) {
                location.reload();
            }
        });
    }

}

    // <!-- TASKS FUNCTIONS -->
    
    // const completeBtn = document.getElementById('complete');
    

    
    // <!-- ASCENDING DESCENDING TOGGLE -->
    
    $("#orderBtn").click(function () {
        if ($('#orderBtn').hasClass('fa-sort-amount-asc')) {

            $('#orderBtn').removeClass('fa-sort-amount-asc').addClass('fa-sort-amount-desc');

            $.ajax({
                url: "submit.php",
                type: "POST",
                data: {
                    functionname: "order",
                    order: "DESC",
                },
                success: function (response) {
                    location.reload();
                }
            });


        } else {

            $('#orderBtn').addClass('fa-sort-amount-asc').removeClass('fa-sort-amount-desc');

            $.ajax({
                url: "submit.php",
                type: "POST",
                data: {
                    functionname: "order",
                    order: "ASC",
                },
                success: function (response) {
                    location.reload();
                }
            });

        }
    });

    // <!-- SORTING BY STATUS AND DATE -->

    // const statusSelect = document.getElementById('taskStatus');
    // const dateSelect = document.getElementById('taskDate');

    statusSelect.addEventListener('change', function () {

        const statusVal = statusSelect.value;

        $.ajax({
            url: "submit.php",
            type: "POST",
            data: {
                functionname: "filter",
                filter: statusVal,
            },
            success: function (response) {
                location.reload();
            }
        });

    });

    dateSelect.addEventListener('change', function () {

        const dateVal = dateSelect.value;

        $.ajax({
            url: "submit.php",
            type: "POST",
            data: {
                functionname: "sort",
                sort: dateVal,
            },
            success: function (response) {
                location.reload();
            }
        });

    });

    // <!-- UNIQUELY IDENTIFYING SECTIONS -->
    
    const compButtons = document.querySelectorAll('input[data-id]');

    function getNumber(str) {
        return str.replace(/id|save|edit|delete|push/g, '');
    }


    compButtons.forEach(button => {
        button.addEventListener('click', function () {

            idNum = button.getAttribute('data-id');
            fetchNum = getNumber(idNum);

            setTimeout(function () {
                if (button.checked) {
                    
                    $.ajax({
                        url: "submit.php",
                        type: "POST",
                        data: {
                            functionname: "complete",
                            taskid: fetchNum,
                        },
                        success: function (response) {
                            location.reload();
                        }
                    });


                    // button.disabled = true;
                    const taskBg = document.querySelector(`p[data-id="task${fetchNum}"]`);
                    taskBg.style.transition = 'color 1s';
                    taskBg.style.color = '#24c78e';
                    


                } else {
                    
                    $.ajax({
                        url: "submit.php",
                        type: "POST",
                        data: {
                            functionname: "due",
                            taskid: fetchNum,
                        },
                        success: function (response) {
                            location.reload();
                        }
                    });

                }
            }, 500);

        });
    });

    // <!-- EDIT, SAVE, DELETE & PUSH ACTIONS -->

    const editButtons = document.querySelectorAll('i[data-id^="edit"]');
    const saveButtons = document.querySelectorAll('i[data-id^="save"]');
    const delButtons = document.querySelectorAll('i[data-id^="delete"]');
    const pushButtons = document.querySelectorAll('i[data-id^="push"]');

    editButtons.forEach(button => {
        button.addEventListener('click', function () {
            idNum = button.getAttribute('data-id');
            fetchNum = getNumber(idNum);

            const parentDiv = this.parentNode;
            const parentButton = parentDiv.parentNode;
            parentButton.classList.add('d-none');

            const confirmMenu = document.querySelector(`button[data-id="cMenu${fetchNum}"]`);
            const task = document.querySelector(`p[data-id="task${fetchNum}"]`);

            confirmMenu.classList.remove('d-none');
            task.setAttribute('contenteditable', true);
        });
    });
    

    saveButtons.forEach(button => {
        button.addEventListener('click', function () {
            idNum = button.getAttribute('data-id');
            fetchNum = getNumber(idNum);

            const taskVal = document.querySelector(`p[data-id="task${fetchNum}"]`).innerText;
            
            $.ajax({
                url: "submit.php",
                type: "POST",
                data: {
                    functionname: "edit",
                    taskid: fetchNum,
                    taskname: taskVal,
                },
                success: function (response) {
                    location.reload();
                }
            });
        });
    });

    delButtons.forEach(button => {
        button.addEventListener('click', function () {
            idNum = button.getAttribute('data-id');
            fetchNum = getNumber(idNum);

            const parentDiv = this.parentNode;
            const parentButton = parentDiv.parentNode;
            parentButton.classList.add('d-none');

            const delMenu = document.querySelector(`button[data-id="delMenu${fetchNum}"]`);
            delMenu.classList.remove('d-none');

            delMenu.addEventListener('click', function () {
                $.ajax({
                    url: "submit.php",
                    type: "POST",
                    data: {
                        functionname: "delete",
                        taskid: fetchNum,
                    },
                    success: function (response) {
                    location.reload();
                    }
                });
            });
        });
    });

    pushButtons.forEach(button => {
        button.addEventListener('click', function () {
            idNum = button.getAttribute('data-id');
            fetchNum = getNumber(idNum);

            $.ajax({
                url: "submit.php",
                type: "POST",
                data: {
                    functionname: "push",
                    taskid: fetchNum,
                },
                success: function (response) {
                    location.reload();
                }
            });
        });
    });

    // <!-- CHANGING COLOUR BY CALCULATING DAYS -->

    let dueRed = 0;
    let dueYellow = 0;
    const phpElements = document.getElementById('phpElements').innerHTML;

    if (phpElements.trim() == "") {
        sessionStorage.removeItem("dueNotifications");
    } else {

        const maxLimit = document.getElementById("phpElements").childElementCount;

        let currentDate = new Date();
        let formattedDate = currentDate.toISOString().slice(0, 10);


        const taskParagraphs = document.querySelectorAll('p[data-id^="task"]');
        const dueDateBadges = document.querySelectorAll('i[data-id^="due"]');
        const pushDateBadges = document.querySelectorAll('i[data-id^="push"]');
        const statusBadges = document.querySelectorAll('span[data-id^="badge"]');

        for (let i = 0; i <= maxLimit; i++) {
            const taskParagraph = taskParagraphs[i];
            if (dueDateBadges[i]) {
                const taskDueDate = new Date(dueDateBadges[i].getAttribute("data-value"));
                const currentDate = new Date(formattedDate);
                const difference = (taskDueDate - currentDate) / (1000 * 60 * 60 * 24);

                const statusBadge = statusBadges[i];
                const statusBadgeContainer = statusBadge.parentNode;

                const dueDateBadge = dueDateBadges[i];
                const pushDateBadge = pushDateBadges[i];

                switch (true) {
                    case difference <= 0:
                        taskParagraph.setAttribute('style', 'font-weight:500 !important; color:#ED0014 !important;');
                        statusBadgeContainer.classList.remove("d-none");
                        statusBadge.classList.add("text-bg-danger");
                        dueDateBadge.style.display = "none";
                        pushDateBadge.classList.remove("d-none");
                        dueRed++;
                    break;

                    case difference <= 3:
                        taskParagraph.setAttribute('style', 'font-weight:500 !important; color:#FFBF00 !important');
                        statusBadgeContainer.classList.remove("d-none");
                        statusBadge.classList.add("text-bg-warning");
                        dueDateBadge.style.display = "none";
                        pushDateBadge.classList.remove("d-none");
                        dueYellow++;
                    break;
                }
                sessionStorage.setItem("dueNotifications", `${dueRed + dueYellow}`);
                
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
    // <!-- Clearing Completed Tasks -->

function clearComp() {
    $.ajax({
        url: "submit.php",
        type: "POST",
        data: {
            functionname: "clear"
        },
        success: function (response) {
            location.reload();
        }
    });
}