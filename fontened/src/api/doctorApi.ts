import { apiClient } from './axiosConfig';

export interface Doctor {
  id?: number;
  firstName: string;
  lastName: string;
  specialization: string;
  email: string;
  phone: string;
  hospitalId?: number;
  departmentId?: number;
}

export const getAllDoctors = async () => {
  const response = await apiClient.get<Doctor[]>('/doctors');
  return response.data;
};

export const getDoctorById = async (id: number) => {
  const response = await apiClient.get<Doctor>(`/doctors/${id}`);
  return response.data;
};

export const createDoctor = async (data: Doctor) => {
  const response = await apiClient.post<Doctor>('/doctors', data);
  return response.data;
};

export const deleteDoctor = async (id: number) => {
  const response = await apiClient.delete(`/doctors/${id}`);
  return response.data;
};
