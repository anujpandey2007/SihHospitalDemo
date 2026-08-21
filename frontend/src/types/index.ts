export type Role = 'LANDING' | 'PATIENT' | 'DOCTOR' | 'RECEPTIONIST' | 'ADMIN';

export type Gender = 'MALE' | 'FEMALE' | 'OTHER';
export type Shift = 'MORNING' | 'EVENING' | 'NIGHT';
export type HospitalType = 'GOVERNMENT' | 'PRIVATE';
export type AppointmentStatus = 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
export type PaymentStatus = 'PAID' | 'PENDING' | 'WAIVED';
export type TriagePriority = 'PRIORITY_1_EMERGENCY' | 'PRIORITY_2_SAME_DAY' | 'PRIORITY_3_ROUTINE';

export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: Gender;
  abhaNumber: string; // E.g., "91-4829-1092-3841"
  abhaAddress: string; // E.g., "anuj.pandey@abdm"
  bloodGroup: string;
  motherAbhaNumber?: string; // For Day-One Newborn record auto-linking
  isNewborn?: boolean;
}

export interface Doctor {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialization: string;
  departmentId: number;
  departmentName?: string;
  shift: Shift;
  roomNumber: string;
}

export interface Receptionist {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  hospitalId: number;
  deskNumber: string;
}

export interface Hospital {
  id: number;
  name: string;
  address: string;
  phone: string;
  hospitalType: HospitalType;
  abdmNodeId: string;
}

export interface Department {
  id: number;
  name: string;
  hospitalId: number;
  headDoctor?: string;
}

export interface Appointment {
  id: number;
  patientId: number;
  patientName?: string;
  patientAbha?: string;
  doctorId: number;
  doctorName?: string;
  appointmentDate: string;
  status: AppointmentStatus;
  reason: string;
  triagePriority?: TriagePriority;
  rawVernacularComplaint?: string;
}

export interface MedicalRecord {
  id: number;
  patientId: number;
  doctorId: number;
  doctorName?: string;
  appointmentId?: number;
  dateCreated: string;
  chiefComplaint: string;
  symptoms: string;
  suspectedImpression: string;
  prescription: string;
  notes: string;
  paymentStatus: PaymentStatus;
  triagePriority: TriagePriority;
}

export interface AiClinicalAnalysis {
  rawText: string;
  language: string;
  chiefComplaint: string;
  symptoms: string[];
  suspectedImpression: string;
  recommendedTriage: TriagePriority;
  urgencyReason: string;
  suggestedDepartment: string;
}

// MediLink Language Bridge Types
export interface SupportedLanguage {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  speechCode: string;
}

export interface TranslationMessage {
  id: string;
  sender: 'PATIENT' | 'DOCTOR';
  senderName: string;
  timestamp: string;
  originalLanguageCode: string;
  originalLanguageName: string;
  originalText: string;
  targetLanguageCode: string;
  targetLanguageName: string;
  translatedText: string;
  confidenceScore: number; // e.g. 96
  confidenceRating: 'High' | 'Medium' | 'Low';
  ambiguityWarning?: boolean;
  medicalTermsPreserved?: string[];
}

export interface TranslationResponse {
  originalText: string;
  translatedText: string;
  detectedLanguageCode: string;
  detectedLanguageName: string;
  confidenceScore: number;
  confidenceRating: 'High' | 'Medium' | 'Low';
  ambiguityWarning: boolean;
  medicalTermsPreserved: string[];
}
