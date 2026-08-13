import api from './api';

export const adminService = {
  getUsers: async () => {
    return await api.get('/admin/users');
  },

  createUser: async (userData) => {
    return await api.post('/admin/users', userData);
  },

  toggleUserStatus: async (userId) => {
    return await api.patch(`/admin/users/${userId}/toggle-status`);
  },

  getStaffList: async () => {
    return await api.get('/users/staff');
  }
};
