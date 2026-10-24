import {saveProjects} from "./storage.js"

class Project { 
    projectId = crypto.randomUUID(); 

    constructor(title) { 
        this.title = title
    }

}

function createProjects(projectTitle) { 

    const newProject = new Project(projectTitle)
    saveProjects(newProject.title, newProject.projectId)
    return newProject.projectId;

}

export { createProjects }