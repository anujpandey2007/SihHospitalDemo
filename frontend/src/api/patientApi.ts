import { apiClient } from './axiosConfig';
import { Patient } from '../types';

export const INITIAL_PATIENTS: Patient[] = [
  {
    id: 101,
    firstName: 'Aarav',
    lastName: 'Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    dateOfBirth: '1995-06-15',
    gender: 'MALE',
    abhaNumber: '91-4829-1092-3841',
    abhaAddress: 'aarav.sharma@abdm',
    bloodGroup: 'O+',
  },
  {
    id: 102,
    firstName: 'Priya',
    lastName: 'Verma',
    email: 'priya.verma@example.com',
    phone: '+91 98123 76543',
    dateOfBirth: '1992-11-20',
    gender: 'FEMALE',
    abhaNumber: '91-5510-8832-9012',
    abhaAddress: 'priya.verma@abdm',
    bloodGroup: 'B+',
  },
  {
    id: 103,
    firstName: 'Baby of Priya',
    lastName: 'Verma',
    email: 'priya.verma+baby@example.com',
    phone: '+91 98123 76543',
    dateOfBirth: '2026-08-16',
    gender: 'MALE',
    abhaNumber: '91-9988-7766-5544',
    abhaAddress: 'baby.verma@abdm',
    bloodGroup: 'B+',
    motherAbhaNumber: '91-5510-8832-9012',
    isNewborn: true,
  },
  {
    id: 104,
    firstName: 'Rajesh',
    lastName: 'Kumar',
    email: 'rajesh.kumar@example.com',
    phone: '+91 97654 32109',
    dateOfBirth: '1984-03-08',
    gender: 'MALE',
    abhaNumber: '91-2244-6688-1133',
    abhaAddress: 'rajesh.kumar@abdm',
    bloodGroup: 'A+',
  }
];

let localPatients = [...INITIAL_PATIENTS];

export const getAllPatients = async (): Promise<Patient[]> => {
  try {
    const res = await apiClient.get<Patient[]>('/patients');
    return res.data && res.data.length ? res.data : localPatients;
  } catch {
    return localPatients;
  }
};

export const getPatientById = async (id: number): Promise<Patient | undefined> => {
  try {
    const res = await apiClient.get<Patient>(`/patients/${id}`);
    return res.data;
  } catch {
    return localPatients.find((p) => p.id === id);
  }
};

export const createPatient = async (patient: Omit<Patient, 'id'>): Promise<Patient> => {
  try {
    const res = await apiClient.post<Patient>('/patients', patient);
    return res.data;
  } catch {
    const newPatient: Patient = {
      ...patient,
      id: Math.floor(Math.random() * 9000) + 1000,
    };
    localPatients.unshift(newPatient);
    return newPatient;
  }
};
