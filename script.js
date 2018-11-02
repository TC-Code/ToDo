const btnAddTask = document.querySelector('.btn-add-task');
const btnDeleteTask = document.querySelector('.delete-task');
const input = document.querySelector('input');
const inputSearch = document.querySelector('.search-task');
const taskNumber = document.querySelector('h1 span');
const singleTask = document.querySelector('.single-task');
const taskList = document.querySelector('.task-list');
const taskItem = document.getElementsByClassName('li.task');
const toDoList = [];

const removeTask = (e) => {
  const index = e.target.parentNode.dataset.key;
  toDoList.splice(index, 1);
  taskNumber.textContent = toDoList.length;
  tasksToDoNumber();
  renderList();
}

const AddTask = (e) => {
  e.preventDefault();
  const taskTitle = input.value;
  if (taskTitle === '') return;
  const listItem = document.createElement('li');
  listItem.classList.add('task');
  listItem.innerHTML = `<i class="dot far fa-dot-circle"></i>${taskTitle}<i class="delete-task fas fa-trash-alt"></i>`;
  toDoList.push(listItem);
  renderList();
  taskList.appendChild(listItem);
  input.value = '';
  taskNumber.style.backgroundColor = '#a4c2d6';
  taskNumber.style.paddingLeft = '12px';
  taskNumber.style.paddingRight = '12px';
  taskNumber.textContent = toDoList.length;
  tasksToDoNumber();
  listItem.querySelector('.delete-task').addEventListener('click', removeTask);
}
btnAddTask.addEventListener('click', AddTask);

const renderList = () => {
  taskList.textContent = '';
  toDoList.forEach((toDoElement, key) => {
    toDoElement.dataset.key = key;
    taskList.appendChild(toDoElement);
  });
}

const tasksToDoNumber = () => {
  if (taskNumber.textContent === '1') {
    singleTask.textContent = 'task';
  } else {
    singleTask.textContent = 'tasks';
  }
}

const searchTask = (e) => {
  const searchText = e.target.value.toLowerCase();
  let tasksList = [...toDoList];
  tasksList = tasksList.filter(li => li.textContent.toLocaleLowerCase().includes(searchText));
  taskList.textContent = "";
  tasksList.forEach(li => taskList.appendChild(li));
}
inputSearch.addEventListener('input', searchTask);