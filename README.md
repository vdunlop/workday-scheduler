# workday-scheduler
The Workday Scheduler is a simple calendar application that allows a user to save events for each hour of a typical working day (9am–5pm). 

## Description
This scheduler will:

    *Present the user with their task list of 9 items (pulled from local storage if they have been creating them)

    *If this is the first time they have used it, the task list will be blank

    *Each item represents a task/tasks space that the user can type their task(s) in

    *When an item is entered into one of the 9am to 5pm slots, it is also saved to local storage

    *When time is at an hour, the scheduler sets the previous hour to past color and current our to present color

    *Past, present and future colors are defined in the CSS and are currently:

        * past = grey
        * present = red
        * future = green

    *When the user reopens the scheduler, their previous tasks will be gotten from local storage and displayed on the scheduler in the correct time

## User Story
AS AN employee with a busy schedule

I WANT to add important events to a daily planner

SO THAT I can manage my time effectively

### Acceptance Criteria
GIVEN I am using a daily planner to create a schedule

WHEN I open the planner

THEN the current day is displayed at the top of the calendar

WHEN I scroll down

THEN I am presented with time blocks for standard business hours of 9am to 5pm

WHEN I view the time blocks for that day

THEN each time block is color-coded to indicate whether it is in the past, present, or future

WHEN I click into a time block

THEN I can enter an event

WHEN I click the save button for that time block

THEN the text for that event is saved in local storage

WHEN I refresh the page

THEN the saved events persist

### Mock Up
Demo of the main page of workday scheduler.
![Alt text](./assets/images/05-third-party-apis-homework-demo.gif)

## Installation/Execution
https://vdunlop.github.io/workplace-scheduler/

Open the workplace-scheduler by clicking on the above URL. It will open up in a blank state and as you add tasks, they will be added to local storage.

The user will need to click on the save button next to the task text that the have entered to save it in local storage.

The user will see a message in the header "Appointment Added to localStorage" when the task has been saved.

If you want to remove a task, just backspace or delete it and click save.

## Usage
When the user opens the work scheduler, they will be able to add and remove tasks to/from their scheduler during the 9am to 5pm timeframe.

The tasks that are entered will be saved in local storage so they can reopen the scheduler and see what is already set.

The color scheme changes on the hour. All past hours will be grey. Current hour will be red and all future hours will be red.

The current date is displayed in the header. Tasks don't change from day to day, so you can plan your week with the tasks that you have to do daily.

When the user save a task, the "Appointment Added to localStorage" message will be displayed in the header so they will know the save occurred.

## Credits
I don't believe I've seen this in class, so I am adding to my credits:

Credit #1

https://www.samanthaming.com/tidbits: I used her information to add a string to a number. I used the +unary operator:

stringVar = +numberAsStringVar + stringVar2;

## License

N/A
