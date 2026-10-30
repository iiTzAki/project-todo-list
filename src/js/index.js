import "../css/styles.css";
import { format } from "date-fns"; 
import { Task } from "./tasks.js"
import { Project } from "./projects.js"
import { Store } from "./storage.js"
import { updateFilterCards, getFilterTodayTasks, getFilterUpcomingTasks, getFilterAnytimeTasks, getFilterCompletedTasks } from "./filters.js";
import { renderProjectElements, renderTaskElements } from "./DOMbuilder.js";
import { enterProjectMode, enterFilterMode, subscribe, setActiveProject, getActiveProject, getActiveViewState, getActiveFilterState } from "./appState.js"

const pulseStore = new Store(); // Start Storage 
const renderFilterCards = () => { 
    const getCurrentProject = pulseStore.findProject(getActiveProject()); 
    if (!getCurrentProject) return;
    
    updateFilterCards(getCurrentProject.tasks)
}
const updateHeading = () => { 
    const project = pulseStore.findProject(getActiveProject()); 
    if (!project) return; 
    document.getElementById('task-heading-tag').textContent = project.title; 
};
const updateDate = () => { 
    const getWeekDayElement = document.querySelector('.week-day');
    const getDateElement = document.querySelector('.date'); 
    getWeekDayElement.textContent = format(new Date(), "cccc,");
    getDateElement.textContent = format(new Date(), "LLLL d") 
}; 
function render() {
    // If Clause for Projects  
    if (getActiveViewState() === "project") {
        const project = pulseStore.findProject(getActiveProject());

        if (!project) return; 
        renderTaskElements(project.tasks);
    }
    // If Clause for Filters
    else if (getActiveViewState() === "filter") {
        const projects = pulseStore.projects; 
        const filterState = getActiveFilterState(); 

        const filterStates = { 
            "today": getFilterTodayTasks, 
            "upcoming": getFilterUpcomingTasks, 
            "anytime": getFilterAnytimeTasks, 
            "completed": getFilterCompletedTasks,
        };
        const tasks = filterStates[filterState](projects);
        renderTaskElements(tasks)
    }; 
};

function init() {  

    // App Start Up 
    pulseStore.loadProjects();
    pulseStore.ensureDefaultProject();
    updateDate();
    renderFilterCards();
    renderProjectElements(pulseStore.projects); 
    setActiveProject("default");
    updateHeading();


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
        const filterBtn = e.target.closest('.filter-btn');

        // Select Project 
        if (getProjectBtn) { 
            const getProjectId = e.target.closest('.project-action-buttons').querySelector('[data-project-id]').dataset.projectId;
            enterProjectMode(getProjectId); 
            updateHeading();
            renderFilterCards();
            renderProjectElements(pulseStore.projects);
        }
        // Delete Project
        else if (getDeleteProjectBtn) { 
            const getProjectId = e.target.closest('.project-action-buttons').querySelector('[data-project-id]').dataset.projectId;
            // To Catch if the Project didn't delete. 
            try { 
                pulseStore.removeProject(getProjectId);
            } catch { 
                console.warn("The Project Cannot Be Deleted.");
                return; 
            }; 
            pulseStore.saveProjects();
            updateHeading();
            renderFilterCards();
            setActiveProject("default");
            renderProjectElements(pulseStore.projects); 
        } 
        else if (filterBtn) { 
            if (filterBtn.dataset.filter === "today") { 
                document.getElementById('task-heading-tag').textContent = "Today"; 
                enterFilterMode(filterBtn.dataset.filter);
            }
            else if (filterBtn.dataset.filter === "upcoming") { 
                document.getElementById('task-heading-tag').textContent = "Upcoming";
                enterFilterMode(filterBtn.dataset.filter);
            }
            else if (filterBtn.dataset.filter === "anytime") { 
                document.getElementById('task-heading-tag').textContent = "Anytime";
                enterFilterMode(filterBtn.dataset.filter);
            }
            else if (filterBtn.dataset.filter === "completed") { 
                document.getElementById('task-heading-tag').textContent = "Completed";
                enterFilterMode(filterBtn.dataset.filter);
            }  
        }       

    });

    getTaskList.addEventListener('click', (e) => { 

        const getTaskDeleteBtn = e.target.closest('.delete-btn'); 
        const getTaskEditBtn = e.target.closest('.edit-btn'); 
        const getTaskToggleBtn = e.target.closest('#task-marker');
        const getTaskIdElement = e.target.closest('[data-todo-id]');

        // Delete Task
        if (getTaskDeleteBtn) { 
            const getTaskId = getTaskIdElement.dataset.todoId; 

            // Get Current Project
            const getCurrentProject = pulseStore.findProject(getActiveProject());
            if (!getCurrentProject) { 
                console.warn("Current Project Not Found.")
                return
            }

            // Remove And Save
            getCurrentProject.removeTask(getTaskId);  
            pulseStore.saveProjects()

            render();
            renderFilterCards();
        }
        // Update Task
        else if (getTaskEditBtn) { 
            document.getElementById('edit-todo-id').value = getTaskIdElement.dataset.todoId;

            const getCurrentProject = pulseStore.findProject(getActiveProject()); 
            if (!getCurrentProject) { 
                console.warn("Current Project Not Found.")
            };

            // Get Task And Grab Inputs 
            const getTask = getCurrentProject.findTask(getTaskIdElement.dataset.todoId); 
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
        } 
        // Toggle Task
        else if (getTaskToggleBtn) {  
            const getTaskId = getTaskIdElement.dataset.todoId;

            // Get Current Project
            const getCurrentProject = pulseStore.findProject(getActiveProject()); 
            if (!getCurrentProject) return; 

            // Get Task and Toggle Task Status 
            const getTask = getCurrentProject.findTask(getTaskId);
            getTask.toggleState(); 

            render();
            renderFilterCards();
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

        renderProjectElements(pulseStore.projects);
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

        render();  
        renderFilterCards();
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

        render(); 
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

init();
subscribe(render);
render();  