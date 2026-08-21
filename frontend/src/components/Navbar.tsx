import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Role } from '../types';
import { 
  Activity, 
  UserCheck, 
  Stethoscope, 
  ShieldCheck, 
  ChevronRight,
  Radio,
  Building2,
  HeartPulse
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { role, setRole } = useAuth();

  const roleLabels: Record<Role, { name: string; icon: React.ReactNode; color: string }> = {
    LANDING: { name: 'Overview', icon: <Activity className="w-4 h-4" />, color: 'bg-teal-50 text-teal-700 border-teal-200' },
    PATIENT: { name: 'Patient ABHA Portal', icon: <UserCheck className="w-4 h-4" />, color: 'bg-teal-50 text-teal-700 border-teal-200' },
    DOCTOR: { name: 'Doctor Desk', icon: <Stethoscope className="w-4 h-4" />, color: 'bg-sky-50 text-sky-700 border-sky-200' },
    RECEPTIONIST: { name: 'Hospital Operations', icon: <Building2 className="w-4 h-4" />, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    ADMIN: { name: 'Admin Telemetry', icon: <ShieldCheck className="w-4 h-4" />, color: 'bg-purple-50 text-purple-700 border-purple-200' },
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group" 
            onClick={() => setRole('LANDING')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-cyan-500 p-0.5 shadow-md shadow-teal-500/20 flex items-center justify-center transition group-hover:scale-105">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                <HeartPulse className="w-5 h-5 text-teal-600" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl text-slate-900 tracking-tight font-sans">
                  Medi<span className="text-teal-600">Link</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200 rounded-full">
                  SIH 2026
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Unified Healthcare Platform</p>
            </div>
          </div>

          {/* Role Nav Tabs */}
          <nav className="hidden lg:flex items-center space-x-1 bg-slate-100/80 p-1.5 rounded-xl border border-slate-200">
            {(['LANDING', 'PATIENT', 'DOCTOR', 'RECEPTIONIST', 'ADMIN'] as Role[]).map((r) => {
              const active = role === r;
              return (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    active
                      ? 'bg-teal-600 text-white shadow-md shadow-teal-600/25'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                  }`}
                >
                  {roleLabels[r].icon}
                  <span>{roleLabels[r].name}</span>
                </button>
              );
            })}
          </nav>

          {/* ABDM Live Status Pill & Role Badge */}
          <div className="flex items-center space-x-3">
            {/* Live Sync Status */}
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
              <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-600" />
              <span>ABDM Connected</span>
            </div>

            {/* Current Active Persona Badge */}
            <div className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border shadow-sm ${roleLabels[role].color}`}>
              <span>{roleLabels[role].name}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Nav Bar */}
      <div className="lg:hidden flex items-center justify-around bg-slate-50 py-2 border-t border-slate-200">
        {(['LANDING', 'PATIENT', 'DOCTOR', 'RECEPTIONIST', 'ADMIN'] as Role[]).map((r) => (
          <button
            key={r}
            onClick={() => setRole(r)}
            className={`p-2 rounded-lg text-xs flex flex-col items-center space-y-1 transition ${
              role === r ? 'text-teal-700 font-bold bg-teal-50 border border-teal-200' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {roleLabels[r].icon}
            <span className="text-[10px] font-semibold">{roleLabels[r].name.split(' ')[0]}</span>
          </button>
        ))}
      </div>
    </header>
  );
};
