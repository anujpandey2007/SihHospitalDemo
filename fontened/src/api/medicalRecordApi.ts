import { apiClient } from './axiosConfig';

export interface MedicalRecord {
  id?: number;
  patientId: number;
  doctorId: number;
  appointmentId?: number;
  diagnosis: string;
  prescription: string;
  notes: string;
  paymentStatus: string;
}

export const getAllMedicalRecords = async () => {
  const response = await apiClient.get<MedicalRecord[]>('/medical-records');
  return response.data;
};

export const getMedicalRecordById = async (id: number) => {
  const response = await apiClient.get<MedicalRecord>(`/medical-records/${id}`);
  return response.data;
};

export const getMedicalRecordByAppointmentId = async (appointmentId: number) => {
  const response = await apiClient.get<MedicalRecord>(`/medical-records/appointment/${appointmentId}`);
  return response.data;
};

export const createMedicalRecord = async (data: MedicalRecord) => {
  const response = await apiClient.post<MedicalRecord>('/medical-records', data);
  return response.data;
};

export const updateMedicalRecord = async (id: number, data: Partial<MedicalRecord>) => {
  const response = await apiClient.put<MedicalRecord>(`/medical-records/${id}`, data);
  return response.data;
};

export const updatePaymentStatus = async (id: number, status: string) => {
  const response = await apiClient.patch<MedicalRecord>(`/medical-records/${id}/payment-status?status=${status}`);
  return response.data;
};
