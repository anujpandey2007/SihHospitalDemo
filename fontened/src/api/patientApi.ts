import { apiClient } from './axiosConfig';

export interface Patient {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  gender?: string;
}

export const getAllPatients = async () => {
  const response = await apiClient.get<Patient[]>('/patients');
  return response.data;
};

export const getPatientById = async (id: number) => {
  const response = await apiClient.get<Patient>(`/patients/${id}`);
  return response.data;
};

export const createPatient = async (data: Patient) => {
  const response = await apiClient.post<Patient>('/patients', data);
  return response.data;
};

export const updatePatient = async (id: number, data: Partial<Patient>) => {
  const response = await apiClient.put<Patient>(`/patients/${id}`, data);
  return response.data;
};

export const deletePatient = async (id: number) => {
  const response = await apiClient.delete(`/patients/${id}`);
  return response.data;
};
