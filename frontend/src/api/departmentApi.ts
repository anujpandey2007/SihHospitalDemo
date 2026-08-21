import { apiClient } from './axiosConfig';
import { Department, Receptionist } from '../types';

export const INITIAL_DEPARTMENTS: Department[] = [
  {
    id: 1,
    name: 'Gastroenterology',
    hospitalId: 1,
    headDoctor: 'Dr. Anuj Pandey',
  },
  {
    id: 2,
    name: 'Pediatrics & Maternity',
    hospitalId: 1,
    headDoctor: 'Dr. Sunita Rao',
  },
  {
    id: 3,
    name: 'Pulmonology & Emergency',
    hospitalId: 1,
    headDoctor: 'Dr. Vikram Seth',
  },
  {
    id: 4,
    name: 'Cardiology',
    hospitalId: 1,
    headDoctor: 'Dr. Priya Sharma',
  },
  {
    id: 5,
    name: 'Orthopedics & Trauma',
    hospitalId: 1,
    headDoctor: 'Dr. Rajesh Nair',
  }
];

export const INITIAL_RECEPTIONISTS: Receptionist[] = [
  {
    id: 1,
    firstName: 'Neha',
    lastName: 'Sharma',
    email: 'neha.reception@hospital.gov.in',
    phone: '+91 98111 22334',
    hospitalId: 1,
    deskNumber: 'Central Intake Desk 1',
  },
  {
    id: 2,
    firstName: 'Amit',
    lastName: 'Patel',
    email: 'amit.reception@hospital.gov.in',
    phone: '+91 98222 33445',
    hospitalId: 1,
    deskNumber: 'Maternity & OPD Desk 2',
  },
  {
    id: 3,
    firstName: 'Suman',
    lastName: 'Verma',
    email: 'suman.reception@hospital.gov.in',
    phone: '+91 98333 44556',
    hospitalId: 1,
    deskNumber: 'Emergency Desk 3',
  }
];

let localDepartments = [...INITIAL_DEPARTMENTS];
let localReceptionists = [...INITIAL_RECEPTIONISTS];

export const getAllDepartments = async (): Promise<Department[]> => {
  try {
    const res = await apiClient.get<Department[]>('/departments');
    return res.data && res.data.length ? res.data : localDepartments;
  } catch {
    return localDepartments;
  }
};

export const getDepartmentById = async (id: number): Promise<Department | undefined> => {
  try {
    const res = await apiClient.get<Department>(`/departments/${id}`);
    return res.data;
  } catch {
    return localDepartments.find((d) => d.id === id);
  }
};

export const createDepartment = async (dep: Omit<Department, 'id'>): Promise<Department> => {
  try {
    const res = await apiClient.post<Department>('/departments', dep);
    return res.data;
  } catch {
    const newDep: Department = {
      ...dep,
      id: Math.floor(Math.random() * 9000) + 1000,
    };
    localDepartments.unshift(newDep);
    return newDep;
  }
};

export const getAllReceptionists = async (): Promise<Receptionist[]> => {
  try {
    const res = await apiClient.get<Receptionist[]>('/receptionists');
    return res.data && res.data.length ? res.data : localReceptionists;
  } catch {
    return localReceptionists;
  }
};

export const createReceptionist = async (rec: Omit<Receptionist, 'id'>): Promise<Receptionist> => {
  try {
    const res = await apiClient.post<Receptionist>('/receptionists', rec);
    return res.data;
  } catch {
    const newRec: Receptionist = {
      ...rec,
      id: Math.floor(Math.random() * 9000) + 1000,
    };
    localReceptionists.unshift(newRec);
    return newRec;
  }
};
