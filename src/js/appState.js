let activeProjectId = "default";  

export function setActiveProject(projectId) { 
    activeProjectId = projectId; 
}; 

export function getActiveProject() { 
    return activeProjectId;
}
