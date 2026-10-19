import "../css/styles.css";
import { createTodos } from "./create-todos.js"
import { createProjects } from "./create-projects.js"
import { getActiveProject, setActiveProject } from "./appState.js";
import { renderProjectElements, renderTodoElements, renderAllTodoElements } from "./DOMbuilder.js";
import { removeProjects, removeTodos } from "./storage.js";

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
    getToggleButton.addEventListener('click', (e) => { 
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
            document.getElementById(openBtn.dataset.dialog).showModal(); 
        } else if (closeBtn) { 
            e.preventDefault()
            document.getElementById(closeBtn.dataset.close).close(); 
        }; 
    });
};

function mainEventListeners() { 
    sidebarEventListeners()
    dialogsEventListeners()

};

mainEventListeners()