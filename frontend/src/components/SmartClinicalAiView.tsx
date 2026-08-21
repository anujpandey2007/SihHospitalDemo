import React from 'react';
import { AiClinicalAnalysis } from '../types';
import { Stethoscope, AlertTriangle, CheckCircle2, ShieldAlert, FileText, ArrowRight } from 'lucide-react';

interface SmartClinicalAiViewProps {
  analysis: AiClinicalAnalysis;
  onConfirmRecord?: () => void;
}

export const SmartClinicalAiView: React.FC<SmartClinicalAiViewProps> = ({ analysis, onConfirmRecord }) => {
  const triageStyles = {
    PRIORITY_1_EMERGENCY: {
      label: 'Priority 1 (Immediate Emergency Triage)',
      color: 'bg-red-50 text-red-800 border-red-200',
      badgeIcon: <ShieldAlert className="w-4 h-4 text-red-600" />
    },
    PRIORITY_2_SAME_DAY: {
      label: 'Priority 2 (Same-Day Consult)',
      color: 'bg-amber-50 text-amber-800 border-amber-200',
      badgeIcon: <AlertTriangle className="w-4 h-4 text-amber-600" />
    },
    PRIORITY_3_ROUTINE: {
      label: 'Priority 3 (Routine OPD Visit)',
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      badgeIcon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />
    }
  };

  const triage = triageStyles[analysis.recommendedTriage] || triageStyles.PRIORITY_3_ROUTINE;

  return (
    <div className="glass-card rounded-2xl p-6 border border-teal-200 bg-white shadow-md relative">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 border border-teal-200">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-extrabold text-slate-900 text-base tracking-wide uppercase font-sans">
                Doctor's Auto-Structured Clinical View
              </h3>
              <span className="px-2.5 py-0.5 text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200 rounded-full">
                Clinical AI Layer
              </span>
            </div>
            <p className="text-xs text-slate-500">Clinical-grade NLP synthesis of vernacular patient input</p>
          </div>
        </div>

        {/* Triage Badge */}
        <div className={`px-3 py-1.5 rounded-xl border flex items-center space-x-2 text-xs font-bold ${triage.color}`}>
          {triage.badgeIcon}
          <span>{triage.label}</span>
        </div>
      </div>

      {/* Side by side: Patient Input vs Auto-Structured EHR */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
        
        {/* Left Column: Raw Vernacular Input */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Raw Patient Vernacular Input
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-white border border-slate-200 text-slate-700 rounded">
                {analysis.language}
              </span>
            </div>
            <p className="text-sm font-medium text-slate-800 leading-relaxed italic bg-white p-3 rounded-lg border border-slate-200">
              "{analysis.rawText}"
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between font-medium">
            <span>Suggested Department: <strong className="text-slate-800">{analysis.suggestedDepartment}</strong></span>
            <span className="text-teal-700 font-bold">Side-by-Side Dual View</span>
          </div>
        </div>

        {/* Right Column: Auto-Structured Clinical EHR View */}
        <div className="space-y-4 p-4 rounded-xl bg-teal-50/30 border border-teal-100">
          
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              CHIEF COMPLAINT
            </span>
            <p className="text-sm font-bold text-teal-800 bg-white p-2.5 rounded-lg border border-teal-200">
              {analysis.chiefComplaint}
            </p>
          </div>

          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              EXTRACTED SYMPTOMS
            </span>
            <div className="flex flex-wrap gap-2">
              {analysis.symptoms.map((s, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-bold rounded-lg bg-white text-teal-800 border border-teal-200"
                >
                  • {s}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              SUSPECTED IMPRESSION
            </span>
            <p className="text-sm font-semibold text-slate-900 bg-white p-2.5 rounded-lg border border-slate-200">
              {analysis.suspectedImpression}
            </p>
          </div>

        </div>

      </div>

      {/* Confirmation & Publish Action */}
      {onConfirmRecord && (
        <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Doctor verification step before committing to permanent EHR record.
          </p>
          <button
            onClick={onConfirmRecord}
            className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md shadow-teal-600/20 flex items-center space-x-2 transition"
          >
            <FileText className="w-4 h-4 text-white" />
            <span>Accept & Write Medical Record</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>
      )}

    </div>
  );
};
