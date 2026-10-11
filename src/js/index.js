import "../css/styles.css";
import { createTodos } from "./create-todos.js"
import { createProjects } from "./create-projects.js"
import { getActiveProject, setActiveProject } from "./appState.js";
import { renderProjectElements, renderTodoElements, renderAllTodoElements } from "./DOMbuilder.js";
import { removeProjects, removeTodos } from "./storage.js";


function setupEventListeners() { 
    const getContentSidebar = document.querySelector(".content-sidebar")
    const getProjectSubmitBtn = document.querySelector(".project-submit-btn"); 
    const getFormSubmitBtn = document.querySelector(".submit-form-btn"); 
    const getTodosContainer = document.getElementById("my-todos-container");
    const getProjectContaienr = document.getElementById("my-projects-container"); 
    const getProjectTitle = document.querySelector(".project-title"); 

    document.addEventListener("DOMContentLoaded", () => { 
        setActiveProject("All Tasks"); 
        renderAllTodoElements(); 
        renderProjectElements(); 
    });

    getProjectSubmitBtn.addEventListener('click', (e) => { 
        e.preventDefault() 
        const getProjectInput = document.getElementById("project-name").value; 
        setActiveProject(getProjectInput);
        getProjectTitle.textContent = getActiveProject();
        createProjects(getProjectInput);
        getTodosContainer.innerHTML = "";
        getProjectContaienr.innerHTML = ""; 
        renderProjectElements();
        
    }); 

    getFormSubmitBtn.addEventListener('click', (e) => { 
        e.preventDefault() 
        const getTodoTitle = document.getElementById("todo-title").value; 
        const getTodoNotes = document.getElementById("todo-notes").value;
        const getTodoDueDate = document.getElementById("todo-due-date").value; 
        const getTodoPriority = document.getElementById("todo-priority").value;
        createTodos(getTodoTitle, getTodoNotes, getTodoDueDate, getTodoPriority);

        getTodosContainer.innerHTML = ""; 
        renderTodoElements(getActiveProject())

    });

    getTodosContainer.addEventListener('click', (e) => { 
        const getTodoRemoveBtn = e.target.closest('.todo-remove-btn');
        
        if (!getTodoRemoveBtn) return 

        const getTodoId = getTodoRemoveBtn.dataset.todoId; 
        removeTodos(getTodoId);
        getTodosContainer.innerHTML = "";
        getActiveProject() === "All Tasks" ? renderAllTodoElements() : renderTodoElements(getActiveProject());
    });

    getProjectContaienr.addEventListener('click', (e) => { 
        const getProjectRemoveBtn = e.target.closest('.remove-project-btn'); 
        if (!getProjectRemoveBtn) return; 

        const getProjectId = getProjectRemoveBtn.dataset.projectId; 
        removeProjects(getProjectId); 
        getProjectContaienr.innerHTML = ""; 
        getTodosContainer.innerHTML = "";
        renderProjectElements()
    });
    
    getContentSidebar.addEventListener('click', (e) => { 

        if (e.target.classList.contains('project-btn')) {
            getTodosContainer.innerHTML = "";
            renderTodoElements(e.target.textContent); 
            setActiveProject(e.target.textContent);
            getProjectTitle.textContent = getActiveProject();
        };

        if (e.target.classList.contains('all-tasks-btn')) { 
            getTodosContainer.innerHTML = ""; 
            setActiveProject("All Tasks"); 
            renderAllTodoElements();
        };

    });

};

setupEventListeners()