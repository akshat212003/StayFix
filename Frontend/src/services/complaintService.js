import api from './api';

export const complaintService = {
  createComplaint: async (complaintData, images) => {
    const formData = new FormData();
    formData.append('title', complaintData.title);
    formData.append('description', complaintData.description);
    formData.append('category', complaintData.category);
    formData.append('priority', complaintData.priority);

    if (images && images.length > 0) {
      images.forEach((img) => {
        formData.append('images', img);
      });
    }

    return await api.post('/complaints', formData);
  },

  getMyComplaints: async (params) => {
    return await api.get('/complaints/my', { params });
  },

  getAssignedComplaints: async (params) => {
    return await api.get('/staff/complaints', { params });
  },

  getAllComplaints: async (params) => {
    return await api.get('/complaints', { params });
  },

  getComplaintById: async (id) => {
    return await api.get(`/complaints/${id}`);
  },

  updateStatus: async (id, statusData, proofImages) => {
    const formData = new FormData();
    formData.append('status', statusData.status);
    if (statusData.remarks) {
      formData.append('remarks', statusData.remarks);
    }

    if (proofImages && proofImages.length > 0) {
      proofImages.forEach((img) => {
        formData.append('proofImages', img);
      });
    }

    return await api.put(`/staff/complaints/${id}/status`, formData);
  },

  assignComplaint: async (id, assignData) => {
    return await api.put(`/admin/complaints/${id}/assign`, assignData);
  },

  submitFeedback: async (complaintId, feedbackData) => {
    return await api.post(`/feedback/complaints/${complaintId}`, feedbackData);
  },

  getAnalytics: async () => {
    return await api.get('/admin/analytics');
  }
};
