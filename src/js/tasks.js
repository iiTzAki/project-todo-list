export class Task {  

    constructor(title, notes, dueDate, priority) { 
        this.title = title;
        this.notes = notes;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isComplete = false;
        this.todoId = crypto.randomUUID(); 
    }

    static fromJSON(taskData) { 
        const newTask = new Task(
            taskData.title, 
            taskData.notes, 
            taskData.dueDate, 
            taskData.priority
        ) 
        this.todoId = taskData.todoId
        this.isComplete = taskData.isComplete
        return newTask
    }

    toggleState() { 
        this.isComplete = !this.isComplete;
    } 

    setPriority(priority) { 
        this.priority = priority; 
    }

    editTask(title, notes, dueDate, priority) { 
        this.title = title; 
        this.notes = notes; 
        this.dueDate = dueDate; 
        this.priority = priority; 
    }

}

