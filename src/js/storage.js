import { Project } from "./projects.js";

export class Store { 

    projects = []

    addProject(project) { 
        this.projects.push(project)
    }

    removeProject(projectId) { 
        const getProjectIndex = this.projects.findIndex((project) => project.projectId === projectId)
        if(getProjectIndex === -1) return; 
        this.projects.splice(getProjectIndex)
    }

    findProject(projectId) { 
        return this.projects.find((project) => project.projectId === projectId); 
    }

} 


