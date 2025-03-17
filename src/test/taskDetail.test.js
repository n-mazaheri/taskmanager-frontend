import { render, screen, fireEvent } from "@testing-library/react";
import TaskDetail from "../components/TaskDetail"; // Adjust path accordingly
import '@testing-library/jest-dom';




test("calls delete function when delete button is clicked", async () => {
    global.confirm = jest.fn(() => true);  

  const mockDeleteTask = jest.fn();
  const task = { id: 1, title: "Task 1", status: "TODO" };

  // Render the TaskDetail component with the task and the mockDeleteTask function
  render(<TaskDetail task={task} onUpdateTask={() => {}} onDeleteTask={mockDeleteTask} refresh={()=>{}} />);

  // Ensure the delete button is rendered
  const deleteButton = await screen.findByText(/Delete/i); // Use findByText for async waiting
  expect(deleteButton).toBeInTheDocument();

  // Simulate clicking the delete button
  fireEvent.click(deleteButton);


  // Verify the mock delete function was called with the correct task id
  expect(mockDeleteTask).toHaveBeenCalledWith(1);
});
