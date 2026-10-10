import {saveProjects} from "./storage.js"
import {createProjectElement} from "./DOMbuilder.js"

class Project { 

    constructor(title) { 
        this.title = title
    }

}

function createProjects(projectTitle) { 

    const newProject = new Project(projectTitle)
    saveProjects(newProject.title)
    createProjectElement(newProject.title)

}

export { createProjects }