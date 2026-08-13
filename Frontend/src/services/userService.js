import api from './api';

export const userService = {
  updateProfile: async (userId, profileData) => {
    return await api.put('/users/profile', profileData);
  }
};
