import React, { useState, useEffect } from 'react';
import { getAllAppointments, updateAppointmentStatus } from '../api/appointmentApi';
import { createMedicalRecord } from '../api/medicalRecordApi';
import { analyzeVernacularInput } from '../api/aiService';
import { SmartClinicalAiView } from '../components/SmartClinicalAiView';
import { LanguageBridge } from '../components/LanguageBridge';
import { Appointment, AiClinicalAnalysis } from '../types';
import { Stethoscope, User, Clock, CheckCircle2, AlertTriangle, ShieldAlert, FileText, Pill, Send, Sparkles, Languages } from 'lucide-react';

export const DoctorDashboard: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null);

  // Tab mode in Doctor Desk: 'CLINICAL_OPD' | 'LANGUAGE_BRIDGE'
  const [activeTab, setActiveTab] = useState<'CLINICAL_OPD' | 'LANGUAGE_BRIDGE'>('CLINICAL_OPD');

  // AI Auto-Structuring state
  const [aiAnalysis, setAiAnalysis] = useState<AiClinicalAnalysis | null>(null);
  const [isSynthesizing, setIsSynthesizing] = useState<boolean>(false);

  // Prescription Form state
  const [chiefComplaint, setChiefComplaint] = useState<string>('');
  const [symptoms, setSymptoms] = useState<string>('');
  const [suspectedImpression, setSuspectedImpression] = useState<string>('');
  const [prescription, setPrescription] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [publishSuccess, setPublishSuccess] = useState<boolean>(false);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    const list = await getAllAppointments();
    setAppointments(list);
    if (list.length > 0) {
      handleSelectAppointment(list[0]);
    }
  };

  const handleSelectAppointment = async (appt: Appointment) => {
    setSelectedAppt(appt);
    setPublishSuccess(false);

    if (appt.rawVernacularComplaint) {
      setIsSynthesizing(true);
      try {
        const analysis = await analyzeVernacularInput(appt.rawVernacularComplaint);
        setAiAnalysis(analysis);
        setChiefComplaint(analysis.chiefComplaint);
        setSymptoms(analysis.symptoms.join(', '));
        setSuspectedImpression(analysis.suspectedImpression);
        setPrescription('Tab. Paracetamol 650mg TDS\nTab. ORS Sachet BD');
        setNotes('Advised light diet and fluids. Review after 48h.');
      } finally {
        setIsSynthesizing(false);
      }
    } else {
      setAiAnalysis(null);
      setChiefComplaint(appt.reason);
      setSymptoms(appt.reason);
      setSuspectedImpression('Clinical evaluation pending');
      setPrescription('');
      setNotes('');
    }
  };

  const handlePublishRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAppt) return;

    setIsPublishing(true);
    try {
      await createMedicalRecord({
        patientId: selectedAppt.patientId,
        doctorId: selectedAppt.doctorId,
        doctorName: 'Dr. Anuj Pandey',
        appointmentId: selectedAppt.id,
        dateCreated: new Date().toLocaleString(),
        chiefComplaint,
        symptoms,
        suspectedImpression,
        prescription,
        notes,
        paymentStatus: 'PAID',
        triagePriority: selectedAppt.triagePriority || 'PRIORITY_2_SAME_DAY',
      });

      await updateAppointmentStatus(selectedAppt.id, 'COMPLETED');
      setPublishSuccess(true);
      
      const updated = appointments.map((a) =>
        a.id === selectedAppt.id ? { ...a, status: 'COMPLETED' as const } : a
      );
      setAppointments(updated);
    } finally {
      setIsPublishing(false);
    }
  };

  const getTriageBadge = (priority?: string) => {
    switch (priority) {
      case 'PRIORITY_1_EMERGENCY':
        return (
          <span className="px-2 py-0.5 text-[10px] font-bold bg-red-50 text-red-700 border border-red-200 rounded flex items-center gap-1">
            <ShieldAlert className="w-3 h-3 text-red-600" /> P1 Emergency
          </span>
        );
      case 'PRIORITY_2_SAME_DAY':
        return (
          <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 rounded flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-amber-600" /> P2 Same Day
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> P3 Routine
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 py-6 px-4 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="glass-card p-5 rounded-2xl border border-sky-200 bg-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-700 border border-sky-200 flex items-center justify-center font-bold">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-extrabold text-slate-900 text-lg">Doctor Desk AI Clinical Workspace</h2>
            <p className="text-xs text-slate-500">Dr. Anuj Pandey • Gastroenterology & OPD Room 104</p>
          </div>
        </div>

        {/* Tab & Shift indicators */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl text-xs font-bold border border-slate-200">
            <button
              onClick={() => setActiveTab('CLINICAL_OPD')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === 'CLINICAL_OPD' ? 'bg-white text-sky-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              OPD Workspace
            </button>
            <button
              onClick={() => setActiveTab('LANGUAGE_BRIDGE')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center space-x-1 ${
                activeTab === 'LANGUAGE_BRIDGE' ? 'bg-white text-sky-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Languages className="w-3.5 h-3.5 text-sky-600" />
              <span>Language Bridge</span>
            </button>
          </div>

          <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-sky-50 text-sky-800 border border-sky-200">
            OPD Live Shift: Morning
          </span>
        </div>
      </div>

      {activeTab === 'LANGUAGE_BRIDGE' ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-lg flex items-center space-x-2">
              <Languages className="w-5 h-5 text-sky-600" />
              <span>MediLink Language Bridge (Doctor OPD Perspective)</span>
            </h3>
            <span className="px-3 py-1 text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200 rounded-full">
              Doctor Preferred Language: English
            </span>
          </div>

          <LanguageBridge initialRolePerspective="DOCTOR" />
        </div>
      ) : (
        /* Main Grid: Left Queue vs Right Workspace */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Patient Queue */}
          <div className="glass-card rounded-2xl p-5 border border-slate-200 bg-white shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
                <User className="w-4 h-4 text-teal-600" />
                <span>Live Patient Queue ({appointments.length})</span>
              </h3>
              <span className="text-[11px] text-slate-500 font-mono">Real-time OPD</span>
            </div>

            <div className="space-y-3">
              {appointments.map((appt) => {
                const isSelected = selectedAppt?.id === appt.id;
                return (
                  <div
                    key={appt.id}
                    onClick={() => handleSelectAppointment(appt)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition ${
                      isSelected
                        ? 'bg-sky-50/70 border-sky-300 shadow-sm'
                        : 'bg-white hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-extrabold text-xs text-slate-900">{appt.patientName}</span>
                      {getTriageBadge(appt.triagePriority)}
                    </div>

                    <p className="text-[11px] font-mono text-teal-700 font-bold mb-1">
                      ABHA: {appt.patientAbha || '91-4829-1092-3841'}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-slate-500">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{appt.appointmentDate}</span>
                      </span>

                      <span className={`font-bold ${
                        appt.status === 'COMPLETED' ? 'text-emerald-700' : 'text-amber-700'
                      }`}>
                        {appt.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right 2 Columns: Doctor AI Clinical Workspace & Record Publisher */}
          <div className="lg:col-span-2 space-y-6">
            
            {selectedAppt ? (
              <>
                {/* Selected Patient Banner */}
                <div className="glass-card p-5 rounded-2xl border border-sky-200 bg-gradient-to-r from-sky-50/60 via-white to-teal-50/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
                  <div>
                    <span className="text-[10px] font-extrabold text-sky-700 uppercase tracking-wider">ACTIVE CONSULTATION</span>
                    <h3 className="text-xl font-extrabold text-slate-900">{selectedAppt.patientName}</h3>
                    <p className="text-xs text-slate-600 font-mono">ABHA Number: <strong className="text-teal-700 font-bold">{selectedAppt.patientAbha || '91-4829-1092-3841'}</strong></p>
                  </div>

                  <div className="flex items-center space-x-2">
                    {getTriageBadge(selectedAppt.triagePriority)}
                  </div>
                </div>

                {/* Vernacular Speech AI Layer View */}
                {isSynthesizing ? (
                  <div className="glass-card p-8 rounded-2xl text-center border border-slate-200 bg-white text-teal-700 animate-pulse">
                    <Sparkles className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                    <p className="text-xs font-bold">Synthesizing Spoken Vernacular Complaint via AI Layer...</p>
                  </div>
                ) : aiAnalysis ? (
                  <SmartClinicalAiView analysis={aiAnalysis} />
                ) : null}

                {/* Prescription & Medical Record Form */}
                <div className="glass-card rounded-2xl p-6 border border-slate-200 bg-white shadow-sm space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-teal-600" />
                      <h3 className="font-extrabold text-slate-900 text-sm">Write Medical Record & Digital Prescription</h3>
                    </div>
                    <span className="text-xs text-slate-500 font-medium">MediLink EHR API Connected</span>
                  </div>

                  {publishSuccess ? (
                    <div className="p-6 text-center text-emerald-700 space-y-2 bg-emerald-50 rounded-xl border border-emerald-200">
                      <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                      <h4 className="font-extrabold text-base text-slate-900">EHR Record Published Successfully!</h4>
                      <p className="text-xs text-slate-600">Added to patient's universal lifetime health timeline.</p>
                    </div>
                  ) : (
                    <form onSubmit={handlePublishRecord} className="space-y-4 text-xs">
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Chief Complaint</label>
                          <input
                            type="text"
                            required
                            value={chiefComplaint}
                            onChange={(e) => setChiefComplaint(e.target.value)}
                            className="w-full rounded-lg bg-slate-50 border border-slate-300 p-2.5 text-slate-900 focus:border-teal-500 outline-none font-medium"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Suspected Impression</label>
                          <input
                            type="text"
                            required
                            value={suspectedImpression}
                            onChange={(e) => setSuspectedImpression(e.target.value)}
                            className="w-full rounded-lg bg-slate-50 border border-slate-300 p-2.5 text-teal-800 font-bold focus:border-teal-500 outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Symptoms</label>
                        <input
                          type="text"
                          required
                          value={symptoms}
                          onChange={(e) => setSymptoms(e.target.value)}
                          className="w-full rounded-lg bg-slate-50 border border-slate-300 p-2.5 text-slate-900 focus:border-teal-500 outline-none font-medium"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1 flex items-center space-x-1">
                          <Pill className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Rx / Digital Prescription</span>
                        </label>
                        <textarea
                          rows={3}
                          required
                          value={prescription}
                          onChange={(e) => setPrescription(e.target.value)}
                          placeholder="Enter prescribed medicines, dosages, and duration..."
                          className="w-full rounded-lg bg-slate-50 border border-slate-300 p-2.5 text-slate-900 font-mono font-medium focus:border-teal-500 outline-none resize-none"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Doctor Notes & Advice</label>
                        <input
                          type="text"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          className="w-full rounded-lg bg-slate-50 border border-slate-300 p-2.5 text-slate-900 focus:border-teal-500 outline-none font-medium"
                        />
                      </div>

                      <div className="flex justify-end pt-2">
                        <button
                          type="submit"
                          disabled={isPublishing}
                          className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold shadow-md shadow-teal-600/20 flex items-center space-x-2 transition"
                        >
                          <Send className="w-4 h-4 text-white" />
                          <span>{isPublishing ? 'Publishing to EHR...' : 'Publish to Universal Health ID'}</span>
                        </button>
                      </div>

                    </form>
                  )}

                </div>
              </>
            ) : (
              <div className="glass-card p-12 text-center border border-slate-200 bg-white text-slate-500">
                Select a patient from the queue to start consultation.
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
};
