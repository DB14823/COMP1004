$(document).ready(function () {
  $("#viewTasks").click(function (event) {
    event.preventDefault();
    $("#taskView").show();
    $("#calendarView").hide();
    $("#addItemView").hide();
  });

  $("#viewCalendar").click(function (event) {
    event.preventDefault();
    $("#taskView").hide();
    $("#calendarView").show();
    $("#addItemView").hide();
    generateCalendar(); // Call the function to generate the calendar
  });

  $("#addItem").click(function (event) {
    event.preventDefault();
    $("#taskView").hide();
    $("#calendarView").hide();
    $("#addItemView").show();
  });
});