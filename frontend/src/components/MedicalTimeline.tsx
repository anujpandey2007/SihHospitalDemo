import React from 'react';
import { MedicalRecord } from '../types';
import { Calendar, Stethoscope, Pill, FileCheck, ShieldCheck, Clock } from 'lucide-react';

interface MedicalTimelineProps {
  records: MedicalRecord[];
}

export const MedicalTimeline: React.FC<MedicalTimelineProps> = ({ records }) => {
  if (!records.length) {
    return (
      <div className="glass-card rounded-2xl p-8 text-center border border-slate-200 bg-white">
        <Clock className="w-10 h-10 text-slate-400 mx-auto mb-3" />
        <h4 className="text-sm font-bold text-slate-700">No Historical EHR Records Found</h4>
        <p className="text-xs text-slate-500 mt-1">This universal health ID has no prior medical consultations logged yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          <span>Unified EHR Medical History (From Day 1 of Birth)</span>
        </h3>
        <span className="text-xs text-slate-500 font-mono">{records.length} Total Consultation(s)</span>
      </div>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
        {records.map((record) => (
          <div key={record.id} className="relative group">
            {/* Timeline Circle Bullet */}
            <div className="absolute -left-[29px] top-1.5 w-4 h-4 rounded-full bg-teal-600 border-4 border-white shadow-sm" />

            {/* EHR Record Card */}
            <div className="glass-card rounded-2xl p-5 border border-slate-200 bg-white group-hover:border-teal-300 transition">
              
              {/* Top info bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-slate-200 gap-2">
                <div className="flex items-center space-x-2 text-xs text-slate-600">
                  <Calendar className="w-3.5 h-3.5 text-teal-600" />
                  <span className="font-semibold text-slate-900">{record.dateCreated}</span>
                  <span>•</span>
                  <Stethoscope className="w-3.5 h-3.5 text-slate-500" />
                  <span>{record.doctorName || 'Attending Physician'}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded ${
                    record.paymentStatus === 'PAID'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : record.paymentStatus === 'WAIVED'
                      ? 'bg-sky-50 text-sky-700 border border-sky-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {record.paymentStatus}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-semibold bg-slate-100 text-slate-700 rounded border border-slate-200">
                    EHR #{record.id}
                  </span>
                </div>
              </div>

              {/* Diagnosis & Symptoms */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 block mb-1 uppercase">
                    CHIEF COMPLAINT & SYMPTOMS
                  </span>
                  <p className="font-bold text-slate-900">{record.chiefComplaint}</p>
                  <p className="text-slate-600 mt-1">{record.symptoms}</p>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-slate-400 block mb-1 uppercase">
                    SUSPECTED IMPRESSION
                  </span>
                  <p className="font-bold text-teal-700">{record.suspectedImpression}</p>
                </div>
              </div>

              {/* Prescription Box */}
              {record.prescription && (
                <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <div className="flex items-center space-x-1.5 text-teal-800 font-bold mb-1.5">
                    <Pill className="w-3.5 h-3.5 text-teal-600" />
                    <span>Rx / Digital Prescription Notes:</span>
                  </div>
                  <pre className="font-sans text-slate-800 whitespace-pre-wrap leading-relaxed">
                    {record.prescription}
                  </pre>
                </div>
              )}

              {/* Doctor Notes */}
              {record.notes && (
                <div className="mt-3 text-[11px] text-slate-600 flex items-start space-x-1.5 font-medium">
                  <FileCheck className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Doctor Advice:</strong> {record.notes}</span>
                </div>
              )}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
