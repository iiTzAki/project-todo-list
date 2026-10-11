import {getActiveProject} from "./appState.js";

const checkProjectsArray = () => {
    if (getProjectStorage() === null) { 
        localStorage.setItem('pulse-projects', '[]'); 
    };
};

function getProjectStorage() { 
    const getProjects = localStorage.getItem('pulse-projects'); 
    const getParseProjects =  JSON.parse(getProjects);
    return getParseProjects 
}

function saveTodos(todoTitle, todoNotes, todoDueDate, todoPriority, todoId) { 

    const todoData = { 
        todoTitle, 
        todoNotes, 
        todoDueDate, 
        todoPriority,
        todoId,
    }; 
    checkProjectsArray()
    const getProjects = getProjectStorage();  
    const targetProject = getProjects.find((val) => val.projectTitle === getActiveProject()); 

    if (targetProject) { 
        targetProject.todos.push(todoData);
    };
    localStorage.setItem('pulse-projects', JSON.stringify(getProjects));

};

function saveProjects(projectTitle, projectId) { 

    checkProjectsArray()
    const getProjects = getProjectStorage(); 
    const todoData = {
        projectTitle, 
        projectId, 
        todos: [] 
    }; 
    getProjects.push(todoData);
    localStorage.setItem('pulse-projects', JSON.stringify(getProjects));

};

function removeTodos(todoId) { 

    const getProjects = getProjectStorage();
    getProjects.forEach(val => {
        val.todos = val.todos.filter((todo) => todo.todoId !== todoId); 
    });
    localStorage.setItem('pulse-projects', JSON.stringify(getProjects));
    
};

function removeProjects(projectId) { 

    let getProjects = getProjectStorage(); 
    getProjects = getProjects.filter((val) => val.projectId !== projectId);
    localStorage.setItem('pulse-projects', JSON.stringify(getProjects));

};

function findTodos(projectTitle) { 

    const getProjects = getProjectStorage();
    if (getProjects === null) return; 
    return getProjects.find((val) => val.projectTitle === projectTitle);

};

export { 
    getProjectStorage, 
    saveTodos, 
    saveProjects, 
    removeTodos, 
    removeProjects, 
    findTodos 
}