import {getActiveProject} from "./appState.js";

const checkInitialStorage = () => {
    if (getProjectStorage() === null) { 
        localStorage.setItem('pulse-projects', '[]'); 
    };
    if (getTodoStorage() === null) { 
        localStorage.setItem('pulse-todos', '[]'); 
    };
}

const getProjectStorage = () => { 
    const getProjects = localStorage.getItem('pulse-projects'); 
    const getParseProjects = JSON.parse(getProjects);
    return getParseProjects 
}

const getTodoStorage = () => { 
    const getTodos = localStorage.getItem('pulse-todos'); 
    const getParseTodos = JSON.parse(getTodos); 
    return getParseTodos
}

const findTodos = (projectId) => { 

    const getTodos = getTodoStorage();
    if (getTodos === null) return; 

    if (projectId === null) return getTodos
    return getTodos.filter((val) => val.projectId === projectId);

};

const findProject = (projectId) => { 
    const getProjects = getProjectStorage(); 
    if (getProjects === null) return; 
    return getProjects.find((val) => val.projectId === projectId);
}

// CRUD Functions

function saveTodos(todoTitle, todoNotes, todoDueDate, todoPriority, todoId) { 

    const todoData = { 
        todoTitle, 
        todoNotes, 
        todoDueDate, 
        todoPriority,
        todoId,
        projectId : getActiveProject(), 
    }; 
    checkInitialStorage()
    const getTodos = getTodoStorage();  
    getTodos.push(todoData);
    localStorage.setItem('pulse-todos', JSON.stringify(getTodos));

};

function saveProjects(projectTitle, projectId) { 

    checkInitialStorage()
    const getProjects = getProjectStorage(); 
    const todoData = {
        projectTitle, 
        projectId, 
    }; 
    getProjects.push(todoData);
    localStorage.setItem('pulse-projects', JSON.stringify(getProjects));

};

function removeTodos(todoId) { 

    let getTodos = getTodoStorage();
    getTodos = getTodos.filter((todo) => todo.todoId !== todoId);
    localStorage.setItem('pulse-todos', JSON.stringify(getTodos));
    
};

function removeProjects(projectId) { 

    let getProjects = getProjectStorage(); 
    let getTodos = getTodoStorage();
    getTodos = getTodos.filter((todo) => todo.projectId !== projectId); 
    getProjects = getProjects.filter((project) => project.projectId !== projectId);
    localStorage.setItem('pulse-todos', JSON.stringify(getTodos)); 
    localStorage.setItem('pulse-projects', JSON.stringify(getProjects));

};

export { 
    getProjectStorage, 
    getTodoStorage, 
    saveTodos, 
    saveProjects, 
    removeTodos, 
    removeProjects, 
    findTodos,
    findProject
}