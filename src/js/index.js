import "../css/styles.css";
import { format } from "date-fns"; 
import { Task } from "./tasks.js"
import { Project } from "./projects.js"
import { Store } from "./storage.js"
import { renderProjectElements, renderTaskElements } from "./DOMbuilder.js";
import { setActiveProject, getActiveProject } from "./appState.js"

const pulseStore = new Store(); 
const renderAllElements = (projects) => { 
    renderProjectElements(projects);
    renderTaskElements(pulseStore.findProject(getActiveProject()).tasks)
}
const updateHeading = () => { 
    const project = pulseStore.findProject(getActiveProject()); 
    if (!project) return; 
    document.getElementById('task-heading-tag').textContent = project.title; 
}

function init() {  

    // App Start Up 
    pulseStore.loadProjects();
    pulseStore.ensureDefaultProject();
    updateHeading();
    renderAllElements(pulseStore.projects);


    // Elements 
    const getSidebar = document.getElementById("sidebar"); 
    const getCreateProjectForm = document.getElementById("project-form");  


    // Event Listeners
    getSidebar.addEventListener('click', (e) => {
        const getProjectBtn = e.target.closest('.project-btn');
        const getDeleteProjectBtn = e.target.closest('.delete-project-btn'); 

        if (getProjectBtn) { 
            const getProjectId = e.target.closest('.project-action-buttons').querySelector('[data-project-id]').dataset.projectId;
            setActiveProject(getProjectId);
            updateHeading();
            renderAllElements(pulseStore.projects);
        } 
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
            // To Catch if the Project didn't save. 
            try { 
                pulseStore.saveProjects();
            } catch { 
                console.warn("Project Did Not Save.");
            };
            updateHeading();
            renderAllElements(pulseStore.projects); 
        }; 

    });

    getCreateProjectForm.addEventListener('submit', (e) => { 
        e.preventDefault()
        const getProjectName = document.getElementById("project-name").value;
        const newProject = new Project(getProjectName); 
        pulseStore.addProject(newProject); 
        pulseStore.saveProjects(); 
        renderAllElements(pulseStore.projects);
        getCreateProjectForm.reset();
        document.getElementById("create-project-dialog").close(); 
    }); 


    sidebarEventListeners()
    dialogsEventListeners()
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