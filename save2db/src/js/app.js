// API Base URL
const API_URL = 'http://localhost:3000/api/tasks';

// Global State
let todoList = [];

// DOM Elements
const taskForm = document.querySelector('#task-form');
const taskInput = document.querySelector('#task-input');
const priorityInput = document.querySelector('#priority-input');
const taskListContainer = document.querySelector('#task-list');

// --- INITIALIZE: Load tasks from database ---
const loadTasks = async () => {
    try {
        const response = await fetch(API_URL);
        todoList = await response.json();
        renderTasks();
    } catch (error) {
        console.error('Error loading tasks:', error);
        alert('Failed to load tasks from database');
    }
};

// --- 1. CREATE ---
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevents page reload
    
    const newTask = {
        title: taskInput.value,
        priority: priorityInput.value
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        });

        if (response.ok) {
            taskForm.reset(); // Clear fields
            await loadTasks(); // Reload tasks from database
        } else {
            throw new Error('Failed to create task');
        }
    } catch (error) {
        console.error('Error creating task:', error);
        alert('Failed to add task to database');
    }
});

// --- 2. READ (Displaying data) ---
const renderTasks = () => {
    taskListContainer.innerHTML = ''; // Clear current UI

    todoList.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'row g-2 align-items-center';

        let tagPriority = '';
        if (task.priority === 'Low') {
            tagPriority = 'text-bg-success';
        } else if (task.priority === 'Medium') {
            tagPriority = 'text-bg-warning';
        } else if (task.priority === 'High') {
            tagPriority = 'text-bg-danger';
        }
        
        taskDiv.innerHTML = `
            <div class='col-3'>
                <span class="${task.isCompleted ? 'completed' : ''} form-text">
                    <strong>${task.title}</strong> <span class="badge ${tagPriority} ms-2">${task.priority}</span>
                </span>
            </div>
            <div class='col'>
                <button class="btn btn-success btn-sm" onclick="toggleComplete(${task.id})">
                    ${task.isCompleted ? 'Undo' : 'Done'}
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskListContainer.appendChild(taskDiv);
    });
};

// --- 3. UPDATE (Toggle Completion) ---
window.toggleComplete = async (id) => {
    try {
        const task = todoList.find(t => t.id === id);
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ isCompleted: !task.isCompleted })
        });

        if (response.ok) {
            await loadTasks(); // Reload tasks from database
        } else {
            throw new Error('Failed to update task');
        }
    } catch (error) {
        console.error('Error updating task:', error);
        alert('Failed to update task');
    }
};

// --- 4. DELETE ---
window.deleteTask = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            await loadTasks(); // Reload tasks from database
        } else {
            throw new Error('Failed to delete task');
        }
    } catch (error) {
        console.error('Error deleting task:', error);
        alert('Failed to delete task');
    }
};

// Load tasks when page loads
loadTasks();