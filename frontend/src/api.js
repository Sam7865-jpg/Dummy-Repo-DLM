import axios from 'axios';

const API = axios.create({
  baseURL: 'https://effective-pancake-v6595g6g6wrphw477-5000.app.github.dev/api'
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