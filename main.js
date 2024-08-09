// Get references to elements
const taskInput = document.getElementById('taskNum');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');

// Function to add a task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
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
            }
        };
        taskItem.appendChild(editButton);

        // Add delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
            taskList.removeChild(taskItem);
        };
        taskItem.appendChild(deleteButton);

        // Append the task to the task list
        taskList.appendChild(taskItem);

        // Clear the input
        taskInput.value = '';
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
