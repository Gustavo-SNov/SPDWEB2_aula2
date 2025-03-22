const list = [];
const taskList = document.getElementById("taskList");
const bnt = document.getElementById("btnTask");
const inputTask = document.getElementById("taskInput");

document.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

function loadTaskList() {
  taskList.innerHTML = "";

  list.forEach((item) => {
    const task = document.createElement("li");
    task.className = "task";
    task.id = item.id;

    // Botão de Check
    const btnCheck = document.createElement("button");
    btnCheck.className = "btn-check";
    btnCheck.innerHTML = '<i class="fa-solid fa-check"></i>';
    btnCheck.addEventListener("click", () => {
      btnCheck.classList.toggle("checked");
      taskText.classList.toggle("checked");
    });

    // Texto da Tarefa
    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.innerText = item.value;

    // Botão de Remover
    const btnRemoveTask = document.createElement("button");
    btnRemoveTask.className = "btn-remove";
    btnRemoveTask.innerHTML = '<i class="fa-solid fa-trash"></i>';
    btnRemoveTask.addEventListener("click", () => removeTask(item.id));

    task.append(btnCheck);
    task.appendChild(taskText);
    task.append(btnRemoveTask);
    
    taskList.appendChild(task);
  });
}

loadTaskList();

function addTask() {
  const value = inputTask.value.trim();

  const lastTask = list.at(-1);
  let newId = lastTask ? lastTask.id + 1 : 0;
  if (!value) return;

  const newTask = {
    id: newId,
    value: value,
  };

  if (!newTask.value) {
    return null;
  }
  list.push(newTask);
  resetInput();
  loadTaskList();
}

function removeTask(idTask) {
  const index = list.findIndex((item) => item.id === idTask);
  if (index !== -1) {
    list.splice(index, 1);
  }
  loadTaskList();
}

function resetInput() {
  inputTask.value = "";
}
