const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = [];
let editIndex = null;

if (!localStorage.getItem("user")) {
    localStorage.setItem("user", JSON.stringify({
        username: "admin",
        password: "1234"
    }));
}

const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {
    loginBtn.addEventListener("click", function () {
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const errorMsg = document.getElementById("errorMsg");

        const user = JSON.parse(localStorage.getItem("user"));

        if (username === user.username && password === user.password) {
            localStorage.setItem("logged", "true");
            window.location.href = "index.html";
        } else {
            errorMsg.textContent = "Usuario o contraseña incorrectos";
        }
    });
}

if (window.location.pathname.includes("index.html")) {
    if (localStorage.getItem("logged") !== "true") {
        window.location.href = "login.html";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();
    }
});

function saveToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = "task-item";

        li.innerHTML = `
            <div class="task-info">
                <strong>${task.title}</strong>
                <p>${task.description}</p>
            </div>
            <div class="task-actions">
                <button class="btn-edit" onclick="loadTaskToEdit(${index})">Editar</button>
                <button class="btn-delete" onclick="deleteTask(${index})">Eliminar</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

if (addBtn) {
    addBtn.addEventListener("click", () => {
        const title = taskTitle.value.trim();
        const description = taskDescription.value.trim();

        if (title === "" || description === "") {
            alert("Completa todos los campos");
            return;
        }

        if (editIndex === null) {
            tasks.push({ title, description });
        } else {
            tasks[editIndex].title = title;
            tasks[editIndex].description = description;
            editIndex = null;
            addBtn.textContent = "Agregar Tarea";
        }

        saveToLocalStorage();
        renderTasks();
        clearForm();
    });
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveToLocalStorage();
    renderTasks();
}

function loadTaskToEdit(index) {
    taskTitle.value = tasks[index].title;
    taskDescription.value = tasks[index].description;
    editIndex = index;
    addBtn.textContent = "Actualizar Tarea";
}

function clearForm() {
    taskTitle.value = "";
    taskDescription.value = "";
}
