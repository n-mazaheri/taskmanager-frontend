import React, { useState } from 'react';
import TaskForm from './TaskForm';
import styles from "./TaskDetail.module.css"

const TaskDetail = ({ task, onUpdateTask, onDeleteTask,refresh }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleUpdate = (updatedData) => {
    onUpdateTask(task.id, updatedData);
    setIsEditing(false);
  };
  
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await onDeleteTask(task.id);
      refresh();
    }
  };
  
  const getStatusClass = (status) => {
    switch (status) {
      case 'TODO': return 'todo';
      case 'IN_PROGRESS': return 'in-progress';
      case 'DONE': return 'done';
      default: return '';
    }
  };
  
  if (isEditing) {
    return <TaskForm initialData={task} onSubmit={handleUpdate} refresh={refresh}/>;
  }
  
  return (
    <div className={`task-card ${getStatusClass(task.status)}`}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <div className={styles.props}><p><strong>Status:</strong> {task.status.replace('_', ' ')}</p>
      <p><strong>Priority:</strong> {task.priority}</p>
      <p><strong>Created:</strong> {new Date(task.created_at).toLocaleString()}</p></div>
      <p><strong>Tags:</strong> {task.tags?.map(tag=><span className={styles.tags}>{tag.name}</span>)}</p>
      <div>
        <button onClick={handleEdit} style={{ marginRight: '10px' }}>Edit</button>
        <button onClick={handleDelete} style={{ backgroundColor: '#f44336' }}>Delete</button>
      </div>
    </div>
  );
};

export default TaskDetail;