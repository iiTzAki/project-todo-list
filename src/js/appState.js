let activeProjectTitle = null;  

export function setActiveProject(projectTitle) { 
    activeProjectTitle = projectTitle; 
}; 

export function getActiveProject() { 
    return activeProjectTitle;
}
