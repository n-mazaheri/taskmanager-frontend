import axios from 'axios';

const API_URL = 'http://localhost:8000/api';


export const fetchTasks = async (statusFilter,priorityFilter,tagFilter) => {
  let url = `${API_URL}/tasks?`;
  if (statusFilter !== "ALL") url += `status=${statusFilter}&`;
  if (priorityFilter !== "ALL") url += `priority=${priorityFilter}&`;
  if (tagFilter) url += `tag=${tagFilter}&`;

  const response = await axios.get(url);
  return response?.data?.results ?? [];
};

export const fetchTask = async (id) => {
  const response = await axios.get(`${API_URL}/tasks/${id}/`);
  return response.data;
};

export const createTask = async (taskData) => {
  const response = await axios.post(`${API_URL}/tasks/`, taskData);
  return response.data;
};

export const updateTask = async (id, taskData) => {
  const response = await axios.put(`${API_URL}/tasks/${id}/`, taskData);
  return response.data;
};

export const deleteTask = async (id) => {
  await axios.delete(`${API_URL}/tasks/${id}/`);
};