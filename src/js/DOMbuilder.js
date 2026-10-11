import {getProjectStorage, findTodos} from "./storage.js";

function createProjectElement(projectName, projectId) { 

    const getProjectsContainer = document.getElementById("my-projects-container");

    const projectWrapper = document.createElement("div"); 
    const newProjectBtn = document.createElement("button");
    const removeProjectBtn = document.createElement("button"); 
    removeProjectBtn.textContent = "X";  
    removeProjectBtn.className = "remove-project-btn";
    removeProjectBtn.setAttribute("data-project-id", projectId)
    newProjectBtn.className = "project-btn"; 
    newProjectBtn.textContent = projectName; 
    projectWrapper.append(newProjectBtn, removeProjectBtn);
    getProjectsContainer.appendChild(projectWrapper)  

};

function createTodoElement(title, notes, dueDate, priority, todoId) { 

    const getTodosContainer = document.getElementById("my-todos-container");
    const newTodoWrapper = document.createElement("div"); 
    const todoHeading = document.createElement('h2'); 
    const todoPara = document.createElement('p');
    const todoDueDate = document.createElement('p'); 
    const todoPriority = document.createElement('p');
    const removeBtn = document.createElement('button'); 


    todoHeading.textContent = title;
    todoPara.textContent = notes;
    todoDueDate.textContent = dueDate;
    todoPriority.textContent = priority;  
    removeBtn.textContent = "Delete"; 
    removeBtn.className = "todo-remove-btn"; 
    removeBtn.setAttribute("data-todo-id", todoId)
    newTodoWrapper.append(todoHeading, todoPara, todoDueDate, todoPriority, removeBtn);
    getTodosContainer.appendChild(newTodoWrapper); 

};

function renderProjectElements() { 

    const getProjects = getProjectStorage(); 
    if (getProjects === null) return;

    getProjects.forEach(project => {
        createProjectElement(project.projectTitle, project.projectId)
    });

}

function renderTodoElements(projectTitle) { 

    const searchTodos = findTodos(projectTitle)
    if(!searchTodos) return;

    const todoData = searchTodos.todos; 
    todoData.forEach(todo => {
        createTodoElement(
            todo.todoTitle,
            todo.todoNotes,
            todo.todoDueDate,
            todo.todoPriority,
            todo.todoId
        );
    });

};

function renderAllTodoElements() { 
    const getProjects = getProjectStorage(); 
    if(!getProjects) return;
    const allTodos = getProjects.flatMap(project => project.todos);  
    allTodos.forEach(todo => {
        createTodoElement(
            todo.todoTitle,
            todo.todoNotes,
            todo.todoDueDate,
            todo.todoPriority,
            todo.todoId
        );
    });
};

export {
    createProjectElement, 
    createTodoElement, 
    renderProjectElements, 
    renderTodoElements, 
    renderAllTodoElements
}