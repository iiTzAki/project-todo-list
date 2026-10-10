import {getProjectStorage, findTodos} from "./storage.js";

function createProjectElement(projectName) { 

    const getProjectsContainer = document.getElementById("my-projects-container");
    const newProjectBtn = document.createElement('button'); 
    newProjectBtn.className = "project-btn"
    newProjectBtn.textContent = projectName; 

    getProjectsContainer.appendChild(newProjectBtn); 

};

function createTodoElement(title, notes, dueDate, priority) { 

    const getTodosContainer = document.getElementById("my-todos-container");
    const newTodoWrapper = document.createElement("div"); 
    const todoHeading = document.createElement('h2'); 
    const todoPara = document.createElement('p');
    const todoDueDate = document.createElement('p'); 
    const todoPriority = document.createElement('p');

    todoHeading.textContent = title;
    todoPara.textContent = notes;
    todoDueDate.textContent = dueDate;
    todoPriority.textContent = priority;  
    newTodoWrapper.append(todoHeading, todoPara, todoDueDate, todoPriority);
    getTodosContainer.appendChild(newTodoWrapper); 


};

function renderProjectElements() { 

    const getProjectsContainer = document.getElementById("my-projects-container");
    const getProjects = getProjectStorage(); 

    if (getProjects === null) return;

    getProjects.forEach(project => {
        const newProjectBtn = document.createElement("button"); 
        newProjectBtn.className = "project-btn"; 
        newProjectBtn.textContent = project.projectTitle; 
        getProjectsContainer.appendChild(newProjectBtn);
    });

}

function renderTodoElements(projectTitle) { 

    const searchTodos = findTodos(projectTitle)
    if(!searchTodos) return;

    const todoData = searchTodos.todos; 
    todoData.forEach(val => {
        createTodoElement(
            val.todoTitle,
            val.todoNotes,
            val.todoDueDate,
            val.todoPriority
        );
    });

};

export { createProjectElement, createTodoElement, renderProjectElements, renderTodoElements }