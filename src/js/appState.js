let activeProjectId = null;  

export function setActiveProject(projectId) { 
    activeProjectId = projectId; 
}; 

export function getActiveProject() { 
    return activeProjectId;
}
