import { apiClient } from './axiosConfig';

export interface Appointment {
  id?: number;
  patientId: number;
  doctorId: number;
  appointmentDate: string;
  status: string; // SCHEDULED, COMPLETED, CANCELLED
  reason: string;
}

export const getAllAppointments = async () => {
  const response = await apiClient.get<Appointment[]>('/appointments');
  return response.data;
};

export const getAppointmentsByPatient = async (patientId: number) => {
  const response = await apiClient.get<Appointment[]>(`/appointments/patient/${patientId}`);
  return response.data;
};

export const getAppointmentsByDoctor = async (doctorId: number) => {
  const response = await apiClient.get<Appointment[]>(`/appointments/doctor/${doctorId}`);
  return response.data;
};

export const createAppointment = async (data: Appointment) => {
  const response = await apiClient.post<Appointment>('/appointments', data);
  return response.data;
};

export const updateAppointmentStatus = async (id: number, status: string) => {
  const response = await apiClient.patch<Appointment>(`/appointments/${id}/status?status=${status}`);
  return response.data;
};
