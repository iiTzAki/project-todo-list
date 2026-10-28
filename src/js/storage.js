import { Project } from "./projects.js";

export class Store { 

    #projects = []

    get projects() { 
        return [...this.#projects]; 
    }

    addProject(project) { 
        this.#projects.push(project)
    }

    removeProject(projectId) { 
        if(projectId === "default") throw new Error("Cannot Delete 'Default' Project")
        const projectIndex  = this.#projects.findIndex((project) => project.projectId === projectId)
        if(projectIndex  === -1) return; 
        this.#projects.splice(projectIndex , 1)
    }

    findProject(projectId) {
        return this.#projects.find((project) => project.projectId === projectId);
    }

    loadProjects() { 
        const getProjects = localStorage.getItem('pulse-projects'); 
        if (getProjects === null) return []; 

        // Deserialize Dead JSON Projects and map them into Project Class Instances
        try { 
            const parsed = JSON.parse(getProjects);
            this.#projects = parsed
                .map((p) => { 
                    try { 
                        return Project.fromJSON(p);
                    } catch { 
                        return null;
                    }
                }).filter(Boolean); // Filters out the corrupted projects
        } catch { 
            this.#projects = [];
        }
        
    }

    ensureDefaultProject() { 
        // Creates and Saves the Default Project
        if (!this.#projects.some((project) => project.projectId === "default")) { 
            const defaultProject = new Project("Inbox"); 
            defaultProject.projectId = "default"; 
            this.#projects.push(defaultProject); 
            this.saveProjects()                  
        }
    }

    saveProjects() { 
        // To Catch if the storage is full and other errors 
        try { 
            localStorage.setItem('pulse-projects', JSON.stringify(this.#projects))
        } catch { 
            console.warn("Project Not Saved.")
        }
    }


} 
