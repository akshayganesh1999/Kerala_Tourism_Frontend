import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Attach auth token for admin requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ek_admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('ek_admin_token');
      localStorage.removeItem('ek_admin_user');
    }
    return Promise.reject(err);
  }
);

export const inquiryService = {
  submit: (data) => api.post('/inquiries', data),
  getAll: (params) => api.get('/inquiries', { params }),
  delete: (id) => api.delete(`/inquiries/${id}`),
  updateStatus: (id, status) => api.patch(`/inquiries/${id}/status`, { status }),
};

export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  verify: () => api.get('/auth/verify'),
};

export default api;
