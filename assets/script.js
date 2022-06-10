// sets the current date at the top of the page
var today = moment();
$("#presentDay").text(today.format("dddd, MMMM Do"));


// tasks object to store in localStorage.
var tasks = {
    "9": [],
    "10": [],
    "11": [],
    "12": [],
    "13": [],
    "14": [],
    "15": [],
    "16": [],
    "17": []
};



 // add tasks to localStorage
function setTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};



 // load the tasks from localStorage and create tasks in the right row
function getTasks() {
    var loadedTasks = JSON.parse(localStorage.getItem("tasks"));
        if (loadedTasks) {
        tasks = loadedTasks
        // for each key/value pair in tasks, create a task
        $.each(tasks, function(hour, task) {
        var hourDiv = $("#" + hour);
        createTask(task, hourDiv);
        })
    }
    auditTasks()
};



 // create a task in the row that corresponds to the specified hour
function createTask(taskText, hourDiv) {
    var taskDiv = hourDiv.find(".task");
    // create the task element
    var taskP = $("<p>")
    .addClass("description")
    .text(taskText)
    taskDiv.html(taskP);
};


 // update the background of each row based on the time of day
function auditTasks() {
    var presentHour = moment().hour();
    $(".task-info").each( function() {
    var elementHour = parseInt($(this).attr("id"));
        if ( elementHour < presentHour ) {
        $(this).removeClass(["present", "future"]).addClass("past");
        }
        else if ( elementHour === presentHour ) {
        $(this).removeClass(["past", "future"]).addClass("present");
        }
        else {
        $(this).removeClass(["past", "present"]).addClass("future");
        }
    })
};


 // replaces the provided textarea element with a p element and persists the data in localStorage 
function replaceTextarea(textareaElement) {
     var taskInfo = textareaElement.closest(".task-info");
     var textArea = taskInfo.find("textarea");
     var time = taskInfo.attr("id");
     var text = textArea.val();

     tasks[time] = [text];  
     setTasks();

    // replace the textarea element with a p element
    createTask(text, taskInfo);
};




 /* CLICK HANDLERS */

 // Tasks
 $(".task").click(function() {
    // save the other tasks if clicked already
    $("textarea").each(function() {
    // get the necessary elements
    var taskInfo = $(this).closest(".task-info");
    var textArea = taskInfo.find("textarea");
    var time = taskInfo.attr("id");
    var text = textArea.val('');
        if (text){
        // add the task to tasks object
        tasks[time] = [text]; 
        setTasks();
        };
        // replace the textarea element with a p element
        createTask(text, taskInfo);
         eplaceTextarea($(this));
});

// convert to a textarea element if the time hasn't passed
var time = $(this).closest(".task-info").attr("id");
    if (parseInt(time) >= moment().hour()) {
    // create a textInput element that includes the present task/textIput
    var text = $(this).text();
    var textInput = $("<textarea>")
        .addClass("form-control")
        .val(text);

    // add the textInput element to the parent div
    $(this).html(textInput);
    textInput.trigger("focus");
    }
});


// save button click handler
$(".saveBtn").click(function() {
    // get the necessary elements
    var taskInfo = $(this).closest(".task-info");
    var textArea = taskInfo.find("textarea");
    // get the time/task
    var time = taskInfo.attr("id");
    var text = textArea.val();
    if (text){
    // add the task to tasks object
    tasks[time] = [text];
    setTasks();
    };
    // replace the textarea element with a p element
    createTask(text, taskInfo);
    replaceTextarea($(this));
});



// update the background of each row based on the time of day
function auditTasks() {
    // get the present hour
    var presentHour = moment().hour();
    // update tasks based on their time
    $(".task-info").each( function() {
        var elementHour = parseInt($(this).attr("id"));
        //hours that have passed
        if ( elementHour < presentHour ) {
        $(this).removeClass(["present", "future"]).addClass("past");
        }
        //present hour
        else if ( elementHour === presentHour ) {
        $(this).removeClass(["past", "future"]).addClass("present");
        }
        //future
        else {
        $(this).removeClass(["past", "present"]).addClass("future");
        }
    })
};
getTasks();




// update the task backgrounds on the hour
timeToHour = (3600000) - today.milliseconds(); 
 // delay the audit until the top of that hour
 // update task backgrounds on the hour
timeToHour = 3600000 - today.milliseconds(); 
setTimeout(function() {
// then audit at every hour after that
setInterval(auditTasks, 3600000)
}, timeToHour);
// audit every hour after that 

// get the tasks from localStorage on load.
getTasks();
