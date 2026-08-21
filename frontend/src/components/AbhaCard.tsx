import React from 'react';
import { Patient } from '../types';
import { QrCode, ShieldCheck, Download, Share2, Baby, Sparkles } from 'lucide-react';

interface AbhaCardProps {
  patient: Patient;
  onPrint?: () => void;
}

export const AbhaCard: React.FC<AbhaCardProps> = ({ patient, onPrint }) => {
  return (
    <div className="relative group overflow-hidden rounded-2xl glass-card border border-teal-200 p-6 bg-gradient-to-br from-white via-teal-50/30 to-sky-50/40 shadow-md">
      
      {/* Background Decorative Accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Card Header: ABDM & Govt Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-teal-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">
                Universal Health ID (ABHA)
              </h3>
              <span className="px-2.5 py-0.5 text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-teal-600" /> Active
              </span>
            </div>
            <p className="text-xs text-slate-500">MediLink ABDM Milestone 1 Verified</p>
          </div>
        </div>

        {patient.isNewborn && (
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
            <Baby className="w-4 h-4 text-amber-600" />
            <span>Day 1 Newborn</span>
          </div>
        )}
      </div>

      {/* Card Body: Details & QR Code */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-5 items-center">
        
        {/* Patient Core Info */}
        <div className="sm:col-span-2 space-y-3">
          <div>
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">FULL CITIZEN NAME</p>
            <h4 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {patient.firstName} {patient.lastName}
            </h4>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-1">
            <div>
              <p className="text-[11px] text-slate-400 font-bold uppercase">14-DIGIT ABHA NUMBER</p>
              <p className="text-base font-mono font-bold text-teal-700 tracking-wider">
                {patient.abhaNumber}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-bold uppercase">ABHA ADDRESS</p>
              <p className="text-xs font-mono font-bold text-slate-800">
                {patient.abhaAddress}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-700 pt-1">
            <div>
              <span className="text-slate-500 font-medium">DOB:</span> <strong className="text-slate-900 font-bold">{patient.dateOfBirth}</strong>
            </div>
            <div>
              <span className="text-slate-500 font-medium">GENDER:</span> <strong className="text-slate-900 font-bold">{patient.gender}</strong>
            </div>
            <div>
              <span className="text-slate-500 font-medium">BLOOD GROUP:</span> <strong className="text-teal-700 font-bold">{patient.bloodGroup}</strong>
            </div>
          </div>

          {patient.motherAbhaNumber && (
            <div className="mt-2 p-2.5 rounded-xl bg-teal-50 border border-teal-200 flex items-center space-x-2 text-xs text-teal-900 font-semibold">
              <Baby className="w-4 h-4 text-teal-600 flex-shrink-0" />
              <span>Mother's ABHA Linked: <strong className="font-mono text-teal-950">{patient.motherAbhaNumber}</strong></span>
            </div>
          )}
        </div>

        {/* QR Code & Actions */}
        <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="w-28 h-28 bg-white p-2 rounded-lg flex items-center justify-center border border-slate-200 shadow-inner">
            <QrCode className="w-24 h-24 text-slate-900" />
          </div>
          <p className="text-[10px] text-slate-500 mt-2 text-center font-mono">Scan for EHR Record Exchange</p>
          
          <div className="flex items-center space-x-2 mt-3 w-full">
            <button
              onClick={onPrint}
              className="flex-1 py-2 px-2 text-xs font-bold rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 flex items-center justify-center space-x-1 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Save Card</span>
            </button>
            <button
              onClick={() => alert(`Sharing ABHA Digital Health Card for ${patient.firstName}`)}
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 flex items-center justify-center transition"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Footer info line */}
      <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-medium">
        <span>Lifetime Health Record Ownership • Starts Day 1 of Birth</span>
        <span className="text-teal-700 font-bold font-mono">Verified by MediLink Ecosystem</span>
      </div>

    </div>
  );
};
