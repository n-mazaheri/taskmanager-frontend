import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";
import '@testing-library/jest-dom';  // Import the jest-dom matchers globally


test("allows users to create a new task", () => {
  render(<App />);

  // Fill out the form
  fireEvent.change(screen.getByLabelText(/Title/i), {
    target: { value: "New Task" },
  });
  fireEvent.change(screen.getByLabelText(/Description/i), {
    target: { value: "Integration test description" },
  });
  // Get all elements with the label "Status"
  const statusSelects = screen.getAllByLabelText(/Status/i);

  // Select the correct one (first or second, based on your use case)
  fireEvent.change(statusSelects[0], { target: { value: "TODO" } });

    // Add tags
    fireEvent.change(screen.getByLabelText(/Tags/i), {
        target: { value: "test, demo" },
      });
  // Set the due date to tomorrow (ensure the date is in the future)
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 1);  // Add 1 day to today's date
  const dueDate = futureDate.toISOString().split('T')[0];  // Format as 'YYYY-MM-DD'

  fireEvent.change(screen.getByLabelText(/Due Date/i), {
    target: { value: dueDate },
  });

    
  // Submit the form
  fireEvent.click(screen.getByText(/Create Task/i));

  // Check if the new task appears in the task list
  expect(screen.getByText(/New Task/i)).toBeInTheDocument();
});
