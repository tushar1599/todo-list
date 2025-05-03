import React, { useState, useEffect } from 'react';
import TodoItem from './components/TodoItem';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // Save tasks to localStorage whenever the tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTask.trim()) return;
    const newTaskObject = {
      id: Date.now(),
      text: newTask,
      completed: false,
    };
    setTasks([...tasks, newTaskObject]);
    setNewTask("");
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id) => {
    const newText = prompt("Edit task:");
    if (newText && newText.trim()) {
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, text: newText.trim() } : task
      ));
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true; // for "all"
  });

  const clearAllTasks = () => {
    if (window.confirm("Are you sure you want to delete all tasks?")) {
      setTasks([]);
    }
  };
  

  return (
    <div className="container mt-5">
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-center mb-4 text-primary fw-bold">📝 My Todo List</h2>
  
        {/* Input Row */}
        <div className="input-group mb-4">
          <input
            type="text"
            className="form-control shadow-sm"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button className="btn btn-success shadow-sm" onClick={addTask}>Add Task</button>
        </div>
  
        {/* Filter Buttons */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="btn-group">
            <button className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setFilter("all")}>All</button>
            <button className={`btn ${filter === 'active' ? 'btn-warning' : 'btn-outline-warning'}`} onClick={() => setFilter("active")}>Active</button>
            <button className={`btn ${filter === 'completed' ? 'btn-success' : 'btn-outline-success'}`} onClick={() => setFilter("completed")}>Completed</button>
          </div>

          <button className="btn btn-danger btn-sm" onClick={clearAllTasks}>
            🧹 Clear All
          </button>
        </div>
  
        {/* Todo Table */}
        <div className="table-responsive">
          <table className="table table-hover align-middle text-center">
            <thead className="table-light">
              <tr>
                <th>No</th>
                <th>Task</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-muted">No tasks found.</td>
                </tr>
              ) : (
                filteredTasks.map((task, index) => (
                  <tr key={task.id} className={task.completed ? 'table-success' : ''}>
                    <td>{index + 1}</td>
                    <td style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                      {task.text}
                    </td>
                    <td>
                      <span className={`badge ${task.completed ? 'bg-success' : 'bg-warning text-dark'}`}>
                        {task.completed ? 'Completed' : 'Active'}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-success me-1" onClick={() => toggleComplete(task.id)}>
                        ✅
                      </button>
                      <button className="btn btn-sm btn-outline-primary me-1" onClick={() => editTask(task.id)}>
                        ✏️
                      </button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => deleteTask(task.id)}>
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );  
};

export default App;
