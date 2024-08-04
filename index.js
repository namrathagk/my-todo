document.addEventListener('DOMContentLoaded', () => {
    const saveTasksBtn = document.getElementById('saveTasksBtn');
    if (saveTasksBtn) {
        saveTasksBtn.addEventListener('click', saveTasks);
    }

    loadTasks();
});

function addTask() {
    const taskInput = document.querySelector('.txt');
    const taskText = taskInput.value;

    if (taskText !== '') {
        const taskList = document.querySelector('.taskList');
        const newTask = document.createElement('li');
        newTask.innerHTML = `
            <span>${taskText}</span>
            <input type="checkbox" onclick="toggleTask(this)">
            <button class="remove" onclick="removeTask(this)">Remove</button>
        `;
        taskList.appendChild(newTask);
        taskInput.value = '';
    }
}

function saveTasks() {
    const taskList = document.querySelector('.taskList');
    const tasks = [];

    taskList.querySelectorAll('li').forEach(taskItem => {
        const taskText = taskItem.querySelector('span').textContent;
        tasks.push(taskText);
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = getTasksFromLocalStorage();
    const taskList = document.querySelector('.taskList');
    tasks.forEach(taskText => {
        const newTask = document.createElement('li');
        newTask.innerHTML = `
            <span>${taskText}</span>
            <input type="checkbox" onclick="toggleTask(this)">
            <button class="remove" onclick="removeTask(this)">Remove</button>
        `;
        taskList.appendChild(newTask);
    });
}

function getTasksFromLocalStorage() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function removeTask(button) {
    const task = button.parentNode;
    const taskText = task.querySelector('span').textContent;
    task.parentNode.removeChild(task);
    removeTaskFromLocalStorage(taskText);
}

function removeTaskFromLocalStorage(taskText) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function toggleTask(checkbox) {
    const task = checkbox.parentNode;
    const taskText = task.querySelector('span');

    if (checkbox.checked) {
        taskText.style.textDecoration = 'line-through';
    } else {
        taskText.style.textDecoration = 'none';
    }
}
