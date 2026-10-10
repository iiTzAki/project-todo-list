import {saveTodos} from "./storage.js"
import {createTodoElement} from "./DOMbuilder.js"

class Todo { 
    #isComplete = false

    constructor(title, notes, dueDate, priority) { 
        this.title = title, 
        this.notes = notes, 
        this.dueDate = dueDate, 
        this.priority = priority
    }

    toggleState() { 
        this.#isComplete = !this.#isComplete;
    }

}

function createTodos(todoTitle, todoNotes, todoDueDate, todoPriority) { 

    const newTodo = new Todo(todoTitle, todoNotes, todoDueDate, todoPriority); 
    saveTodos(newTodo.title, newTodo.notes, newTodo.dueDate, newTodo.priority);
    createTodoElement(newTodo.title, newTodo.notes, newTodo.dueDate, newTodo.priority); 

}

export { createTodos }