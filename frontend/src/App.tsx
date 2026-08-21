import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { PatientDashboard } from './pages/PatientDashboard';
import { DoctorDashboard } from './pages/DoctorDashboard';
import { ReceptionistDashboard } from './pages/ReceptionistDashboard';
import { AdminDashboard } from './pages/AdminDashboard';

const MainContent: React.FC = () => {
  const { role } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-teal-500 selection:text-white">
      <Navbar />
      <main className="flex-1">
        {role === 'LANDING' && <LandingPage />}
        {role === 'PATIENT' && <PatientDashboard />}
        {role === 'DOCTOR' && <DoctorDashboard />}
        {role === 'RECEPTIONIST' && <ReceptionistDashboard />}
        {role === 'ADMIN' && <AdminDashboard />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-500 bg-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            MediLink Healthcare Platform • Team <strong className="text-teal-700 font-extrabold">Zero One</strong> • Smart India Hackathon 2026
          </p>
          <p className="text-slate-400 font-medium">
            Universal Health ID (ABHA) • Day 1 Newborn Record • MediLink Language Bridge
          </p>
        </div>
      </footer>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
};

export default App;
