import {getProjectStorage, findTodos} from "./storage.js";

function createProjectElement(projectName, projectId) { 
    // Set up Project Element With Styles
};

function createTodoElement(title, notes, dueDate, priority, todoId) { 
    // Set up Todo Element With Styles
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