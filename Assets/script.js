//global variables
var containerEl = $(".container");
console.log(containerEl);
//an array containing the hours of the day that will be displayed in the planner
var hours = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"]
//an array containing the tasks to be done during the hours. 
var tasks = ["","","","","","","","",""];
//an array containing the hours in military time format for styling purposes
var hoursMilitary = ["09", "10", "11", "12", "13", "14", "15", "16", "17"]




console.log(hours)

// Set todays date at the top of the page
var today = moment();
console.log(today);
$("#currentDay").text(today.format("MMM Do, YYYY"));

var currentTime = today.format("HH");
console.log(currentTime);

//initialize
init();

//Create the rows for each of the hours in the array and append to the HTML
function printPlannerData() {
    console.log("started");

    for (var i = 0; i < hours.length; i++) {
        //create the row element
        var plannerRowEL = $('<tr>').addClass('row').attr("index", i);
        //create the Hour cell and append the data for the hour
        var plannerHourTdEL = $('<td>').addClass('hour').text(hours[i]);
        //create the description cell and import the saved tasks, if any.
        var plannerDescriptionTdEL = $('<td>').addClass('description').attr('id', 'textArea').text(tasks[i]).prepend('<textarea>');
        if (currentTime == hoursMilitary) {
            plannerDescriptionTdEL.addClass('present');
        };
        if (currentTime < hoursMilitary) {
            plannerDescriptionTdEL.addClass('future');
        };
        if (currentTime > hoursMilitary) {
            plannerDescriptionTdEL.addClass('past');
        };
        //create the save btn
        var plannerSaveTdEL = $('<td>');
        // create a button, set an index for the button as well.
        var button = $('<button>').addClass('saveBtn').attr("index", i).text("Save");
        //append save btn to the TD
        plannerSaveTdEL.append(button);
        //append the 3 TDs to the Row
        plannerRowEL.append(plannerHourTdEL, plannerDescriptionTdEL, plannerSaveTdEL);
        //append the row to the container
        containerEl.append(plannerRowEL);
        //Set styling of descriptionTdEL based on the current time

    }
}

function storeTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function init() {
    var storedTasks = JSON.parse(localStorage.getItem("tasks"));

    if (storedTasks !== null) {
        tasks = storedTasks;
    }

    printPlannerData();
}

$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    //get the index of where this button is so we can update the correct spot on the array
    var dataIndex = $(this).attr("index");
    console.log(dataIndex);

    var element = document.getElementById('index', dataIndex);
    console.log(element);

    //get the input from the text area
    var descriptionData = $("textArea").val().trim();
    console.log(descriptionData);

    // if null, return
    if (descriptionData === "" ) {
        return;
    }

    //update tasks array with the description data
    tasks[dataIndex] = descriptionData;
    console.log(tasks);

    //clear the input
    descriptionData.value = "";

    //Store updated tasks in localStorage and print the Planner Data
    storeTasks();
    printPlannerData();


});




