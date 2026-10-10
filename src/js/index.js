import "../css/styles.css";
import {createTodos} from "./create-todos.js"
import {createProjects} from "./create-projects.js"
import {getActiveProject, setActiveProject} from "./appState.js";
import {renderProjectElements, renderTodoElements} from "./DOMbuilder.js";

function setupEventListeners() { 

    renderProjectElements()

    const getProjectSubmitBtn = document.querySelector(".project-submit-btn"); 
    const getFormSubmitBtn = document.querySelector(".submit-form-btn"); 
    const getProjectBtnContainer = document.getElementById("my-projects-container");
    const getTodosContainer = document.getElementById("my-todos-container");
    const getProjectTitle = document.querySelector(".project-title"); 

    getProjectSubmitBtn.addEventListener('click', (e) => { 
        e.preventDefault() 
        const getProjectInput = document.getElementById("project-name").value; 
        setActiveProject(getProjectInput);
        getProjectTitle.textContent = getActiveProject();
        createProjects(getProjectInput);
        getTodosContainer.innerHTML = "";
    }); 

    getFormSubmitBtn.addEventListener('click', (e) => { 
        e.preventDefault() 
        const getTodoTitle = document.getElementById("todo-title").value; 
        const getTodoNotes = document.getElementById("todo-notes").value;
        const getTodoDueDate = document.getElementById("todo-due-date").value; 
        const getTodoPriority = document.getElementById("todo-priority").value;
        createTodos(getTodoTitle, getTodoNotes, getTodoDueDate, getTodoPriority)

    })
    
    getProjectBtnContainer.addEventListener('click', (e) => { 

        if(!e.target.classList.contains('project-btn')) return; 
        getTodosContainer.innerHTML = "";
        renderTodoElements(e.target.textContent); 
        setActiveProject(e.target.textContent);
        getProjectTitle.textContent = getActiveProject();

    });

};

setupEventListeners()