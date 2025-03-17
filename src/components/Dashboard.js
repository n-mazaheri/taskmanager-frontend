import React from "react";
import styles from "./Dashboard.module.css";

const Dashboard = ({ tasks }) => {
  const countByStatus = (status) =>
    tasks.filter((task) => task.status === status).length;
  const countByPriority = (priority) =>
    tasks.filter((task) => task.priority === priority).length;

  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <div className={styles.sections}>
        <div className={styles["dashboard-section"]}>
          <h3>Tasks by Status</h3>
          <p>To Do: {countByStatus("TODO")}</p>
          <p>In Progress: {countByStatus("IN_PROGRESS")}</p>
          <p>Done: {countByStatus("DONE")}</p>
        </div>

        <div className={styles["dashboard-section"]}>
          <h3>Tasks by Priority</h3>
          <p>Low: {countByPriority("LOW")}</p>
          <p>Medium: {countByPriority("MEDIUM")}</p>
          <p>High: {countByPriority("HIGH")}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
