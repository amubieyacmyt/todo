// Get references to elements
const taskInput = document.getElementById('taskNum');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');

// Function to save tasks to localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.task-item span').forEach(taskContent => {
        tasks.push(taskContent.textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(taskText => {
            addTaskToDOM(taskText);
        });
    }
}

// Function to add a task to the DOM
function addTaskToDOM(taskText) {
    // Create a new task item
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';

    // Add task text
    const taskContent = document.createElement('span');
    taskContent.textContent = taskText;
    taskItem.appendChild(taskContent);

    // Add edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = function() {
        const newTaskText = prompt("Edit your task:", taskContent.textContent);
        if (newTaskText !== null && newTaskText.trim() !== "") {
            taskContent.textContent = newTaskText.trim();
            saveTasks();
        }
    };
    taskItem.appendChild(editButton);

    // Add delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() {
        taskList.removeChild(taskItem);
        saveTasks();
    };
    taskItem.appendChild(deleteButton);

    // Append the task to the task list
    taskList.appendChild(taskItem);
}

// Function to add a task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        addTaskToDOM(taskText);
        saveTasks();  // Save tasks to localStorage
        taskInput.value = ''; // Clear the input
    }
}

// Event listener for the Add Task button
addTaskButton.addEventListener('click', addTask);

// Event listener for pressing Enter key
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Load tasks when the page loads
window.addEventListener('load', loadTasks);
