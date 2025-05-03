import React from 'react';

const TodoItem = ({ task, onToggleComplete, onDelete, onEdit }) => {
  return (
    <div className={`d-flex justify-content-between align-items-center mb-2 p-2 border rounded ${task.completed ? 'bg-success text-white' : 'bg-light'}`}>
      <div
        style={{ textDecoration: task.completed ? "line-through" : "none", cursor: 'pointer' }}
        onClick={() => onToggleComplete(task.id)}
      >
        {task.text}
      </div>
      <div>
        <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(task.id)}>Edit</button>
        <button className="btn btn-sm btn-danger" onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
};

export default TodoItem;
