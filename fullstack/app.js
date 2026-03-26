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
            <td>
                <button class="btn btn-sm btn-primary"><i class="bi bi-pencil-fill"></i></button>
                <button class="btn btn-sm btn-danger" onclick="deleteTask(${task.id})"><i class="bi bi-trash-fill"></i></button>
            </td>
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

    const newTask = {
        title: title,
        priority: priority
    };

    try {
        const response = await fetch(API_URL,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        });

        if (response.ok) {
            fetchTasks();
            alert('Task added successfully!');
            taskForm.reset();
        }
    } catch (error) {
        console.error('Error adding task:', error.message);
    }
});

window.deleteTask = async (id) => {
    try {
        const response = await fetch(`${API_URL}${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            fetchTasks();
            alert('Task deleted successfully!');
        }
    } catch (error) {
        console.error('Error deleting task:', error.message);
    }
};

// Call to fetch function
fetchTasks();