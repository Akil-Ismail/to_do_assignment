function openAdd() {
  document.getElementById("add").style.display = "block";
}

function closeAdd() {
  document.getElementById("add").style.display = "none";
}

var filteredTodo = [];
var activeTab = "all";
var todo = JSON.parse(localStorage.getItem("todo")) || [];
window.onload = function () {
  renderList();
};

function toggleActiveTab(tab) {
  activeTab = tab;
  var all = document.getElementById("all-todo");
  var completed = document.getElementById("completed-todo");
  var pending = document.getElementById("pending-todo");
  switch (tab) {
    case "all":
      all.className = "nav-item active";
      completed.className = "nav-item";
      pending.className = "nav-item";
      break;
    case "completed":
      all.className = "nav-item";
      completed.className = "nav-item active";
      pending.className = "nav-item";
      break;
    case "pending":
      all.className = "nav-item";
      completed.className = "nav-item";
      pending.className = "nav-item active";
      break;
  }
  renderList();
}

var id = JSON.parse(localStorage.getItem("id")) || 1;
function addToList() {
  var input = document.getElementById("textInput");
  todo.push({ id: id, text: input.value, status: "Pending" });
  id++;
  localStorage.setItem("id", id);
  localStorage.setItem("todo", JSON.stringify(todo));
  renderList();
  input.value = "";
  document.getElementById("add").style.display = "none";
}

function renderList() {
  var storedList = todo;
  switch (activeTab) {
    case "all":
      filteredTodo = storedList;
      break;
    case "completed":
      filteredTodo = storedList.filter(
        (item) => item.status.toLowerCase() == "completed"
      );
      break;
    case "pending":
      filteredTodo = storedList.filter(
        (item) => item.status.toLowerCase() == "pending"
      );
      break;
  }
  const container = document.getElementById("todo");
  container.innerHTML = null;
  filteredTodo.forEach((item) => {
    // Create a new div
    const itemDiv = document.createElement("div");
    itemDiv.className = "todo-item"; // optional class

    // Set its content
    itemDiv.innerHTML = `
  <div class="item-left">
    <p><strong>Status:</strong> ${item.status}</p>
    <p>${item.text}</p>
  </div>
  <div class="item-right">
    <button class="delete-button" onclick="deleteTask(${
      item.id
    })">Delete</button>
    ${
      item.status.toLowerCase() === "pending"
        ? `<button class="toggle-button" onclick="toggleTaskStatus(${item.id})">Mark Complete</button>`
        : `<button class="toggle-button" onclick="toggleTaskStatus(${item.id})">Mark Pending</button>`
    }
  </div>
`;
    // Append to container
    container.appendChild(itemDiv);
  });
}
function deleteTask(id) {
  var item = todo.find((item) => item.id === id);
  todo.splice(todo.indexOf(item), 1);
  localStorage.setItem("todo", JSON.stringify(todo));
  console.log("todo", todo);
  renderList();
}
function toggleTaskStatus(id) {
  var item = todo.find((item) => item.id === id);
  if (item.status.toLowerCase() == "pending") item.status = "Completed";
  else item.status = "Pending";

  console.log("todo", todo);
  localStorage.setItem("todo", JSON.stringify(todo));
  renderList();
}
