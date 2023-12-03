// Global variables and constants
const MIN_HOUR = 9;  // beginning hour of calendar 9am
const MAX_HOUR = 17; // ending hour of calendar 5pm
const NUM_MINUTES_IN_HOUR = 60;

const CLASS_PAST_ATTR = "row time-block past";
const CLASS_PRESENT_ATTR = "row time-block present";
const CLASS_FUTURE_ATTR = "row time-block future";

// timeWatcher variables
var currentHour = dayjs().hour();
var currentMinute = dayjs().minute();
var minutesUntilNextHour = NUM_MINUTES_IN_HOUR - currentMinute;

// Local storage set up.
var tasksArr = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];  // array for tasks in each hour, 9 slots for 9 to 5 (9hours)
var numberOfTasks = 9;  // tasks for 9am to 5pm - 9 hours worth
var tasksLS = JSON.parse(localStorage.getItem('taskList'));

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {

  // Timer to make sure that the colors of the scheduler get changed on the hour.
  function timeWatcher() {
    var timerInterval = setInterval(function () {
      // Make sure the next hour is now
      var nextHour = dayjs().hour();
      var nextMinute = dayjs().minute();
      if (nextHour === currentHour) {
        console.log("current hour = next hour!");
        return;
      }

      // Change colors of tracker hour (past, present, future)

      // Reset timer
      minutesUntilNextHour = NUM_MINUTES_IN_HOUR - nextMinute;
      console.log("next minute" + currentMinute);
      console.log("next hour" + currentHour);
      console.log("minutes until next hour" + minutesUntilNextHour);
    }, timeUntilNextHour * 100);
  };

  // Set background color for this hour to timeframe = past, present or future
  // Colors set in CSS with predefined classes .past .present .future
  function setColorForTime(hour, timeframe) {
    var divText = "div#hour-" + hour;
    $(divText).addClass(timeframe);
    console.log($(divText));
  };

  // Get task from local storage and set it in the timeframe's task content on the scheduler
  function setTaskForTime(hour) {
    var divText = "div#hour-" + hour;

    // Make sure the hour is in the range of valid hours before looking for its text in local storage
    if ((hour >= MIN_HOUR) && (hour <= MAX_HOUR)) {
      var index = hour - MIN_HOUR;  // 9am is index 0, etc...
      var divTextArea_Value = tasksArr[index];

      // put text from local storage into this hour's text area
      $(divText).children('textarea').val(divTextArea_Value);
    }
  }
  // Initialize scheduler with backgrounds appropriate for the current time.
  // Pull scheduler text out of local storage and add it to the hour entry.
  function initializeScheduler() {
    for (i = MIN_HOUR; i <= MAX_HOUR; i++) {
      if (i > currentHour) {
        setColorForTime(i, CLASS_PAST_ATTR);
        setTaskForTime(i);
      } else if (i === currentHour) {
        setColorForTime(i, CLASS_PRESENT_ATTR);
        setTaskForTime(i);
      } else if (i < currentHour) {
        setColorForTime(i, CLASS_PAST_ATTR);
        setTaskForTime(i);
      }
    }
  }
  
  $('.btn').click(function (e) {
    preventDefault(e);
    //debugger;
    console.log(e.currentTarget);
    console.log(this.parentElement);  //div id=hour-9
    console.log(this.previousElementSibling);  // text area 
    console.log(this.previousElementSibling.previousElementSibling); // time 9AM 
    console.log(this.previousElementSibling.previousElementSibling.innerText); //9AM itself

  });
  //
  
  //
  // Display the current date in the header of the page.
  var todayDate = dayjs();
  $('#currentDay').text(todayDate.format('dddd, MMMM D'));

  console.log("current minute" + currentMinute);
  console.log("current hour" + currentHour);
  console.log("minutes until next hour" + minutesUntilNextHour);
  //debugger;
  // Initialize local storage and tasksArr
  if (tasksLS == null) {
    console.log("tasksLS is null");
    //initialize the local storage for the very first time running this app
    localStorage.setItem("taskList", JSON.stringify(tasksArr));
    tasksArr = JSON.parse(localStorage.getItem('taskList'));
  } else {
    //debugger;
    console.log("tasksLS= " + tasksLS);
    console.log("taskLS length" + tasksLS.length);
    tasksArr = JSON.parse(localStorage.getItem('taskList'));
    //console.log("tasksLS[0] = " + tasksLS[0]);
  }

  // Display task list with proper colors:
  // grey = past
  // red = current hour
  // green = future
  initializeScheduler();

});


// TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
// TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?