import React from "react";
import TaskDetail from "./TaskDetail";
import styles from "./TaskList.module.css"

const TaskList = ({ tasks, onUpdateTask, onDeleteTask,refresh, priorityFilter, setPriorityFilter,tagFilter,setTagFilter,statusFilter,setStatusFilter }) => {



  return (
    <div className={styles.total}>
    <div className="task-list">
      <h2>Tasks</h2>

      <div className={styles.filters}>
        <label className={styles.label}>
          Filter by status:
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            {["ALL", "TODO", "IN_PROGRESS", "DONE"].map((status) => (
              <option key={status} value={status}>
                {status.replace("_", " ")}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.label}>
          Filter by priority:
          <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
            {["ALL", "Low", "Medium", "High"].map((priority) => (
              <option key={priority} value={priority}>{priority}</option>
            ))}
          </select>
        </label>

        <label className={styles.label}>
          Filter by tag:
          <input type="text" value={tagFilter} onChange={(e) => setTagFilter(e.target.value)} placeholder="Enter tag name" />
        </label>
      </div>

      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        tasks.map((task) => (
          <TaskDetail key={task.id} task={task} onUpdateTask={onUpdateTask} onDeleteTask={onDeleteTask} refresh={refresh}/>
        ))
      )}
    </div>
    </div>
  );
};

export default TaskList;
