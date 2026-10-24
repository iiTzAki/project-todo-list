import "../css/styles.css";
import { format } from "date-fns"; 
import { createTodos } from "./create-todos.js"
import { createProjects } from "./create-projects.js"
import { getActiveProject, setActiveProject } from "./appState.js";
import { renderProjectElements, renderTodoElements, renderAllTodoElements } from "./DOMbuilder.js";
import { findProject, findTodo, removeProject, removeTodo, updateTodo } from "./storage.js";

function sidebarEventListeners() { 
    const getSidebar = document.getElementById("sidebar"); 
    const getSubMenuBtn = document.querySelector(".dropdown-btn");
    getSubMenuBtn.addEventListener('click', (e) => { 
        e.currentTarget.nextElementSibling.classList.toggle('show'); 
        e.currentTarget.classList.toggle('rotate')

        if (getSidebar.classList.contains('close')) { 
            getSidebar.classList.toggle('close'); 
            getSubMenuBtn.classList.toggle('rotate');       
        };
    }); 


    const getToggleButton = document.getElementById("sidebar-toggle-btn"); 
    getToggleButton.addEventListener('click', () => { 
        getSidebar.classList.toggle('close'); 
        getToggleButton.classList.toggle('rotate');
            
        Array.from(getSidebar.getElementsByClassName('show')).forEach(ul => {   
            ul.classList.remove('show')
        })
    });

};

function dialogsEventListeners() { 
    document.addEventListener('click', (e) => {
        const openBtn = e.target.closest('[data-dialog]'); 
        const closeBtn = e.target.closest('[data-close]'); 
        if (openBtn) { 
            if (openBtn.dataset.dialog === 'create-task-dialog') { 
                document.getElementById('task-date').value = format(new Date(), "yyyy-MM-dd")
            }           
            document.getElementById(openBtn.dataset.dialog).showModal(); 
        } else if (closeBtn) { 
            e.preventDefault()
            document.getElementById(closeBtn.dataset.close).close(); 
        }; 
    });
};

function mainEventListeners() { 
    renderProjectElements()
    renderAllTodoElements()
    const getDate = document.querySelector('.date'); 
    const getTime = document.querySelector('.time');  
    getDate.textContent = format(new Date(), "EEEE, MMMM d");
    getTime.textContent = format(new Date(), "hh:mm a"); 
    
    const getProjectForm = document.getElementById('project-form'); 
    const getTaskForm = document.getElementById('task-form');
    const getEditForm = document.getElementById('edit-task-form'); 
    const getTaskList = document.getElementById('task-list');
    const getMyProjects = document.getElementById('my-projects');
    const getProjectHeading = document.getElementById('task-heading-tag'); 
    
    getProjectForm.addEventListener('submit', (e) => { 

        e.preventDefault()
        const getMyProjects = document.getElementById('my-projects'); 
        const projectTitle = document.getElementById('project-name').value;
        const getProjectId = createProjects(projectTitle); 
        setActiveProject(getProjectId);
        getProjectForm.reset(); 
        document.getElementById('create-project-dialog').close();
        getMyProjects.innerHTML = "";  
        renderProjectElements(); 

    });

    getTaskForm.addEventListener('submit', (e) => { 

        e.preventDefault()
        const taskName = document.getElementById('task-name').value; 
        const taskNotes = document.getElementById('task-notes').value; 
        const taskDueDate = format(document.getElementById('task-date').value, "dd MMMM, yyyy"); 
        const taskPriority = document.querySelector('input[name="task-priority"]:checked')?.value ?? ""; 

        createTodos(taskName, taskNotes, taskDueDate, taskPriority); 
        getTaskForm.reset(); 
        document.getElementById('create-task-dialog').close();
        getTaskList.innerHTML = ""; 
        renderTodoElements(getActiveProject());

    });

    getEditForm.addEventListener('submit', (e) => { 

        e.preventDefault()
        const getTodoId = document.getElementById('edit-todo-id').value; 
        const editTaskName = document.getElementById('edit-task-name').value;
        const editTaskNotes = document.getElementById('edit-task-notes').value;
        const editTaskDate = document.getElementById('edit-task-date').value;
        const editTaskPriority = document.querySelector('input[name="edit-task-priority"]:checked')?.value ?? "";
        
        updateTodo(editTaskName, editTaskNotes, editTaskDate, editTaskPriority, getTodoId);
        getEditForm.reset(); 
        document.getElementById('edit-task-dialog').close();
        getTaskList.innerHTML = ""; 
        renderTodoElements(getActiveProject());

    });

    document.getElementById('sidebar').addEventListener('click', (e) => { 

        if (e.target.closest('.project-btn')) { 
            const projectIdBtn = e.target.closest('.project-btn').dataset.projectId;
            setActiveProject(projectIdBtn); 
            const getProjectTitle = findProject(projectIdBtn).projectTitle;
            getProjectHeading.textContent = getProjectTitle;
            getTaskList.innerHTML = ""; 
            renderTodoElements(projectIdBtn);
        }
        if (e.target.closest('.delete-project-btn')) { 
            const deleteProjectId = e.target.closest('.delete-project-btn').dataset.projectId;
            removeProject(deleteProjectId); 
            getMyProjects.innerHTML = "";
            renderProjectElements();
        
        }


    });

    document.getElementById('task-list').addEventListener('click', (e) => { 
        const getTaskContainer = e.target.closest('.task-container')
        const deleteTaskBtn = e.target.closest('.delete-btn');
        const editTaskBtn = e.target.closest('.edit-btn');

        if(deleteTaskBtn) { 
            removeTodo(getTaskContainer.dataset.todoId); 
            getTaskList.innerHTML = ""; 
            renderTodoElements(getActiveProject())
        } else if (editTaskBtn) { 
            document.getElementById('edit-todo-id').value = getTaskContainer.dataset.todoId; 
            const getTodo = findTodo(getTaskContainer.dataset.todoId);
            document.getElementById('edit-task-name').value = getTodo.todoTitle
            document.getElementById('edit-task-notes').value = getTodo.todoNotes
            document.getElementById('edit-task-date').value = format(getTodo.todoDueDate, "yyyy-MM-dd"); 
            document.querySelector(`input[name="edit-task-priority"][value=${getTodo.todoPriority}]`).checked = true;
        }
    });

};

sidebarEventListeners()
dialogsEventListeners()
mainEventListeners()