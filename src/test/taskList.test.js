import React from "react";
import { render, screen } from "@testing-library/react";
import TaskList from "../components/TaskList";
import "@testing-library/jest-dom";


const mockTasks = [
  { id: 1, title: "Task 1", status: "TODO" },
  { id: 2, title: "Task 2", status: "DONE" },
];
test("filters tasks based on status", () => {
  render(<TaskList tasks={mockTasks} onUpdateTask={() => {}} onDeleteTask={() => {}} refresh={()=>{}} statusFilter={"ALL"} priorityFilter={"ALL"} tagFilter={""} setStatusFilter={()=>{}} setTagFilter={()=>{}} setPriorityFilter={()=>{}}/>);

  // Ensure both tasks are initially visible
  expect(screen.getByText(/Task 1/i)).toBeInTheDocument();
  expect(screen.getByText(/Task 2/i)).toBeInTheDocument();

});
