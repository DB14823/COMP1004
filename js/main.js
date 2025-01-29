$(document).ready(function () {
  let tasks = []; // To hold the JSON data in-memory

  // Fetch data from the JSON file
  $.getJSON("data/data.json", function (data) {
    tasks = data; // Store data in memory
    renderTasks(tasks); // Render the tasks
  }).fail(function () {
    console.error("Failed to load data.json!");
  });

  // Function to render tasks into the table
  function renderTasks(data) {
    let tableBody = $("#taskTableBody");
    tableBody.empty();

    data.forEach((item, index) => {
      let row = `
        <tr>
          <td>${item.taskName}</td>
          <td>${item.timeSpent}</td>
          <td>${item.deadline}</td>
          <td>${item.type}</td>
          <td>
            <button class="btn btn-primary btn-sm edit-btn" data-index="${index}">Edit</button>
          </td>
        </tr>`;
      tableBody.append(row);
    });

    // Add event listener to edit buttons
    $(".edit-btn").click(function () {
      const index = $(this).data("index");
      editTask(index);
    });
  }

  // Function to edit a task
  function editTask(index) {
    const task = tasks[index];

    // Prompt user for new values
    const newTaskName = prompt("Edit Task Name:", task.taskName);
    const newTimeSpent = prompt("Edit Time Spent (minutes):", task.timeSpent);
    const newDeadline = prompt("Edit Deadline (YYYY-MM-DD):", task.deadline);
    const newType = prompt("Edit Type (Task/Gaming Session):", task.type);

    // Update the task object if values are provided
    if (newTaskName) task.taskName = newTaskName;
    if (newTimeSpent) task.timeSpent = parseInt(newTimeSpent);
    if (newDeadline) task.deadline = newDeadline;
    if (newType) task.type = newType;

    // Re-render the table with updated data
    renderTasks(tasks);
  }
});
