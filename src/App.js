import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Dashboard from './components/Dashboard';
import { fetchTasks, createTask, updateTask, deleteTask } from './api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [flag,setFlag]=useState(false);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [tagFilter, setTagFilter] = useState("");
  
  useEffect(() => {
    loadTasks();
  }, [flag,statusFilter,priorityFilter,tagFilter]);

  const loadTasks = async () => {
    const data = await fetchTasks(statusFilter,priorityFilter,tagFilter);
    setTasks(data);
  };

  return (
    <div className="container">
      <h1>Task Management System</h1>
      
      <Dashboard tasks={tasks} />
      <hr/>
      <TaskForm onSubmit={ createTask} refresh={()=>{setFlag(!flag)}} />
        <hr/>
      <TaskList tasks={tasks} onUpdateTask={updateTask} onDeleteTask={deleteTask} refresh={()=>{setFlag(!flag)}} statusFilter={statusFilter} priorityFilter={priorityFilter} tagFilter={tagFilter} setStatusFilter={setStatusFilter} setTagFilter={setTagFilter} setPriorityFilter={setPriorityFilter}/>
    </div>
  );
}

export default App;
