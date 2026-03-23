const API_URL = 'http://localhost:3000/api/tasks/';
// const API_URL = `${window.location.protocol}//${window.location.hostname}:3000/api/tasks/`;

let toDoList = [];

// Fetch tasks from the API
async function fetchTasks() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        toDoList = data;
        renderTasks();
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

// Render tasks in the table
const renderTasks = () => {
    const tasksList = document.getElementById('tasks_list');
    tasksList.innerHTML = '';
    toDoList.forEach(task => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${task.id}</td>
            <td>${task.title}</td>
            <td>${task.priority}</td>
            <td>${task.isCompleted}</td>
        `;
        tasksList.appendChild(row);
    });
}

// Send new task info for saving it
const taskForm = document.getElementById('task-form');
taskForm.addEventListener('submit', async (event) =>{
    event.preventDefault();
    const title = document.getElementById('task-title').value;
    const priority = document.getElementById('task-priority').value;
});


// Call to fetch function
fetchTasks();