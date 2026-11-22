# FocusBoard – Personal Productivity Dashboard

FocusBoard is a responsive task management dashboard built using React.js. It helps users organize daily activities, manage priorities, track task progress, and stay focused.

## Features

- Responsive dashboard for desktop, tablet, and mobile.
- Create new tasks.
- Edit existing tasks.
- Delete tasks with confirmation.
- Task statuses: To do, In progress, and Completed.
- Task priorities: High, Medium, and Low.
- Search tasks by title (case-insensitive).
- Filter tasks by status and priority.
- Dynamic task statistics.
- Focus Notes carousel with three slides.
- Persistent task storage using browser localStorage.

## Technologies Used

- React.js
- Vite
- JavaScript (ES6+)
- HTML5
- CSS3
- Lucide React
- Browser localStorage
- Git and GitHub
- Vercel

## Project Structure

```text
FocusBoard/
├── public/
├── screenshots/
├── src/
│   ├── assets/
│   ├── components/
│   ├── data/
│   │   └── sampleTasks.js
│   ├── hooks/
│   │   └── useLocalStorage.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── AI_USAGE.md
├── README.md
├── package.json
└── vite.config.js
```

## Installation and Setup

### Prerequisites

- Node.js
- npm
- Visual Studio Code

### Steps

1. Clone the repository:

```bash
git clone https://github.com/singireddysriram/FocusBoard.git
```

2. Open the project folder:

```bash
cd FocusBoard
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open the local URL displayed in the terminal.

## Production Build

To create an optimized production build:

```bash
npm run build
```

## State Management

FocusBoard uses React's built-in state management features.

- `useState` manages task data, search text, active filters, carousel position, and form visibility.
- `useMemo` calculates the filtered task list based on search, status, and priority.
- A custom `useLocalStorage` hook reads saved tasks from browser localStorage and saves task updates automatically.
- Task creation, editing, and deletion use immutable state updates.

The application uses a single task state as the source of truth. Dashboard statistics and filtered task lists are derived from this state.

## Data Persistence

Tasks are stored in the browser using the localStorage key:

```text
focusboard-tasks
```

Existing saved tasks are loaded when the application starts. Sample tasks are used when no saved data exists.

## Responsive Design

The dashboard includes responsive layouts for:

- Mobile: 390px
- Tablet: 768px
- Desktop: 1440px

## AI Usage

Details about AI assistance and the development process are documented in `AI_USAGE.md`.

## Author

Developed as a frontend development assessment project.
