import { apiClient } from './axiosConfig';
import { Doctor } from '../types';

export const INITIAL_DOCTORS: Doctor[] = [
  {
    id: 1,
    firstName: 'Dr. Anuj',
    lastName: 'Pandey',
    email: 'anuj.pandey@hospital.gov.in',
    phone: '+91 98765 11001',
    specialization: 'Gastroenterology & Internal Medicine',
    departmentId: 1,
    departmentName: 'Gastroenterology',
    shift: 'MORNING',
    roomNumber: 'OPD Room 104',
  },
  {
    id: 2,
    firstName: 'Dr. Sunita',
    lastName: 'Rao',
    email: 'sunita.rao@hospital.gov.in',
    phone: '+91 98765 11002',
    specialization: 'Pediatrics & Maternal Health',
    departmentId: 2,
    departmentName: 'Pediatrics & Maternity',
    shift: 'MORNING',
    roomNumber: 'OPD Room 202',
  },
  {
    id: 3,
    firstName: 'Dr. Vikram',
    lastName: 'Seth',
    email: 'vikram.seth@hospital.gov.in',
    phone: '+91 98765 11003',
    specialization: 'Pulmonology & Emergency Medicine',
    departmentId: 3,
    departmentName: 'Pulmonology & Emergency',
    shift: 'EVENING',
    roomNumber: 'Emergency Desk 1',
  },
  {
    id: 4,
    firstName: 'Dr. Priya',
    lastName: 'Sharma',
    email: 'priya.sharma@hospital.gov.in',
    phone: '+91 98765 11004',
    specialization: 'Cardiology & Intensive Care',
    departmentId: 4,
    departmentName: 'Cardiology',
    shift: 'MORNING',
    roomNumber: 'OPD Room 305',
  },
  {
    id: 5,
    firstName: 'Dr. Rajesh',
    lastName: 'Nair',
    email: 'rajesh.nair@hospital.gov.in',
    phone: '+91 98765 11005',
    specialization: 'Orthopedics & Trauma Surgery',
    departmentId: 5,
    departmentName: 'Orthopedics',
    shift: 'NIGHT',
    roomNumber: 'OPD Room 112',
  }
];

let localDoctors = [...INITIAL_DOCTORS];

export const getAllDoctors = async (): Promise<Doctor[]> => {
  try {
    const res = await apiClient.get<Doctor[]>('/doctors');
    return res.data && res.data.length ? res.data : localDoctors;
  } catch {
    return localDoctors;
  }
};

export const getDoctorById = async (id: number): Promise<Doctor | undefined> => {
  try {
    const res = await apiClient.get<Doctor>(`/doctors/${id}`);
    return res.data;
  } catch {
    return localDoctors.find((d) => d.id === id);
  }
};

export const createDoctor = async (doctor: Omit<Doctor, 'id'>): Promise<Doctor> => {
  try {
    const res = await apiClient.post<Doctor>('/doctors', doctor);
    return res.data;
  } catch {
    const newDoctor: Doctor = {
      ...doctor,
      id: Math.floor(Math.random() * 9000) + 1000,
    };
    localDoctors.unshift(newDoctor);
    return newDoctor;
  }
};
