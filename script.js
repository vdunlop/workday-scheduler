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
var tasksArr = ["", "", "", "", "", "", "", "", ""];  // array for tasks in each hour, 9 slots for 9 to 5 (9hours)
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
        console.log("Error:current hour = next hour!");
        return;
      }

      // Change colors of tracker hour (past, present, future)
      currentHour = nextHour; // update the global currentHour

      setColorForTime(currentHour - 1, CLASS_PAST_ATTR);
      setColorForTime(currentHour, CLASS_PRESENT_ATTR);

      // Reset timer
      minutesUntilNextHour = NUM_MINUTES_IN_HOUR - nextMinute;
      //console.log("next minute" + currentMinute);
      //console.log("next hour" + currentHour);
      //console.log("minutes until next hour" + minutesUntilNextHour);
    }, timeUntilNextHour * 100);
  };

  // Set background color for this hour to timeframe = past, present or future
  // Colors set in CSS with predefined classes .past .present .future
  function setColorForTime(hour, timeframe) {
    var divText = "div#hour-" + hour;
    $(divText).addClass(timeframe);
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
        setColorForTime(i, CLASS_FUTURE_ATTR);
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

  // On a save button click:
  // get which hour was clicked
  // get new text in textarea
  // save in local storage
  $('.btn').click(function (e) {
    e.preventDefault();

    // get hour that we clicked on
    var hour = this.previousElementSibling.previousElementSibling.innerText;
    var hourLength = hour.length;
    if (hourLength == 4) {  // means time is 2 digits 11,12
      hour = hour.substr(0, 2);
    } else if (hourLength == 3) {  //means time is 1 digit 9,2
      hour = hour.substr(0, 1);
    } else {
      console.log("error in button click");
    }

    // get the data entered in textarea
    // store in local storage and update our tasksArr to "emulate" local storage
    var divText = "div#hour-" + hour;
    var index = hour - MIN_HOUR;  // 9am is index 0, 10AM index 1, etc...

    tasksArr[index] = $(divText).children('textarea').val();
    localStorage.setItem("taskList", JSON.stringify(tasksArr));

    // Turn on the Appointment Saved text
    $('p#apptSaved').attr("style","display:block");
  });

  // MAIN
  // Display the current date in the header of the page.
  var todayDate = dayjs();
  $('#currentDay').text(todayDate.format('dddd, MMMM D'));

  // Initialize local storage and tasksArr
  if (tasksLS == null) {
    //initialize the local storage for the very first time running this app
    localStorage.setItem("taskList", JSON.stringify(tasksArr));
    tasksArr = JSON.parse(localStorage.getItem('taskList'));
  } else {
    tasksArr = JSON.parse(localStorage.getItem('taskList'));
  }
 
  // Display task list with proper colors:
  // grey = past
  // red = current hour
  // green = future
  initializeScheduler();
});
