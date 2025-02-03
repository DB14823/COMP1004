$(document).ready(function () {
    function generateCalendar() {
      const calendar = $("#calendar");
      calendar.empty();
  
      const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const daysInMonth = new Date(2023, 11, 0).getDate(); // December 2023
  
      // Add days of the week
      daysOfWeek.forEach(day => {
        calendar.append(`<div class="day">${day}</div>`);
      });
  
      // Add days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        calendar.append(`<div class="day">${day}</div>`);
      }
    }
  
    // Attach the function to the window object
    window.generateCalendar = generateCalendar;
  });