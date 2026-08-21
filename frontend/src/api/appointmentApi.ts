import { apiClient } from './axiosConfig';
import { Appointment } from '../types';

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 501,
    patientId: 101,
    patientName: 'Aarav Sharma',
    patientAbha: '91-4829-1092-3841',
    doctorId: 1,
    doctorName: 'Dr. Anuj Pandey',
    appointmentDate: '2026-08-17 10:30 AM',
    status: 'IN_PROGRESS',
    reason: 'Acute Abdominal Pain & High Fever since 48 hours',
    triagePriority: 'PRIORITY_2_SAME_DAY',
    rawVernacularComplaint: 'पेट में 2 दिन से तेज दर्द है, बार-बार उल्टी आ रही है और कल रात से तेज बुखार भी है, कमजोरी लग रही है...',
  },
  {
    id: 502,
    patientId: 102,
    patientName: 'Priya Verma',
    patientAbha: '91-5510-8832-9012',
    doctorId: 2,
    doctorName: 'Dr. Sunita Rao',
    appointmentDate: '2026-08-17 11:15 AM',
    status: 'SCHEDULED',
    reason: 'Post-natal Maternal & Newborn Immunization Check',
    triagePriority: 'PRIORITY_3_ROUTINE',
    rawVernacularComplaint: 'बच्चे की टीका जाँच और प्रसव के बाद की नियमित जांच',
  },
  {
    id: 503,
    patientId: 104,
    patientName: 'Rajesh Kumar',
    patientAbha: '91-2244-6688-1133',
    doctorId: 3,
    doctorName: 'Dr. Vikram Seth',
    appointmentDate: '2026-08-17 12:00 PM',
    status: 'SCHEDULED',
    reason: 'Severe Chest Tightness & Breathing Difficulty',
    triagePriority: 'PRIORITY_1_EMERGENCY',
    rawVernacularComplaint: 'सीने में जकड़न महसूस हो रही है और सांस लेने में बहुत तकलीफ है',
  }
];

let localAppointments = [...INITIAL_APPOINTMENTS];

export const getAllAppointments = async (): Promise<Appointment[]> => {
  try {
    const res = await apiClient.get<Appointment[]>('/appointments');
    return res.data && res.data.length ? res.data : localAppointments;
  } catch {
    return localAppointments;
  }
};

export const createAppointment = async (appt: Omit<Appointment, 'id'>): Promise<Appointment> => {
  try {
    const res = await apiClient.post<Appointment>('/appointments', appt);
    return res.data;
  } catch {
    const newAppt: Appointment = {
      ...appt,
      id: Math.floor(Math.random() * 9000) + 1000,
    };
    localAppointments.unshift(newAppt);
    return newAppt;
  }
};

export const updateAppointmentStatus = async (id: number, status: Appointment['status']): Promise<Appointment | undefined> => {
  try {
    const res = await apiClient.put<Appointment>(`/appointments/${id}/status`, { status });
    return res.data;
  } catch {
    const appt = localAppointments.find((a) => a.id === id);
    if (appt) {
      appt.status = status;
    }
    return appt;
  }
};
