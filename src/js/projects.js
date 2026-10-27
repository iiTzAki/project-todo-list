import { Task } from "./tasks.js";

export class Project { 

    #tasks = []

    constructor(title) { 
        this.title = title.trim()
        this.projectId = crypto.randomUUID();
    }

    get tasks() { 
        return this.#tasks
    }

    static fromJSON(projectData) { 
        const newProject = new Project(projectData.title) 
        // Deserialize Dead JSON Objects 
        newProject.#tasks = projectData.tasks.map(t => Task.fromJSON(t))
        newProject.projectId = projectData.projectId
        return newProject
    }

    toJSON() { 
        return { 
            title: this.title, 
            projectId: this.projectId, 
            tasks: this.#tasks
        }
    }    

    addTask(task) { 
        this.#tasks.push(task)
    }

    removeTask(taskId) { 
        const getTaskIndex = this.#tasks.findIndex((task) => task.id === taskId); 
        if(getTaskIndex === -1) return;
        this.#tasks.splice(getTaskIndex, 1)
    }

    findTask(taskId) { 
        return this.#tasks.find((task) => task.id === taskId); 
    }

}