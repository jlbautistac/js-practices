const API_URL = 'http://localhost:3000/api/tasks/';

// CORS = Cross-Origin Resource Sharing

let toDoList = [];

// Fetch tasks from the API
async function fetchTasks() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        toDoList = data;
        console.log('Fetched tasks:', toDoList);
        renderTasks();
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

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


// Call to fetch function
fetchTasks();