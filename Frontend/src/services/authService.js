import api from './api';

export const authService = {
  login: async (credentials) => {
    const res = await api.post('/auth/login', credentials);
    if (res.data?.token) {
      localStorage.setItem('stayfix_token', res.data.token);
      localStorage.setItem('stayfix_user', JSON.stringify(res.data));
    }
    return res.data;
  },

  register: async (userData) => {
    const res = await api.post('/auth/register', userData);
    return res.data;
  },

  getCurrentUser: async () => {
    const res = await api.get('/auth/me');
    return res.data;
  },

  logout: () => {
    localStorage.removeItem('stayfix_token');
    localStorage.removeItem('stayfix_user');
  },

  getStoredUser: () => {
    const u = localStorage.getItem('stayfix_user');
    return u ? JSON.parse(u) : null;
  }
};
