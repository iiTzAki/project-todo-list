import {saveTodos} from "./storage.js"

class Todo { 
    isComplete = false
    todoId = crypto.randomUUID() 

    constructor(title, notes, dueDate, priority) { 
        this.title = title;
        this.notes = notes;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    toggleState() { 
        this.isComplete = !this.isComplete;
    }

}

function createTodos(todoTitle, todoNotes, todoDueDate, todoPriority) { 

    const newTodo = new Todo(todoTitle, todoNotes, todoDueDate, todoPriority); 
    saveTodos(newTodo.title, newTodo.notes, newTodo.dueDate, newTodo.priority, newTodo.todoId);

}

export { createTodos }