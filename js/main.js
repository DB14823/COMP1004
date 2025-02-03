$(document).ready(function () {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || []; 

  // Render tasks from local storage on page load
  renderTasks(tasks);

  // Fetch tasks from data.json (if needed)
  $.getJSON("data/data.json", function (data) {
    if (tasks.length === 0) { // Only load from data.json if local storage is empty
      tasks = data; 
      localStorage.setItem("tasks", JSON.stringify(tasks)); // Save fetched tasks to local storage
      renderTasks(tasks); 
    }
  }).fail(function () {
    console.error("Failed to load data.json!");
  });

  // Handle form submission
  $("#taskForm").submit(function (event) {
    event.preventDefault();

    let task = {
      taskName: $("#taskName").val(),
      timeSpent: $("#timeSpent").val(),
      deadline: $("#deadline").val(),
      type: $("#type").val()
    };

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks(tasks);

    // Clear the form
    $("#taskForm")[0].reset();
  });

  function renderTasks(data) {
    let tableBody = $("#taskTableBody");
    tableBody.empty();

    data.forEach((item, index) => {
      let deadlineDate = new Date(item.deadline);
      let formattedDate = deadlineDate.toLocaleDateString('en-UK', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      });

      let row = `
        <tr>
          <td>${item.taskName}</td>
          <td>${item.timeSpent}</td>
          <td>${formattedDate}</td>
          <td>${item.type}</td>
          <td>
            <button class="btn btn-danger btn-sm delete-task" data-index="${index}">Delete</button>
          </td>
        </tr>
      `;
      tableBody.append(row);
    });

    // Add event listener for delete buttons
    $(".delete-task").click(function () {
      let index = $(this).data("index");
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks(tasks);
    });
  }
});