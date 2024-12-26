//!---------------ToDo App--------------
const taskInput = document.querySelector('.taskInput'),
	addTaskBtn = document.querySelector('.addTaskBtn'),
	taskList = document.querySelector('.taskList');

document.addEventListener('DOMContentLoaded', loadTasks)

// Add tasks
addTaskBtn.addEventListener('click', () => {
	const taskText = taskInput.value.trim();
	if (taskText === '') return;

	addTaskToList(taskText);
	saveTaskToLocalStorage(taskText);

	taskInput.value = '';
});

// Function for adding a task to the list
function addTaskToList(taskText) {
	const textItem = document.createElement('li')
	textItem.textContent = taskText;

	const removeTaskBtn = document.createElement('button')
	removeTaskBtn.textContent = 'Remove';

	textItem.appendChild(removeTaskBtn);
	taskList.appendChild(textItem);

	removeTaskBtn.addEventListener('click', () => {
		textItem.remove();
		removeTaskFromLocalStorage(taskText);
	});
};

// Save the task in localStorage
function saveTaskToLocalStorage(taskText) {
	let tasks = getTasksFromLocalStorage();
	tasks.push(taskText);
	localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Get an array of tasks from localStorage
function getTasksFromLocalStorage() {
	let tasks = localStorage.getItem('tasks');
	return tasks ? JSON.parse(tasks) : [];
};

// Loading tasks from localStorage
function loadTasks() {
	let tasks = getTasksFromLocalStorage();
	tasks.forEach((task) => addTaskToList(task));
};

// Remove a task from localStorage
function removeTaskFromLocalStorage(taskText) {
	let tasks = getTasksFromLocalStorage();
	tasks = tasks.filter((task) => task !== taskText);
	localStorage.setItem('tasks', JSON.stringify(tasks));
};
