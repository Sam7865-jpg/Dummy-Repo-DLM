import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
});

// Har request ke sath login token automatically bhejna
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;