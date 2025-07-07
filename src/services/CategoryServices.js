import axios from "axios";

const API_URL = 'https://backendgrocery-5rpu.onrender.com/category/';

const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// services/CategoryServices.js
export const getCategory = async (url = API_URL) => {
  const response = await axios.get(url, getAuthHeaders());
  return response.data;
};


export const createCategory = async (categoryData) => {
  const response = await axios.post(API_URL, categoryData, getAuthHeaders());
  return response.data;
};

export const updateCategory = async (id, categoryData) => {
  const response = await axios.put(`${API_URL}${id}/`, categoryData, getAuthHeaders());
  return response.data;
};

export const deleteCategory = async (id) => {
  await axios.delete(`${API_URL}${id}/`, getAuthHeaders());
};
