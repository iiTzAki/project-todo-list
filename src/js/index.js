import "../css/styles.css";
import { format } from "date-fns"; 
import { Task } from "./tasks.js"
import { Project } from "./projects.js"
import { Store } from "./storage.js"
import { renderProjectElements, renderTaskElements } from "./DOMbuilder.js";
import { setActiveProject, getActiveProject } from "./appState.js"

const pulseStore = new Store(); // Start Storage 
const renderAllElements = (projects) => { 
    renderProjectElements(projects);
    const project = pulseStore.findProject(getActiveProject());
    if (!project) return; 
    renderTaskElements(project.tasks);
};
const updateHeading = () => { 
    const project = pulseStore.findProject(getActiveProject()); 
    if (!project) return; 
    document.getElementById('task-heading-tag').textContent = project.title; 
};

function init() {  

    // App Start Up 
    pulseStore.loadProjects();
    pulseStore.ensureDefaultProject();
    updateHeading();
    renderAllElements(pulseStore.projects);


    // Form Elements
    const getCreateProjectForm = document.getElementById("project-form");
    const getCreateTaskForm = document.getElementById("task-form"); 
    const getEditTaskForm = document.getElementById("edit-task-form"); 

    // Elements 
    const getSidebar = document.getElementById("sidebar");   
    const getTaskList = document.getElementById("task-list"); 


    // Event Listeners
    getSidebar.addEventListener('click', (e) => {
        const getProjectBtn = e.target.closest('.project-btn');
        const getDeleteProjectBtn = e.target.closest('.delete-project-btn'); 

        // Select Project 
        if (getProjectBtn) { 
            const getProjectId = e.target.closest('.project-action-buttons').querySelector('[data-project-id]').dataset.projectId;
            setActiveProject(getProjectId);
            updateHeading();
            renderAllElements(pulseStore.projects);
        }
        // Delete Project
        else if (getDeleteProjectBtn) { 
            const getProjectId = e.target.closest('.project-action-buttons').querySelector('[data-project-id]').dataset.projectId;
            setActiveProject("default")
            // To Catch if the Project didn't delete. 
            try { 
                pulseStore.removeProject(getProjectId);
            } catch { 
                console.warn("The Project Cannot Be Deleted.");
                return; 
            }; 
            pulseStore.saveProjects();
            updateHeading();
            renderAllElements(pulseStore.projects); 
        }; 

    });

    getTaskList.addEventListener('click', (e) => { 

        const getTaskDeleteBtn = e.target.closest('.delete-btn'); 
        const getTaskEditBtn = e.target.closest('.edit-btn'); 
        const getTaskId = e.target.closest('[data-todo-id]');

        // Delete Task
        if (getTaskDeleteBtn) { 
            const getTaskId = e.target.closest('[data-todo-id]').dataset.todoId; 

            // Get Current Project
            const getCurrentProject = pulseStore.findProject(getActiveProject());
            if (!getCurrentProject) { 
                console.warn("Current Project Not Found.")
                return
            }

            // Remove And Save
            getCurrentProject.removeTask(getTaskId);  
            pulseStore.saveProjects()

            renderTaskElements(getCurrentProject.tasks);
        }
        // Update Task
        else if (getTaskEditBtn) { 
            document.getElementById('edit-todo-id').value = getTaskId.dataset.todoId;

            const getCurrentProject = pulseStore.findProject(getActiveProject()); 
            if (!getCurrentProject) { 
                console.warn("Current Project Not Found.")
            };

            // Get Task And Grab Inputs 
            const getTask = getCurrentProject.findTask(getTaskId.dataset.todoId); 
            document.getElementById('edit-task-name').value = getTask.title
            document.getElementById('edit-task-notes').value = getTask.notes
            document.getElementById('edit-task-date').value = format(getTask.dueDate, "yyyy-MM-dd"); 
            try { 
                document.querySelector(`input[name="edit-task-priority"][value=${getTask.taskPriority}]`).checked = true;
            } catch { 
                document.querySelectorAll('input[name="edit-task-priority"]').forEach(radio => {
                    radio.disabled = true; 
                });
            };
        };

    });

    sidebarEventListeners();
    dialogsEventListeners();    

    // Submit Listeners

    // Create Project Form
    getCreateProjectForm.addEventListener('submit', (e) => { 
        e.preventDefault()
        const getProjectName = document.getElementById("project-name").value; // Grab Input

        // Creating and Saving Project Instance 
        const newProject = new Project(getProjectName); 
        pulseStore.addProject(newProject); 
        pulseStore.saveProjects();

        renderAllElements(pulseStore.projects);
        getCreateProjectForm.reset();
        document.getElementById("create-project-dialog").close(); 
    }); 

    // Create Task Form
    getCreateTaskForm.addEventListener('submit', (e) => { 
        e.preventDefault()
        // Grab Inputs 
        const getTaskName = document.getElementById('task-name').value; 
        const getTaskNotes = document.getElementById('task-notes').value; 
        const getDueDate = document.getElementById('task-date').value; 
        const getTaskPriority = document.querySelector('[name="task-priority"]:checked').value;
        
        // Creating and Saving Task Insance 
        const newTask = new Task(getTaskName, getTaskNotes, getDueDate, getTaskPriority);
        const getCurrentProject = pulseStore.findProject(getActiveProject()); 
        if(!getCurrentProject) { 
            console.warn("Project Not Found.");
            return;
        }; 
        getCurrentProject.addTask(newTask);
        pulseStore.saveProjects();

        renderTaskElements(getCurrentProject.tasks); 
        getCreateTaskForm.reset(); 
        document.getElementById('create-task-dialog').close();
    });

    // Edit Task Form 
    getEditTaskForm.addEventListener('submit', (e) => { 
        e.preventDefault() 
        // Grab Inputs to set to task values 
        const getTodoId = document.getElementById('edit-todo-id').value; 
        const getEditTaskName = document.getElementById('edit-task-name').value;
        const getEditTaskNotes = document.getElementById('edit-task-notes').value;
        const getEditTaskDate = document.getElementById('edit-task-date').value;
        const getEditTaskPriority = document.querySelector('input[name="edit-task-priority"]:checked')?.value ?? "";

        // Get Current Project 
        const getCurrentProject = pulseStore.findProject(getActiveProject()); 
        if(!getCurrentProject) { 
            console.warn("Current Project Not Found."); 
            return;
        };

        // Find Task 
        const getTask = getCurrentProject.findTask(getTodoId);
        if(!getTask) return;
        
        // Update and Save Task 
        getTask.updateTask(getEditTaskName, getEditTaskNotes, getEditTaskDate, getEditTaskPriority);
        pulseStore.saveProjects();

        renderTaskElements(getCurrentProject.tasks); 
        document.getElementById('edit-task-dialog').close();
    });

};

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

init()