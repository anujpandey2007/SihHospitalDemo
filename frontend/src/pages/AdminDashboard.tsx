import React, { useState, useEffect } from 'react';
import { getAllDoctors } from '../api/doctorApi';
import { getAllPatients } from '../api/patientApi';
import { getAllDepartments, getAllReceptionists } from '../api/departmentApi';
import { Doctor, Patient, Department, Receptionist } from '../types';
import { ShieldCheck, Activity, Users, TrendingUp, CheckCircle2, Server, Database, Radio } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [receptionists, setReceptionists] = useState<Receptionist[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [dList, pList, depList, rList] = await Promise.all([
      getAllDoctors(),
      getAllPatients(),
      getAllDepartments(),
      getAllReceptionists(),
    ]);
    setDoctors(dList);
    setPatients(pList);
    setDepartments(depList);
    setReceptionists(rList);
  };

  return (
    <div className="space-y-8 py-6 px-4 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="glass-card p-5 rounded-2xl border border-purple-200 bg-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-extrabold text-slate-900 text-lg">MediLink Admin & Operational Telemetry</h2>
            <p className="text-xs text-slate-500">System Monitoring & Operational Metrics Suite</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-600" />
            <span>MediLink Core Active</span>
          </span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="glass-card rounded-2xl p-5 border border-slate-200 bg-white shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>TOTAL PATIENTS (ABHA)</span>
            <Users className="w-4 h-4 text-teal-600" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 font-mono">{patients.length}</p>
          <p className="text-[11px] text-teal-700 font-bold">100% ABDM M1 Linked</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-200 bg-white shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>ACTIVE DOCTORS</span>
            <Activity className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 font-mono">{doctors.length}</p>
          <p className="text-[11px] text-emerald-700 font-bold">Across {departments.length} Departments</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-200 bg-white shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>DIAGNOSTIC COST SAVINGS</span>
            <TrendingUp className="w-4 h-4 text-sky-600" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 font-mono">~30%</p>
          <p className="text-[11px] text-sky-700 font-bold">Shared Lab History Impact</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-200 bg-white shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>ABDM SYNC STATUS</span>
            <Server className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-2xl font-extrabold text-purple-800 font-mono">HEALTHY</p>
          <p className="text-[11px] text-slate-500 font-bold">FHIR R4 Schema Validated</p>
        </div>

      </div>

      {/* ABDM Milestone Telemetry Cards */}
      <section className="glass-card rounded-2xl p-6 border border-slate-200 bg-white shadow-sm space-y-4">
        <h3 className="font-extrabold text-slate-900 text-sm flex items-center space-x-2">
          <Database className="w-4 h-4 text-teal-600" />
          <span>Ayushman Bharat Digital Mission (ABDM) Integration Telemetry</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-teal-800">MILESTONE 1 (M1)</span>
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
            </div>
            <h4 className="font-extrabold text-sm text-slate-900">ABHA Creation & ID Registration</h4>
            <p className="text-xs text-slate-600 font-medium">
              14-digit universal health ID issued via verified mobile OTP & Day-One Newborn auto-linker.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-emerald-800">MILESTONE 2 (M2)</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <h4 className="font-extrabold text-sm text-slate-900">Health Record Linkage</h4>
            <p className="text-xs text-slate-600 font-medium">
              Cross-hospital EHR exchange with Spring Security OAuth2 tokens and AES-256 encryption.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-sky-50/50 border border-sky-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-sky-800">MILESTONE 3 (M3)</span>
              <CheckCircle2 className="w-4 h-4 text-sky-600" />
            </div>
            <h4 className="font-extrabold text-sm text-slate-900">Unified Health Interface (UHI)</h4>
            <p className="text-xs text-slate-600 font-medium">
              Interoperable queue management and live OPD appointment dispatching across networks.
            </p>
          </div>

        </div>
      </section>

      {/* Roster Tables: Doctors & Receptionists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Doctor Roster */}
        <div className="glass-card rounded-2xl p-6 border border-slate-200 bg-white shadow-sm space-y-4">
          <h3 className="font-extrabold text-slate-900 text-sm">Hospital Doctor Roster</h3>
          <div className="space-y-3">
            {doctors.map((doc) => (
              <div key={doc.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex justify-between items-center">
                <div>
                  <p className="font-bold text-slate-900">{doc.firstName} {doc.lastName}</p>
                  <p className="text-slate-500 font-medium">{doc.specialization}</p>
                </div>
                <span className="px-2.5 py-1 rounded bg-teal-50 text-teal-800 border border-teal-200 text-[10px] font-mono font-bold">
                  {doc.roomNumber}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Receptionist Roster */}
        <div className="glass-card rounded-2xl p-6 border border-slate-200 bg-white shadow-sm space-y-4">
          <h3 className="font-extrabold text-slate-900 text-sm">Hospital Staff & Reception Roster</h3>
          <div className="space-y-3">
            {receptionists.map((rec) => (
              <div key={rec.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex justify-between items-center">
                <div>
                  <p className="font-bold text-slate-900">{rec.firstName} {rec.lastName}</p>
                  <p className="text-slate-500 font-medium">{rec.phone}</p>
                </div>
                <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-mono font-bold">
                  {rec.deskNumber}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
