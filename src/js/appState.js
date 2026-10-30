let activeProjectId = null; 
let activeViewState = "project";
let activeFilterState = null; 

const listeners = []; 

export function subscribe(callback) { 
    listeners.push(callback); 
};

function notify() { 
    listeners.forEach(runFunction => runFunction());
};

export function setActiveProject(projectId) { 
    activeProjectId = projectId;
    notify();  
}; 

export function getActiveProject() { 
    return activeProjectId;
};

function setActiveViewState(state) { 
    activeViewState = state;
    notify();  
};

export function getActiveViewState() { 
    return activeViewState;
}; 

function setActiveFilterState(filterMode) { 
    activeFilterState = filterMode;  
    notify()
};

export function getActiveFilterState() { 
    return activeFilterState;
}; 

export function enterFilterMode(filterName) { 
    setActiveProject("default"); 
    setActiveFilterState(filterName); 
    setActiveViewState("filter"); 
};

export function enterProjectMode(projectId) { 
    setActiveProject(projectId); 
    setActiveViewState("project");
};

// Consider a class if view states increase and need methods like 
// Clear states or so.