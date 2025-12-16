import api from './api';

export const appointmentService = {
  getAvailableDoctors: async () => {
    const response = await api.get('/appointments/available');
    return response.data;
  },

  getDoctorDetails: async (doctorId) => {
    const response = await api.get(`/appointments/book/${doctorId}`);
    return response.data;
  },

  bookAppointment: async (appointmentData) => {
    const response = await api.post('/appointments/book', appointmentData);
    return response.data;
  },

  getMyAppointments: async () => {
    const response = await api.get('/appointments/my');
    return response.data;
  },

  getDoctorAppointments: async () => {
    const response = await api.get('/appointments/doctor');
    return response.data;
  },

  updateAppointmentStatus: async (id, status) => {
    const response = await api.post(`/appointments/status/${id}`, { status });
    return response.data;
  },
};
