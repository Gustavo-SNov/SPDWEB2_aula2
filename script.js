const list = [];
const taskList = document.getElementById("taskList");
const bnt = document.getElementById("btnTask");
const inputTask = document.getElementById("taskInput");
const checkDone = document.getElementById("check-done");
const checkPending = document.getElementById("check-pendentes");

const filterType = {
  ALL: "ALL",
  DONE: "DONE",
  PENDING: "PENDING",
};
const filter = { value: filterType.ALL };

document.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

loadTaskList(filter);

function loadTaskList(filter = { value: filterType.ALL }) {
  taskList.innerHTML = "";

  const filteredList = list.filter((item) => {
    if (filter.value === filterType.ALL) return true;
    if (filter.value === filterType.PENDING) return !item.done;
    if (filter.value === filterType.DONE) return item.done;
  });

  filteredList.forEach((item) => {
    const task = document.createElement("li");
    task.className = "task";
    task.id = `task-${item.id}`;

    // Botão de Check
    const btnCheck = document.createElement("button");
    btnCheck.className = `btn-check ${item.done ? "checked" : ""}`;
    btnCheck.innerHTML = '<i class="fa-solid fa-check"></i>';
    btnCheck.addEventListener("click", () => doneTask(item));

    // Texto da Tarefa
    const taskText = document.createElement("span");
    taskText.className = `task-text ${item.done ? "checked" : ""}`;
    taskText.innerText = item.value;

    // Botão de Remover
    const btnRemoveTask = document.createElement("button");
    btnRemoveTask.className = "btn-remove";
    btnRemoveTask.innerHTML = '<i class="fa-solid fa-trash"></i>';
    btnRemoveTask.addEventListener("click", () => removeTask(item.id));

    task.append(btnCheck, taskText, btnRemoveTask);
    taskList.appendChild(task);
  });
}

function addTask() {
  const value = inputTask.value.trim();
  if (!value) return;

  const newId = list.length > 0 ? list[list.length - 1].id + 1 : 0;

  const newTask = {
    id: newId,
    value: value,
    done: false,
  };
  list.push(newTask);
  resetInput();
  loadTaskList();
}

function removeTask(idTask) {
  const index = list.findIndex((item) => item.id === idTask);
  if (index !== -1) {
    list.splice(index, 1);
  }
  handleFilter(filter.value);
}

function doneTask(item) {
  item.done = !item.done;
  loadTaskList();
}

function resetInput() {
  inputTask.value = "";
  checkDone.checked = false;
  checkPending.checked = false;
}

function handleFilter(selectedFilter) {
  if (filter.value === selectedFilter) {
    filter.value = filterType.ALL;
    checkDone.checked = false;
    checkPending.checked = false;
  } else {
    filter.value = selectedFilter;
    checkDone.checked = selectedFilter === filterType.DONE;
    checkPending.checked = selectedFilter === filterType.PENDING;
  }
  loadTaskList(filter);
}

checkDone.addEventListener("change", () => {
  handleFilter(filterType.DONE);
});

checkPending.addEventListener("change", () => {
  handleFilter(filterType.PENDING);
});
