import React, { useState, useEffect } from 'react';
import { AbhaCard } from '../components/AbhaCard';
import { VernacularVoiceInput } from '../components/VernacularVoiceInput';
import { SmartClinicalAiView } from '../components/SmartClinicalAiView';
import { MedicalTimeline } from '../components/MedicalTimeline';
import { LanguageBridge } from '../components/LanguageBridge';
import { getAllPatients } from '../api/patientApi';
import { getRecordsByPatientId } from '../api/medicalRecordApi';
import { createAppointment } from '../api/appointmentApi';
import { analyzeVernacularInput } from '../api/aiService';
import { Patient, MedicalRecord, AiClinicalAnalysis } from '../types';
import { Calendar, Plus, UserCheck, CheckCircle2, Languages, Activity } from 'lucide-react';

export const PatientDashboard: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [activePatient, setActivePatient] = useState<Patient | null>(null);
  const [records, setRecords] = useState<MedicalRecord[]>([]);

  // Navigation tab inside Patient Portal: 'OVERVIEW' | 'LANGUAGE_BRIDGE' | 'EHR'
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'LANGUAGE_BRIDGE' | 'EHR'>('OVERVIEW');

  // Vernacular Input AI states
  const [aiAnalysis, setAiAnalysis] = useState<AiClinicalAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  // Book Appointment Form
  const [showBookModal, setShowBookModal] = useState<boolean>(false);
  const [reasonInput, setReasonInput] = useState<string>('');
  const [doctorIdInput, setDoctorIdInput] = useState<number>(1);
  const [isSubmittingAppt, setIsSubmittingAppt] = useState<boolean>(false);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

  useEffect(() => {
    loadPatientData();
  }, []);

  const loadPatientData = async () => {
    const pList = await getAllPatients();
    setPatients(pList);
    if (pList.length > 0) {
      setActivePatient(pList[0]);
      fetchPatientRecords(pList[0].id);
    }
  };

  const fetchPatientRecords = async (patientId: number) => {
    const rList = await getRecordsByPatientId(patientId);
    setRecords(rList);
  };

  const handlePatientSelect = (pId: number) => {
    const p = patients.find((pat) => pat.id === pId);
    if (p) {
      setActivePatient(p);
      fetchPatientRecords(p.id);
      setAiAnalysis(null);
    }
  };

  const handleAnalyzeSymptom = async (text: string) => {
    setIsAnalyzing(true);
    try {
      const res = await analyzeVernacularInput(text);
      setAiAnalysis(res);
      setReasonInput(res.chiefComplaint);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleBookAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePatient) return;
    setIsSubmittingAppt(true);

    try {
      await createAppointment({
        patientId: activePatient.id,
        patientName: `${activePatient.firstName} ${activePatient.lastName}`,
        patientAbha: activePatient.abhaNumber,
        doctorId: doctorIdInput,
        doctorName: doctorIdInput === 1 ? 'Dr. Anuj Pandey' : doctorIdInput === 2 ? 'Dr. Sunita Rao' : 'Dr. Vikram Seth',
        appointmentDate: '2026-08-17 02:00 PM',
        status: 'SCHEDULED',
        reason: reasonInput || 'General OPD Consult',
        triagePriority: aiAnalysis?.recommendedTriage || 'PRIORITY_2_SAME_DAY',
        rawVernacularComplaint: aiAnalysis?.rawText,
      });

      setBookingSuccess(true);
      setTimeout(() => {
        setBookingSuccess(false);
        setShowBookModal(false);
      }, 1800);
    } finally {
      setIsSubmittingAppt(false);
    }
  };

  if (!activePatient) {
    return (
      <div className="p-12 text-center text-slate-500 font-medium">Loading MediLink Patient ABHA Profile...</div>
    );
  }

  return (
    <div className="space-y-8 py-6 px-4 max-w-7xl mx-auto">
      
      {/* Patient Switcher & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card p-5 rounded-2xl border border-teal-200 bg-white shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center font-bold">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-extrabold text-slate-900 text-lg">Patient ABHA Portal</h2>
            <p className="text-xs text-slate-500">Manage Digital ABHA Identity, Multilingual Language Bridge, & EHR Timeline</p>
          </div>
        </div>

        {/* Switch patient dropdown & Tab Switcher */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Internal Navigation Tabs */}
          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl text-xs font-bold border border-slate-200">
            <button
              onClick={() => setActiveTab('OVERVIEW')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === 'OVERVIEW' ? 'bg-white text-teal-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Overview & ABHA
            </button>
            <button
              onClick={() => setActiveTab('LANGUAGE_BRIDGE')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center space-x-1 ${
                activeTab === 'LANGUAGE_BRIDGE' ? 'bg-white text-teal-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Languages className="w-3.5 h-3.5 text-teal-600" />
              <span>Language Bridge</span>
            </button>
            <button
              onClick={() => setActiveTab('EHR')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === 'EHR' ? 'bg-white text-teal-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              EHR Timeline
            </button>
          </div>

          <div className="flex items-center space-x-2 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-500 font-medium">Demo Patient:</span>
            <select
              value={activePatient.id}
              onChange={(e) => handlePatientSelect(Number(e.target.value))}
              className="rounded-lg bg-white border border-slate-300 p-1.5 text-xs font-bold text-teal-700 focus:outline-none cursor-pointer"
            >
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.firstName} {p.lastName} {p.isNewborn ? '(Day 1 Newborn)' : ''}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ABHA Digital Card Widget */}
      <AbhaCard patient={activePatient} onPrint={() => alert(`Saving digital ABHA Card for ${activePatient.firstName}`)} />

      {/* TAB CONTENT */}

      {activeTab === 'LANGUAGE_BRIDGE' ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-lg flex items-center space-x-2">
              <Languages className="w-5 h-5 text-teal-600" />
              <span>MediLink Language Bridge (Patient Portal)</span>
            </h3>
            <span className="px-3 py-1 text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200 rounded-full">
              Patient Preferred Language
            </span>
          </div>

          <LanguageBridge initialRolePerspective="PATIENT" />
        </div>
      ) : activeTab === 'EHR' ? (
        <div className="space-y-4">
          <MedicalTimeline records={records} />
        </div>
      ) : (
        <>
          {/* Main Action Bar: Vernacular Input & Quick Booking */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left 2 Cols: Vernacular Voice/Text Input */}
            <div className="lg:col-span-2 space-y-6">
              <VernacularVoiceInput onAnalyze={handleAnalyzeSymptom} isLoading={isAnalyzing} />

              {aiAnalysis && (
                <div className="space-y-4">
                  <SmartClinicalAiView analysis={aiAnalysis} />
                  
                  <div className="flex justify-end">
                    <button
                      onClick={() => setShowBookModal(true)}
                      className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md shadow-teal-600/20 flex items-center space-x-2 transition"
                    >
                      <Calendar className="w-4 h-4 text-white" />
                      <span>Book OPD Appointment with this Clinical Note</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Col: Quick Appointment Booking Card */}
            <div className="glass-card rounded-2xl p-6 border border-slate-200 bg-white flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center space-x-2 pb-3 mb-3 border-b border-slate-200">
                  <Calendar className="w-5 h-5 text-teal-600" />
                  <h3 className="font-extrabold text-slate-900 text-sm">Schedule OPD Appointment</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Connect directly with MediLink services to book consultations at Government or Private hospitals.
                </p>

                {/* Shortcut to Language Bridge */}
                <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 space-y-1 mb-4">
                  <p className="text-xs font-bold flex items-center gap-1">
                    <Languages className="w-4 h-4 text-teal-600" /> Language Barrier?
                  </p>
                  <p className="text-[11px] text-slate-600">
                    Communicate with doctors in Hindi, Tamil, Bengali, or 8+ other regional languages.
                  </p>
                  <button
                    onClick={() => setActiveTab('LANGUAGE_BRIDGE')}
                    className="text-xs font-bold text-teal-700 hover:underline pt-1 inline-block"
                  >
                    Open Language Bridge &rarr;
                  </button>
                </div>
              </div>

              <button
                onClick={() => setShowBookModal(true)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-bold text-xs shadow-md shadow-teal-600/20 flex items-center justify-center space-x-2 transition"
              >
                <Plus className="w-4 h-4 text-white" />
                <span>Book New Appointment</span>
              </button>
            </div>

          </div>

          {/* EHR Medical History Timeline */}
          <MedicalTimeline records={records} />
        </>
      )}

      {/* Modal for Booking Appointment */}
      {showBookModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="glass-card rounded-2xl border border-slate-200 p-6 max-w-md w-full relative shadow-2xl bg-white">
            
            <h3 className="font-extrabold text-slate-900 text-base mb-1">Book OPD Appointment</h3>
            <p className="text-xs text-slate-500 mb-4">Linked to ABHA: <strong className="font-mono text-teal-700">{activePatient.abhaNumber}</strong></p>

            {bookingSuccess ? (
              <div className="p-6 text-center text-emerald-700 space-y-2 bg-emerald-50 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
                <h4 className="font-extrabold text-lg text-slate-900">Appointment Scheduled!</h4>
                <p className="text-xs text-slate-600">Added to doctor OPD live queue.</p>
              </div>
            ) : (
              <form onSubmit={handleBookAppointment} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Select Doctor / Department</label>
                  <select
                    value={doctorIdInput}
                    onChange={(e) => setDoctorIdInput(Number(e.target.value))}
                    className="w-full rounded-lg bg-slate-50 border border-slate-300 p-2.5 text-slate-900 focus:border-teal-500 outline-none font-medium"
                  >
                    <option value={1}>Dr. Anuj Pandey (Gastroenterology / OPD Room 104)</option>
                    <option value={2}>Dr. Sunita Rao (Pediatrics & Maternity)</option>
                    <option value={3}>Dr. Vikram Seth (Pulmonology & Emergency)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Reason / Symptoms Summary</label>
                  <textarea
                    rows={3}
                    required
                    value={reasonInput}
                    onChange={(e) => setReasonInput(e.target.value)}
                    placeholder="Briefly state symptoms..."
                    className="w-full rounded-lg bg-slate-50 border border-slate-300 p-2.5 text-slate-900 focus:border-teal-500 outline-none resize-none font-medium"
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowBookModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingAppt}
                    className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold shadow-md shadow-teal-600/20 transition"
                  >
                    {isSubmittingAppt ? 'Booking...' : 'Confirm Appointment'}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
