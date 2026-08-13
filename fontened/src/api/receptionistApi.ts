import { apiClient } from './axiosConfig';

export interface Receptionist {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  hospitalId?: number;
}

export const getAllReceptionists = async () => {
  const response = await apiClient.get<Receptionist[]>('/receptionists');
  return response.data;
};

export const createReceptionist = async (data: Receptionist) => {
  const response = await apiClient.post<Receptionist>('/receptionists', data);
  return response.data;
};

export const deleteReceptionist = async (id: number) => {
  const response = await apiClient.delete(`/receptionists/${id}`);
  return response.data;
};
