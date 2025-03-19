let ToDoList = JSON.parse(localStorage.getItem("ToDoList")) || [];

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("popup").style.display = "none";
  Displaycontainer();
});

function openPopup() {
  document.getElementById("popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

function addToDo() {
  let inputElement = document.querySelector("#ToDo-input");
  let dateElement = document.querySelector("#ToDo-date");
  let timeElement = document.querySelector("#ToDo-time");
  let priorityElement = document.querySelector("#ToDo-priority");  // Fixed: Correctly fetching priority
  let categoryElement = document.querySelector("#ToDo-category");  // Fixed: Correctly fetching category

  let ToDoItem = inputElement.value.trim();
  let ToDoDate = dateElement.value;
  let ToDoTime = timeElement.value;
  let ToDoPriority = priorityElement.options[priorityElement.selectedIndex].value; // Fixed: Getting selected value
  let ToDoCategory = categoryElement.options[categoryElement.selectedIndex].value; // Fixed: Getting selected value

  if (ToDoItem !== "" && ToDoDate !== "" && ToDoTime !== "") {
    ToDoList.push({
      task: ToDoItem,
      date: ToDoDate,
      time: ToDoTime,
      priority: ToDoPriority,
      category: ToDoCategory
    });
    console.log(ToDoList);

    localStorage.setItem("ToDoList", JSON.stringify(ToDoList));
    
    inputElement.value = "";
    dateElement.value = "";
    timeElement.value = "";
    priorityElement.selectedIndex = 1;  // Default to Medium
    categoryElement.selectedIndex = 0;  // Default to Work

    closePopup();
    Displaycontainer();
  } else {
    alert("Please fill in all fields!");
  }
}

function Displaycontainer() {
  let displayElement = document.querySelector(".todo-container");

  const priorityOrder = { "High": 1, "Medium": 2, "Low": 3 };

  let today = new Date().toISOString().split("T")[0];

  ToDoList.sort((a, b) => {
    let dateA = new Date(a.date);
    let dateB = new Date(b.date);

    let dateDiff = dateA - dateB;
    if (dateDiff !== 0) return dateDiff;

    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  let newHTML = '';

  for (let index = 0; index < ToDoList.length; index++) {
    newHTML += `
    <div class="task-item priority-${ToDoList[index].priority.toLowerCase()}">
      <span class="todo-input">${ToDoList[index].task}</span>
      <span class="todo-date">${ToDoList[index].date}</span>
      <span class="todo-time">${ToDoList[index].time}</span>
      <span class="todo-category">${ToDoList[index].category}</span>
      <span class="todo-priority">${ToDoList[index].priority}</span>
      <button onclick="removeTask(${index});">
        <img src="https://cdn-icons-png.flaticon.com/128/3405/3405244.png" alt="Delete" width="16" height="16">
      </button>
    </div>
    `;
  }

  displayElement.innerHTML = newHTML;
}


function removeTask(index) {
  ToDoList.splice(index, 1);
  localStorage.setItem("ToDoList", JSON.stringify(ToDoList));
  Displaycontainer();
}
