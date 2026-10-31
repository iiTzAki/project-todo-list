# Pulse

A minimal todo app built with vanilla ES modules, Webpack, and localStorage.

## How to Run

- Install dependencies: `npm install`
- Start development server: `npm run dev`
- Build for production: `npm run build`
- Deploy to GitHub Pages: `npm run deploy`

## How does the project work 

- The project contains 7 modules, 3 CSS files, and 1 HTML template file.

**JS**
- **index.js** - App bootstrap. Contains event listeners, helper functions, and the render function used by the pub/sub system.

- **storage.js** - Store class. Holds projects (with their tasks) in memory. Loads and saves to localStorage, reconstructing instances on load via `fromJSON` and serializing via `toJSON`.

- **projects.js** - Project class. Holds tasks as a private field with methods for adding, removing, and finding tasks. Deserializes task instances on load.

- **tasks.js** - Task class. Defines task data and behavior (toggle, update, set priority). Uses `toJSON` to serialize private fields.

- **filters.js** - Pure filter functions (today, upcoming, completed, search). Takes an array of tasks, returns a filtered subset.

- **DOMbuilder.js** - Builds and renders DOM elements. No app logic, no storage access.

- **appState.js** - Manages view state (project / filter). Includes a pub/sub mechanism that triggers re-renders on state change without manually calling DOM functions.

**CSS**
- **styles.css** - Contains CSS for the whole UI. 
- **dialogs.css** - Contains CSS for all dialogs, using shared classes for reuse.
- **vars.css** - Contains CSS variables.

**HTML**
- **template.html** - Contains HTML markup.

## Features

- Modern dark UI with a clean, minimal design
- Sidebar for project navigation and quick filters
- Create, edit, and delete tasks
- Organize tasks into projects
- Filter by today, upcoming, anytime, or completed
- Search tasks by title
- Data persists in localStorage across sessions

## Technologies Used

**Languages**
<p align="left">
  <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/65dea6c4eaca7da319e552c09f4cf5a9a8dab2c8/icons/HTML.svg" width="40" height="40" alt="HTML5" /> &nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/65dea6c4eaca7da319e552c09f4cf5a9a8dab2c8/icons/CSS.svg" width="40" height="40" alt="CSS3" /> &nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/65dea6c4eaca7da319e552c09f4cf5a9a8dab2c8/icons/JavaScript.svg" width="40" height="40" alt="JavaScript" />
</p>

**Bundler / Tooling**
<p align="left">
  <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/refs/heads/main/icons/Webpack-Light.svg" width="40" height="40" alt="webpack" /> &nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/refs/heads/main/icons/Git.svg" width="40" height="40" alt="git" />    
</p>

## Resources & Credits

- **Fonts**
  - **Space Grotesk**: [Google Fonts](https://fonts.google.com/specimen/Space+Grotesk)
  - **Sora**: [Google Fonts](https://fonts.google.com/specimen/Sora)  
  - **Inter**: [Google Fonts](https://fonts.google.com/specimen/Inter)  
- **Icons** 
  - **Material Symbols**: [Google Fonts Icons](https://fonts.google.com/icons)
  
## Future Improvements 

- [ ] Consistent naming convention across all modules.
- [ ] Improve responsiveness across mobile viewports.
- [ ] Requirement for expand task to view notes.
- [ ] Light theme mode. 

## 📷 Preview
![Project Preview](https://github.com/user-attachments/assets/d123b3bd-468d-4e09-8ddb-66d623b7ea24)
