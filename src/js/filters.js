import { format, isFuture } from "date-fns"; 

const getCurrentDate = format(new Date(), "yyyy-MM-dd");
export function updateFilterCards(tasks) { 

    // Grab Elements 
    const getFilterTodayCard = document.querySelector('.filter-card-today');
    const getFilterPendingCard = document.querySelector('.filter-card-pending');
    const getFilterCompletedCard = document.querySelector('.filter-card-completed'); 

    // Filters
    const todayTasksCount = tasks.filter((task) => task.dueDate === getCurrentDate && !task.isComplete).length;
    const pendingTasksCount = tasks.filter((task) => task.isComplete === false).length;
    const completedTasksCount = tasks.filter((task) => task.isComplete === true).length;

    // Set Card Counts
    getFilterTodayCard.textContent = todayTasksCount; 
    getFilterPendingCard.textContent = pendingTasksCount; 
    getFilterCompletedCard.textContent = completedTasksCount; 

}; 

export function getFilterTodayTasks(projects) { 
    const allTasks = flattenTasks(projects); 
    return allTasks.filter((task) => task.dueDate === getCurrentDate);  
}; 

export function getFilterUpcomingTasks(projects) { 
    const allTasks = flattenTasks(projects); 
    return allTasks.filter((task) => isFuture(new Date(task.dueDate))); 
}; 

export function getFilterAnytimeTasks(projects) { 
    return flattenTasks(projects); 
};

export function getFilterCompletedTasks(projects) { 
    const allTasks = flattenTasks(projects); 
    return allTasks.filter((task) => task.isComplete);
};

// Helper Function 
const flattenTasks = (projects) => { 
    return projects.flatMap(project => project.tasks); 
};