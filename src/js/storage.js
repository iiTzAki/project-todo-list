import {getActiveProject} from "./appState.js";

const checkProjectsArray = () => {
    if (localStorage.getItem('pulse-projects') === null) { 
        localStorage.setItem('pulse-projects', '[]'); 
    };
};

function getProjectStorage() { 
    const getProjects = localStorage.getItem('pulse-projects'); 
    const getParseProjects =  JSON.parse(getProjects);
    return getParseProjects 
}

function saveTodos(todoTitle, todoNotes, todoDueDate, todoPriority) { 

    const todoData = { 
        todoTitle, 
        todoNotes, 
        todoDueDate, 
        todoPriority
    }; 
    checkProjectsArray()
    const getProjects = getProjectStorage();  
    const targetProject = getProjects.find((val) => val.projectTitle === getActiveProject()); 

    if (targetProject) { 
        targetProject.todos.push(todoData);
    };
    localStorage.setItem('pulse-projects', JSON.stringify(getProjects));

};

function saveProjects(projectTitle) { 

    checkProjectsArray()
    const getProjects = getProjectStorage(); 
    const todoData = {
        projectTitle, 
        todos: [] 
    }; 
    getProjects.push(todoData);
    localStorage.setItem('pulse-projects', JSON.stringify(getProjects));

};

function findTodos(projectTitle) { 

    const getProjects = getProjectStorage();

    if (getProjects === null) return; 

    return getProjects.find((val) => val.projectTitle === projectTitle);

};

export { getProjectStorage, saveTodos, saveProjects, findTodos }