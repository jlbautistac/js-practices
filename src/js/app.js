// Global State
let todoList = [];

// DOM Elements
const taskForm = document.querySelector('#task-form');
const taskInput = document.querySelector('#task-input');
const priorityInput = document.querySelector('#priority-input');
const taskListContainer = document.querySelector('#task-list');

// --- 1. CREATE ---
taskForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevents page reload
    
    const newTask = {
        id: Date.now(),
        title: taskInput.value,
        priority: priorityInput.value,
        isCompleted: false
    };

    todoList.push(newTask);
    taskForm.reset(); // Clear fields
    renderTasks();
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
window.toggleComplete = (id) => {
    todoList = todoList.map(task => {
        if (task.id === id) {
            return { ...task, isCompleted: !task.isCompleted };
        }
        return task;
    });
    renderTasks();
};

// --- 4. DELETE ---
window.deleteTask = (id) => {
    // Keep only tasks that DON'T match the ID provided
    todoList = todoList.filter(task => task.id !== id);
    renderTasks();
};