$(document).ready(function () {
  let tasks = []; 

  $.getJSON("data/data.json", function (data) {
    tasks = data; 
    renderTasks(tasks); 
  }).fail(function () {
    console.error("Failed to load data.json!");
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
            <button class="btn btn-primary btn-sm edit-btn" data-index="${index}">Edit</button>
          </td>
        </tr>`;
      tableBody.append(row);
    });

    $(".edit-btn").click(function () {
      let index = $(this).data("index");
      let task = tasks[index];

      $("#taskName").val(task.taskName);
      $("#timeSpent").val(task.timeSpent);
      $("#deadline").val(task.deadline);
      $("#type").val(task.type);

      $("#taskIndex").val(index);
    });
  }

  $("#taskForm").submit(function(event) {
    event.preventDefault();

    let index = $("#taskIndex").val();
    let newTask = {
      taskName: $("#taskName").val(),
      timeSpent: $("#timeSpent").val(),
      deadline: $("#deadline").val(),
      type: $("#type").val()
    };

    if (index === "") {
      tasks.push(newTask);
    } else {
      tasks[index] = newTask;
    }

    renderTasks(tasks);

    this.reset();
    $("#taskIndex").val("");
  });
});
