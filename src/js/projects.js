import { Task } from "./tasks.js";

export class Project { 

    tasks = []

    constructor(title) { 
        this.title = title.trim()
        this.projectId = crypto.randomUUID();
    }

    static fromJSON(projectData) { 
        const newProject = new Project(projectData.title)
        newProject.projectId = projectData.projectId 
        // Deserialize Dead JSON Objects 
        newProject.tasks = projectData.tasks.map(t => Task.fromJSON(t))
        return newProject
    }

    addTask(task) { 
        this.tasks.push(task)
    }

    removeTask(taskId) { 
        const getTaskIndex = this.tasks.findIndex((task) => task.id === taskId); 
        if(getTaskIndex === -1) return;
        this.tasks.splice(getTaskIndex)
    }

    findTask(taskId) { 
        return this.tasks.find((task) => task.id === taskId); 
    }

}