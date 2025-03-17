import React, { useState } from "react";
import axios from "axios";
import styles from "./TaskForm.module.css"

const TaskForm = ({ onSubmit, refresh, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    status: initialData?.status || "TODO",
    priority: initialData?.priority || "MEDIUM",
    due_date: initialData?.due_date ? initialData.due_date.split("T")[0] : "", // Convert "YYYY-MM-DDTHH:mm:ssZ" to "YYYY-MM-DD"
    tags: initialData?.tags
      ? initialData.tags.map((tag) => tag.name).join(", ")
      : "",
  });

  const [suggestedTags, setSuggestedTags] = useState([]);
  // Function to call Gemini API and get tag suggestions
  const fetchTagSuggestions = async (description) => {
    if (!description) {
      setSuggestedTags([]);
      return;
    }

    const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `Suggest up to 5 relevant tags for this task description: "${description}". Provide tags as a comma-separated list.`,
                },
              ],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const aiResponse =
        response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      const tags = aiResponse.split(",").map((tag) => tag.trim());
      setSuggestedTags(tags);
    } catch (error) {
      console.error("Error fetching tag suggestions:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0) // Remove empty values
        .map((tag) => ({ name: tag })), // Convert to object format
      priority: formData.priority.toUpperCase(),
      status: formData.status.toUpperCase(),
    };
    await onSubmit(formattedData);

    // Wait for 1 second before calling refresh
    setTimeout(() => {
      refresh();
    }, 1000);

    if (!initialData) {
      setFormData({
        title: "",
        description: "",
        status: "TODO",
        priority: "Medium",
        due_date: "",
        tags: "",
      });
      setSuggestedTags([]);
    }
  };

  return (
    <div className={styles["task-form"]}>
      <h2>{initialData ? "Edit Task" : "Create New Task"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className={styles.label}>Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description" className={styles.label}>Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="status" className={styles.label}>Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="TODO">To Do</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="priority" className={styles.label}>Priority</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="due_date" className={styles.label}>Due Date</label>
          <input
            type="date"
            id="due_date"
            name="due_date"
            value={formData.due_date}
            min={new Date().toISOString().split("T")[0]} // Set min date to today
            onChange={handleChange}
          />{" "}
        </div>

        <div className="form-group">
          <span className={styles.label}>Sugested Tags By AI:&nbsp;&nbsp;</span>
          <button
            onClick={(e) => {
              e.preventDefault(); // ✅ Stops unintended form submission
              fetchTagSuggestions(formData.description);
            }}
          >
            Fetch
          </button>
          {suggestedTags.map((tag) => (
            <span className={styles.tag}>{tag}</span>
          ))}
        </div>

        <div className="form-group">
          <label htmlFor="tags" className={styles.label}>Tags (comma-separated)</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
          />
        </div>

        <button type="submit">
          {initialData ? "Update Task" : "Create Task"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
