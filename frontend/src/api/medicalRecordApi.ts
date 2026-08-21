import { apiClient } from './axiosConfig';
import { MedicalRecord } from '../types';

export const INITIAL_MEDICAL_RECORDS: MedicalRecord[] = [
  {
    id: 901,
    patientId: 101,
    doctorId: 1,
    doctorName: 'Dr. Anuj Pandey',
    appointmentId: 501,
    dateCreated: '2026-08-17 10:45 AM',
    chiefComplaint: 'Abdominal Pain (Acute, 48h duration)',
    symptoms: 'Repeated emesis, Pyrexia (102°F), Asthenia',
    suspectedImpression: 'Acute Gastroenteritis',
    prescription: 'Tab. ORS sachet in 1L water BD\nTab. Paracetamol 650mg TDS\nTab. Ondansetron 4mg SOS',
    notes: 'Patient advised fluid therapy, light diet. Review after 48 hours.',
    paymentStatus: 'PAID',
    triagePriority: 'PRIORITY_2_SAME_DAY',
  },
  {
    id: 902,
    patientId: 103,
    doctorId: 2,
    doctorName: 'Dr. Sunita Rao',
    dateCreated: '2026-08-16 09:00 AM',
    chiefComplaint: 'Day 1 Birth Health Check & Universal Registration',
    symptoms: 'Healthy Cry, APGAR Score 9/10, Birth Weight 3.1kg',
    suspectedImpression: 'Normal Healthy Newborn',
    prescription: 'BCG Vaccine (0.05ml ID)\nHepatitis B Birth Dose (0.5ml IM)\nZero dose OPV (2 drops)',
    notes: 'Universal Health ID auto-linked to Mother ABHA #91-5510-8832-9012.',
    paymentStatus: 'WAIVED',
    triagePriority: 'PRIORITY_3_ROUTINE',
  }
];

let localRecords = [...INITIAL_MEDICAL_RECORDS];

export const getAllMedicalRecords = async (): Promise<MedicalRecord[]> => {
  try {
    const res = await apiClient.get<MedicalRecord[]>('/medical-records');
    return res.data && res.data.length ? res.data : localRecords;
  } catch {
    return localRecords;
  }
};

export const getRecordsByPatientId = async (patientId: number): Promise<MedicalRecord[]> => {
  try {
    const res = await apiClient.get<MedicalRecord[]>(`/medical-records/patient/${patientId}`);
    return res.data;
  } catch {
    return localRecords.filter((r) => r.patientId === patientId);
  }
};

export const createMedicalRecord = async (record: Omit<MedicalRecord, 'id'>): Promise<MedicalRecord> => {
  try {
    const res = await apiClient.post<MedicalRecord>('/medical-records', record);
    return res.data;
  } catch {
    const newRecord: MedicalRecord = {
      ...record,
      id: Math.floor(Math.random() * 9000) + 1000,
    };
    localRecords.unshift(newRecord);
    return newRecord;
  }
};
