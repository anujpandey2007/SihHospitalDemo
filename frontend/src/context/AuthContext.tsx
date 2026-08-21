import React, { createContext, useContext, useState } from 'react';
import { Role, Patient, Doctor, Receptionist } from '../types';

interface AuthContextType {
  role: Role;
  setRole: (role: Role) => void;
  activePatient: Patient | null;
  setActivePatient: (patient: Patient | null) => void;
  activeDoctor: Doctor | null;
  setActiveDoctor: (doctor: Doctor | null) => void;
  activeReceptionist: Receptionist | null;
  setActiveReceptionist: (receptionist: Receptionist | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role>('LANDING');
  const [activePatient, setActivePatient] = useState<Patient | null>(null);
  const [activeDoctor, setActiveDoctor] = useState<Doctor | null>(null);
  const [activeReceptionist, setActiveReceptionist] = useState<Receptionist | null>(null);

  return (
    <AuthContext.Provider
      value={{
        role,
        setRole,
        activePatient,
        setActivePatient,
        activeDoctor,
        setActiveDoctor,
        activeReceptionist,
        setActiveReceptionist,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
