import { format, isFuture } from "date-fns"; 

const getCurrentDate = format(new Date(), "yyyy-MM-dd"); 

// Filters
export function getFilterTodayTasks(tasks) {    
    return tasks.filter((task) => task.dueDate === getCurrentDate && !task.isComplete);  
}; 

export function getFilterUpcomingTasks(tasks) { 
    return tasks.filter((task) => isFuture(new Date(task.dueDate)) && !task.isComplete); 
}; 

export function getFilterCompletedTasks(tasks) { 
    return tasks.filter((task) => task.isComplete);
};