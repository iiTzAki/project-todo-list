export class Task {  

    #title;
    #isComplete = false; 
    #taskPriority

    constructor(title, notes, dueDate, priority) { 
        this.title = title;
        this.notes = notes;
        this.dueDate = dueDate;
        this.taskPriority = priority;
        this.todoId = crypto.randomUUID(); 
    }

    set title(newTitle) { 
        if(newTitle.trim() === "") { 
            console.warn("Empty title, using default")
            this.#title = "New Task"
            return
        }
        this.#title = newTitle;
    }

    set taskPriority(newPriority) { 
        if (!["low", "medium", "high"].includes(newPriority)) { 
            console.warn("Invalid Priority, Set Priority to none")
            this.#taskPriority = ""
            return
        };
        this.#taskPriority = newPriority; 
    }

    get title() { return this.#title }
    get isComplete() { return this.#isComplete }
    get taskPriority() { return this.#taskPriority }    

    static fromJSON(taskData) { 
        const newTask = new Task(
            taskData.title,     
            taskData.notes, 
            taskData.dueDate, 
            taskData.taskPriority
        ) 
        newTask.todoId = taskData.todoId
        newTask.#isComplete = taskData.isComplete
        return newTask
    }

    toJSON() { 
        return { 
            title: this.#title, 
            notes: this.notes, 
            dueDate: this.dueDate, 
            priority: this.#taskPriority,
            isComplete: this.#isComplete, 
            todoId: this.todoId,
        }
    }

    toggleState() { 
        this.#isComplete = !this.#isComplete;
    } 

    updateTask(title, notes, dueDate, priority) { 
        this.title = title; 
        this.notes = notes; 
        this.dueDate = dueDate; 
        this.taskPriority = priority; 
    }

}

