
import { useMemo, useState } from "react";
import {
  LayoutDashboard,
  CheckSquare,
  CalendarDays,
  Settings,
  Plus,
  Search,
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Clock,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

import sampleTasks from "./data/sampleTasks";
import useLocalStorage from "./hooks/useLocalStorage";
import "./App.css";

const notes = [
  {
    title: "Make today count.",
    description: "A little focus goes a long way.",
    next: "Design landing page",
    progress: 62,
  },
  {
    title: "One step at a time.",
    description: "Small progress is still progress.",
    next: "Complete React components",
    progress: 45,
  },
  {
    title: "Focus on what matters.",
    description: "Your consistency creates results.",
    next: "Prepare project documentation",
    progress: 80,
  },
];

function App() {
  const [tasks, setTasks] = useLocalStorage("focusboard-tasks", sampleTasks);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [priority, setPriority] = useState("All");
  const [noteIndex, setNoteIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "General",
    status: "To do",
    priority: "Medium",
    dueDate: "",
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;
  const inProgressTasks = tasks.filter(
    (task) => task.status === "In progress"
  ).length;

  const completion = totalTasks
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        activeTab === "All" || task.status === activeTab;

      const matchesPriority =
        priority === "All" || task.priority === priority;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, search, activeTab, priority]);

  function openCreateForm() {
    setEditingTask(null);
    setFormData({
      title: "",
      description: "",
      category: "General",
      status: "To do",
      priority: "Medium",
      dueDate: "",
    });
    setShowForm(true);
  }

  function openEditForm(task) {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      category: task.category,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate,
    });
    setShowForm(true);
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    if (!formData.title.trim()) {
      alert("Please enter a task title.");
      return;
    }

    if (editingTask) {
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === editingTask.id
            ? { ...task, ...formData, title: formData.title.trim() }
            : task
        )
      );
    } else {
      const newTask = {
        id: crypto.randomUUID(),
        ...formData,
        title: formData.title.trim(),
      };

      setTasks((currentTasks) => [newTask, ...currentTasks]);
    }

    setShowForm(false);
  }

  function deleteTask(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (confirmed) {
      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== id)
      );
    }
  }

  function changeNote(direction) {
    setNoteIndex((current) => {
      return (current + direction + notes.length) % notes.length;
    });
  }

  const currentNote = notes[noteIndex];

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">
            <CheckSquare size={21} />
          </div>
          <span>FocusBoard</span>
        </div>

        <p className="sidebar-label">WORKSPACE</p>

        <nav className="side-nav">
          <a className="nav-item active" href="#overview">
            <LayoutDashboard size={19} />
            <span>Overview</span>
          </a>
          <a className="nav-item" href="#tasks">
            <CheckSquare size={19} />
            <span>My Tasks</span>
          </a>
          <a className="nav-item" href="#tasks">
            <CalendarDays size={19} />
            <span>Calendar</span>
          </a>
        </nav>

        <div className="sidebar-bottom">
          <a className="nav-item" href="#settings">
            <Settings size={19} />
            <span>Settings</span>
          </a>
          <div className="profile-card">
            <div className="avatar">S</div>
            <div>
              <strong>My Workspace</strong>
              <span>Personal account</span>
            </div>
            <MoreHorizontal size={18} />
          </div>
        </div>
      </aside>

      <main className="main-content" id="overview">
        <header className="top-header">
          <div className="breadcrumb">
            Workspace <span>/</span> Overview
          </div>
          <div className="header-actions">
            <button className="icon-button" aria-label="Notifications">
              <Bell size={19} />
            </button>
            <div className="header-profile">
              <div className="avatar">S</div>
              <ChevronDown size={16} />
            </div>
          </div>
        </header>

        <section className="welcome-section">
          <div>
            <p className="eyebrow">YOUR PERSONAL WORKSPACE</p>
            <h1>Your work, in focus.</h1>
            <p className="welcome-description">
              Plan your day, stay organized, and celebrate small wins.
            </p>
          </div>

          <button className="primary-button" onClick={openCreateForm}>
            <Plus size={18} />
            New task
          </button>
        </section>

        <section className="focus-card">
          <div className="focus-content">
            <div className="focus-topline">
              <span>FOCUS NOTES</span>
              <span>{String(noteIndex + 1).padStart(2, "0")} / 03</span>
            </div>

            <h2>{currentNote.title}</h2>
            <p>{currentNote.description}</p>

            <div className="focus-bottom">
              <div>
                <span className="next-label">NEXT UP</span>
                <strong>{currentNote.next}</strong>
              </div>
              <div className="focus-progress">
                <strong>{currentNote.progress}%</strong>
                <span>Progress</span>
              </div>
            </div>
          </div>

          <div className="focus-controls">
            <button
              onClick={() => changeNote(-1)}
              aria-label="Previous note"
            >
              <ChevronLeft size={19} />
            </button>

            <div className="note-dots">
              {notes.map((note, index) => (
                <button
                  key={note.title}
                  className={index === noteIndex ? "dot active-dot" : "dot"}
                  onClick={() => setNoteIndex(index)}
                  aria-label={`Show note ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => changeNote(1)}
              aria-label="Next note"
            >
              <ChevronRight size={19} />
            </button>
          </div>
        </section>

        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-heading">
              <span>Total tasks</span>
              <div className="stat-icon purple">
                <CheckSquare size={19} />
              </div>
            </div>
            <strong className="stat-number">{totalTasks}</strong>
            <span className="stat-caption">Tasks in your workspace</span>
          </div>

          <div className="stat-card">
            <div className="stat-heading">
              <span>In progress</span>
              <div className="stat-icon orange">
                <Clock size={19} />
              </div>
            </div>
            <strong className="stat-number">{inProgressTasks}</strong>
            <span className="stat-caption">Tasks currently active</span>
          </div>

          <div className="stat-card">
            <div className="stat-heading">
              <span>Completed</span>
              <div className="stat-icon green">
                <CheckSquare size={19} />
              </div>
            </div>
            <strong className="stat-number">{completedTasks}</strong>
            <span className="stat-caption">
              {completion}% completion rate
            </span>
          </div>
        </section>

        <section className="tasks-section" id="tasks">
          <div className="section-heading">
            <div>
              <h2>My tasks</h2>
              <p>Manage and track your daily activities.</p>
            </div>
            <button className="mobile-add" onClick={openCreateForm}>
              <Plus size={17} />
              Add task
            </button>
          </div>

          <div className="task-toolbar">
            <div className="tabs">
              {["All", "To do", "In progress", "Completed"].map((tab) => (
                <button
                  key={tab}
                  className={activeTab === tab ? "tab active-tab" : "tab"}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="filters">
              <div className="search-box">
                <Search size={17} />
                <input
                  type="search"
                  placeholder="Search tasks..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>

              <select
                aria-label="Filter by priority"
                value={priority}
                onChange={(event) => setPriority(event.target.value)}
              >
                <option value="All">All priorities</option>
                <option value="High">High priority</option>
                <option value="Medium">Medium priority</option>
                <option value="Low">Low priority</option>
              </select>
            </div>
          </div>

          <div className="task-list">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <article className="task-row" key={task.id}>
                  <div className="task-main">
                    <div className="task-status-dot" />
                    <div>
                      <h3>{task.title}</h3>
                      <p>{task.description}</p>
                      <span className="category-tag">{task.category}</span>
                    </div>
                  </div>

                  <div className="task-meta">
                    <span className={`priority ${task.priority.toLowerCase()}`}>
                      {task.priority}
                    </span>
                    <span className="task-status">{task.status}</span>
                    <span className="due-date">
                      {task.dueDate || "No due date"}
                    </span>
                    <div className="task-actions">
                      <button
                        onClick={() => openEditForm(task)}
                        aria-label={`Edit ${task.title}`}
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        aria-label={`Delete ${task.title}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="empty-state">
                <CheckSquare size={30} />
                <h3>No tasks found</h3>
                <p>Try changing your search or filters.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <nav className="mobile-nav">
        <a className="mobile-nav-active" href="#overview">
          <LayoutDashboard size={20} />
          <span>Overview</span>
        </a>
        <a href="#tasks">
          <CheckSquare size={20} />
          <span>Tasks</span>
        </a>
        <a href="#tasks">
          <CalendarDays size={20} />
          <span>Calendar</span>
        </a>
        <a href="#settings">
          <Settings size={20} />
          <span>Settings</span>
        </a>
      </nav>

      {showForm && (
        <div className="modal-backdrop">
          <form className="task-form" onSubmit={handleFormSubmit}>
            <div className="form-heading">
              <div>
                <h2>{editingTask ? "Edit task" : "Create new task"}</h2>
                <p>Fill in the details for your task.</p>
              </div>
              <button
                type="button"
                className="close-button"
                onClick={() => setShowForm(false)}
                aria-label="Close form"
              >
                <X size={20} />
              </button>
            </div>

            <label>
              Task title
              <input
                required
                autoFocus
                placeholder="Enter task title"
                value={formData.title}
                onChange={(event) =>
                  setFormData({ ...formData, title: event.target.value })
                }
              />
            </label>

            <label>
              Description
              <textarea
                placeholder="Enter task description"
                value={formData.description}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    description: event.target.value,
                  })
                }
              />
            </label>

            <div className="form-grid">
              <label>
                Category
                <input
                  value={formData.category}
                  onChange={(event) =>
                    setFormData({ ...formData, category: event.target.value })
                  }
                />
              </label>

              <label>
                Status
                <select
                  value={formData.status}
                  onChange={(event) =>
                    setFormData({ ...formData, status: event.target.value })
                  }
                >
                  <option>To do</option>
                  <option>In progress</option>
                  <option>Completed</option>
                </select>
              </label>

              <label>
                Priority
                <select
                  value={formData.priority}
                  onChange={(event) =>
                    setFormData({ ...formData, priority: event.target.value })
                  }
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </label>

              <label>
                Due date
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(event) =>
                    setFormData({ ...formData, dueDate: event.target.value })
                  }
                />
              </label>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="cancel-button"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button type="submit" className="primary-button">
                {editingTask ? "Save changes" : "Create task"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
