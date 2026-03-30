const API_URL = 'http://localhost:3000/api/tasks/';
// const API_URL = `${window.location.protocol}//${window.location.hostname}:3000/api/tasks/`;

let toDoList = [];
let editTaskModal;

const showToast = (message, type = 'success') => {
    const toastEl = document.getElementById('appToast');
    const toastMsg = document.getElementById('appToastMessage');
    toastEl.className = `toast align-items-center text-bg-${type} border-0`;
    toastMsg.textContent = message;
    bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 3500 }).show();
};

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
                <button class="btn btn-sm btn-primary" onclick="openEditTaskModal(${task.id})"><i class="bi bi-pencil-fill"></i></button>
                <button class="btn btn-sm btn-danger" onclick="deleteTask(${task.id})"><i class="bi bi-trash-fill"></i></button>
            </td>
        `;
        tasksList.appendChild(row);
    });
}

window.openEditTaskModal = (id) => {
    const task = toDoList.find(item => item.id === id);

    if (!task) {
        return;
    }

    document.getElementById('edit-task-id').value = task.id;
    document.getElementById('edit-task-title').value = task.title;
    document.getElementById('edit-task-priority').value = task.priority;
    document.getElementById('edit-task-completed').checked = Boolean(task.isCompleted);

    editTaskModal.show();
};

// Send new task info for saving it
const taskForm = document.getElementById('task-form');
taskForm.addEventListener('submit', async (event) =>{
    event.preventDefault();
    const title = document.getElementById('task-title').value.trim();
    const priority = document.getElementById('task-priority').value;

    if (!title) {
        showToast('El campo "Task" no puede estar vacío.', 'warning');
        return;
    }

    const newTask = {
        title,
        priority
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
            showToast('Task added successfully!');
            taskForm.reset();
        } else {
            const data = await response.json();
            showToast(data.error || 'Error adding task.', 'danger');
        }
    } catch (error) {
        console.error('Error adding task:', error.message);
        showToast('Could not connect to the server.', 'danger');
    }
});

window.deleteTask = async (id) => {
    try {
        const response = await fetch(`${API_URL}${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            fetchTasks();
            showToast('Task deleted successfully!');
        } else {
            const data = await response.json();
            showToast(data.error || 'Error deleting task.', 'danger');
        }
    } catch (error) {
        console.error('Error deleting task:', error.message);
        showToast('Could not connect to the server.', 'danger');
    }
};

const editTaskForm = document.getElementById('edit-task-form');
editTaskForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const id = document.getElementById('edit-task-id').value;
    const title = document.getElementById('edit-task-title').value;
    const priority = document.getElementById('edit-task-priority').value;
    const isCompleted = document.getElementById('edit-task-completed').checked;

    const updatedTask = {
        title,
        priority,
        isCompleted
    };

    try {
        const response = await fetch(`${API_URL}${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
        });

        if (response.ok) {
            await fetchTasks();
            editTaskModal.hide();
            showToast('Task updated successfully!');
        } else {
            const data = await response.json();
            showToast(data.error || 'Error updating task.', 'danger');
        }
    } catch (error) {
        console.error('Error updating task:', error.message);
        showToast('Could not connect to the server.', 'danger');
    }
});

const editTaskModalElement = document.getElementById('editTaskModal');
editTaskModal = new bootstrap.Modal(editTaskModalElement);

// Call to fetch function
fetchTasks();