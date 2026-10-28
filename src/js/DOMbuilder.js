import { format, parseISO } from "date-fns"

function renderProjectElements(projects) { 
    document.getElementById("my-projects").innerHTML = ""
    projects.forEach(p => {
        createProjectElement(p.title, p.projectId);
    });
}

function renderTaskElements(tasks) { 
    document.getElementById("task-list").innerHTML = ""
    tasks.forEach(t => {
        createTaskElement(
            t.title, 
            t.dueDate,
            t.taskPriority,
            t.isComplete, 
            t.todoId 
        )
    });
}

function createProjectElement(projectName, projectId) { 

    const getMyProjects = document.getElementById('my-projects'); 
    const projectActionBtns = document.createElement('li'); 
    projectActionBtns.className = "project-action-buttons"; 

    const projectBtn = document.createElement('button'); 
    const projectText = document.createElement('span');
    projectBtn.setAttribute('data-project-id', projectId) 
    projectBtn.className = "project-btn";
    projectText.className = "project-text"; 
    projectText.textContent = projectName;
    projectBtn.appendChild(projectText)

    const deleteProjectBtn = document.createElement('button'); 
    deleteProjectBtn.className = "delete-project-btn"; 
    deleteProjectBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13"
    viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" 
    stroke-linejoin="round" class="lucide lucide-x preview-icon"><path d="M18 6 6 18"/>
    <path d="m6 6 12 12"/></svg>`;

    projectActionBtns.append(projectBtn);

    // To not append delete btn on Default/Inbox Project
    if (projectId !== "default") {
        projectActionBtns.appendChild(deleteProjectBtn)
    } 
    getMyProjects.appendChild(projectActionBtns); 
    
};

function createTaskElement(taskTitle, taskDueDate, taskPriority, taskStatus, todoId) { 
    const getTaskList = document.getElementById('task-list');
    const taskContainer = document.createElement('div'); 
    taskContainer.setAttribute('data-todo-id', todoId); 
    taskContainer.className = "task-container"; 

    // Task Details 
    const structureDiv = document.createElement('div'); 
    const taskDetailsWrapper = document.createElement('div'); 
    const markerContainer = document.createElement('div'); 
    const dataContainer = document.createElement('div');
    taskDetailsWrapper.className = "task-details-wrapper"; 
    markerContainer.className = "marker-input-container";
    dataContainer.className = "metadata-container"; 

    const markerInput = document.createElement('input'); 
    markerInput.setAttribute("type", "checkbox");
    markerInput.setAttribute("name", "task-marker");
    markerInput.setAttribute("id", "task-marker");
    markerInput.checked = taskStatus;  

    const markerRadioTile = document.createElement('div');
    markerRadioTile.className = "marker-radio-tile";
    markerRadioTile.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
    viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" 
    stroke-linejoin="round" class="lucide lucide-check preview-icon"><path d="M20 6 9 17l-5-5"/></svg>`

    markerContainer.append(markerInput, markerRadioTile); 

    const taskNameElement = document.createElement('h2'); 
    taskNameElement.className = "task-name";
    taskNameElement.textContent = taskTitle; 

    const extraTaskDetails = document.createElement('div'); 
    const taskDateElement = document.createElement('p'); 
    const taskPriorityElement = document.createElement('p'); 
    taskDateElement.className = "task-due-date"; 
    taskPriorityElement.className = "task-priority";
    taskDateElement.textContent = format(parseISO(taskDueDate), "LLLL d, yyyy");
    taskPriorityElement.textContent = taskPriority.charAt(0).toUpperCase() + taskPriority.slice(1);

    extraTaskDetails.append(taskDateElement, taskPriorityElement); 
    dataContainer.append(taskNameElement, extraTaskDetails);

    taskDetailsWrapper.append(markerContainer, dataContainer); 
    structureDiv.appendChild(taskDetailsWrapper); 

    // Action Buttons
    const actionBtnContianer = document.createElement('div');
    actionBtnContianer.className = "action-btn-container"; 
    const editBtn = document.createElement('button'); 
    const deleteBtn = document.createElement('button'); 
    [editBtn, deleteBtn].forEach(btn => btn.classList.add('action-btn')); 
    editBtn.classList.add('edit-btn'); 
    deleteBtn.classList.add('delete-btn');
    editBtn.setAttribute('data-dialog', 'edit-task-dialog')
    editBtn.textContent = "Edit";
    deleteBtn.textContent = "Delete";
    actionBtnContianer.append(editBtn, deleteBtn); 


    taskContainer.append(structureDiv, actionBtnContianer);
    getTaskList.appendChild(taskContainer); 
};

export { 
    renderProjectElements, 
    renderTaskElements
}