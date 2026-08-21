import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { VernacularVoiceInput } from '../components/VernacularVoiceInput';
import { SmartClinicalAiView } from '../components/SmartClinicalAiView';
import { LanguageBridge } from '../components/LanguageBridge';
import { analyzeVernacularInput } from '../api/aiService';
import { AiClinicalAnalysis } from '../types';
import { 
  ShieldCheck, 
  Sparkles, 
  Activity, 
  Baby, 
  Stethoscope, 
  ArrowRight, 
  Lock,
  Globe,
  Database,
  UserCheck,
  Building2,
  BarChart3,
  Languages,
  HeartPulse,
  ChevronRight
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setRole } = useAuth();
  const [aiResult, setAiResult] = useState<AiClinicalAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const handleAnalyzeDemo = async (text: string) => {
    setIsAnalyzing(true);
    try {
      const res = await analyzeVernacularInput(text);
      setAiResult(res);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const scrollToPortals = () => {
    const el = document.getElementById('portals-gateway');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-16 py-8 px-4 max-w-7xl mx-auto">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl glass-card border border-teal-200/80 p-8 md:p-12 bg-gradient-to-br from-white via-teal-50/40 to-sky-50/50 shadow-md">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800 border border-teal-300 flex items-center space-x-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>SMART INDIA HACKATHON 2026</span>
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-300">
            MediLink Connected Health Platform
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-sm">
            TEAM ZERO ONE
          </span>
        </div>

        {/* Headline */}
        <div className="max-w-3xl space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            MediLink <br />
            <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">
              One Connected Healthcare Ecosystem
            </span>
          </h1>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed font-medium">
            Connecting patients, doctors, hospitals and administrators through a unified digital healthcare platform with 
            <strong> Universal Health ID (ABHA)</strong>, <strong>Day 1 Newborn Linkage</strong>, and <strong>MediLink Language Bridge</strong> for 2-way multilingual communication.
          </p>
        </div>

        {/* Hero CTAs */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            onClick={scrollToPortals}
            className="px-7 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-sm shadow-lg shadow-teal-600/25 flex items-center space-x-2 transition transform hover:-translate-y-0.5"
          >
            <span>Explore Portals</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>

          <button
            onClick={() => setRole('PATIENT')}
            className="px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-300 shadow-sm flex items-center space-x-2 transition"
          >
            <HeartPulse className="w-4 h-4 text-teal-600" />
            <span>View Platform</span>
          </button>
        </div>

        {/* SIH Key Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-200">
          <div className="p-3 rounded-xl bg-white/70 border border-slate-200">
            <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">ABDM Milestone</p>
            <p className="text-xl font-bold text-teal-700 font-mono">M1, M2 & M3</p>
          </div>
          <div className="p-3 rounded-xl bg-white/70 border border-slate-200">
            <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Diagnostic Savings</p>
            <p className="text-xl font-bold text-emerald-700 font-mono">~30% Reduction</p>
          </div>
          <div className="p-3 rounded-xl bg-white/70 border border-slate-200">
            <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Newborn EHR Link</p>
            <p className="text-xl font-bold text-sky-700 font-mono">Day 1 Auto-Link</p>
          </div>
          <div className="p-3 rounded-xl bg-white/70 border border-slate-200">
            <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Language Support</p>
            <p className="text-xl font-bold text-purple-700 font-mono">11+ Indian Languages</p>
          </div>
        </div>
      </section>

      {/* OVERVIEW PORTAL GATEWAY SECTION: Access MediLink */}
      <section id="portals-gateway" className="space-y-8 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="px-3.5 py-1 text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200 rounded-full inline-block">
            CENTRAL GATEWAY
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Access MediLink
          </h2>
          <p className="text-base text-slate-600 font-medium">
            Choose your portal to continue into the connected healthcare ecosystem.
          </p>
        </div>

        {/* 4 Equal-Sized Portal Cards: Responsive 2x2 Desktop / 1x4 Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Patient ABHA Portal (Teal/Cyan Accent) */}
          <div className="glass-card glass-card-hover rounded-2xl p-6 border border-teal-200 bg-white shadow-sm flex flex-col justify-between space-y-5 hover:border-teal-400 group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 font-bold shadow-sm group-hover:scale-105 transition">
                  <UserCheck className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200 rounded-full">
                  Patient Access
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-teal-700 transition">
                  Patient ABHA Portal
                </h3>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                  Manage your digital health identity, health records, appointments and personal healthcare information.
                </p>
              </div>
            </div>

            <button
              onClick={() => setRole('PATIENT')}
              className="w-full py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md shadow-teal-600/20 flex items-center justify-center space-x-2 transition"
            >
              <span>Open Patient Portal</span>
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Card 2: Doctor Desk (Professional Blue Accent) */}
          <div className="glass-card glass-card-hover rounded-2xl p-6 border border-sky-200 bg-white shadow-sm flex flex-col justify-between space-y-5 hover:border-sky-400 group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700 font-bold shadow-sm group-hover:scale-105 transition">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 text-xs font-bold bg-sky-50 text-sky-800 border border-sky-200 rounded-full">
                  Doctor Access
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-sky-700 transition">
                  Doctor Desk
                </h3>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                  Access patient records, clinical information, consultations, OPD workflow and AI-assisted clinical tools.
                </p>
              </div>
            </div>

            <button
              onClick={() => setRole('DOCTOR')}
              className="w-full py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md shadow-sky-600/20 flex items-center justify-center space-x-2 transition"
            >
              <span>Open Doctor Desk</span>
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Card 3: Hospital Operations (Green Accent) */}
          <div className="glass-card glass-card-hover rounded-2xl p-6 border border-emerald-200 bg-white shadow-sm flex flex-col justify-between space-y-5 hover:border-emerald-400 group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 font-bold shadow-sm group-hover:scale-105 transition">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full">
                  Hospital Access
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-emerald-700 transition">
                  Hospital Operations
                </h3>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                  Manage hospital workflows, departments, staff operations, appointments and day-to-day healthcare services.
                </p>
              </div>
            </div>

            <button
              onClick={() => setRole('RECEPTIONIST')}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center space-x-2 transition"
            >
              <span>Open Hospital Portal</span>
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Card 4: Admin Telemetry (Purple Accent) */}
          <div className="glass-card glass-card-hover rounded-2xl p-6 border border-purple-200 bg-white shadow-sm flex flex-col justify-between space-y-5 hover:border-purple-400 group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 font-bold shadow-sm group-hover:scale-105 transition">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 text-xs font-bold bg-purple-50 text-purple-800 border border-purple-200 rounded-full">
                  Admin Access
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-purple-700 transition">
                  Admin Telemetry
                </h3>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                  Monitor system activity, platform performance, users, hospitals, analytics and operational telemetry.
                </p>
              </div>
            </div>

            <button
              onClick={() => setRole('ADMIN')}
              className="w-full py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md shadow-purple-600/20 flex items-center justify-center space-x-2 transition"
            >
              <span>Open Admin Portal</span>
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>

        </div>
      </section>

      {/* FEATURE FEATURED SECTION: MediLink Language Bridge Interactive Showcase */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-extrabold text-slate-900 flex items-center space-x-2">
              <Languages className="w-6 h-6 text-teal-600" />
              <span>MediLink Language Bridge Showcase</span>
            </h3>
            <p className="text-xs text-slate-500">
              Interactive 2-way multilingual translation system between patients and doctors
            </p>
          </div>
          <span className="hidden sm:inline-block px-3 py-1 text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200 rounded-full">
            Live Interactive Demo
          </span>
        </div>

        <LanguageBridge initialRolePerspective="BOTH" />
      </section>

      {/* 4 Pillars of Solution */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
            Core Architecture & Solution Pillars
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Designed for pan-India healthcare interoperability aligned with Ayushman Bharat Digital Mission.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          <div className="glass-card rounded-2xl p-6 border border-slate-200 space-y-3 bg-white hover:border-teal-300 transition">
            <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">1. Universal Health ID</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              14-digit ABHA ID giving citizens lifetime ownership of their records across public & private hospitals.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-slate-200 space-y-3 bg-white hover:border-teal-300 transition">
            <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700 font-bold">
              <Baby className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">2. Record From Day One</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Automatic record linking for newborns in maternity wards directly attached to the mother's ABHA ID.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-slate-200 space-y-3 bg-white hover:border-teal-300 transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 font-bold">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">3. Unified Live In-Care</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Real-time patient queue, instant walk-in registration, and OPD workflow between doctors & receptionists.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-slate-200 space-y-3 bg-white hover:border-teal-300 transition">
            <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 font-bold">
              <Languages className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">4. Vernacular AI Layer</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Translates raw regional speech into doctor-ready structured medical notes and priority triage levels.
            </p>
          </div>

        </div>
      </section>

      {/* Interactive Speech AI Demo Component */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Spoken Vernacular Speech AI Layer</h3>
            <p className="text-xs text-slate-500">Test how patient regional speech is auto-structured into clinical views</p>
          </div>
          <span className="px-3 py-1 text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200 rounded-full">
            Speech & Triage Parser
          </span>
        </div>

        <VernacularVoiceInput onAnalyze={handleAnalyzeDemo} isLoading={isAnalyzing} />

        {aiResult && (
          <div className="mt-6">
            <SmartClinicalAiView analysis={aiResult} />
          </div>
        )}
      </section>

      {/* Feasibility & Security Technical Compliance */}
      <section className="glass-card rounded-2xl p-8 border border-slate-200 bg-white grid grid-cols-1 md:grid-cols-3 gap-8 shadow-sm">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-teal-700 font-bold text-sm">
            <Globe className="w-4 h-4" />
            <span>ABDM & FHIR Compliance</span>
          </div>
          <p className="text-xs text-slate-600">
            Built using HL7 FHIR schemas, lightweight Spring Boot REST adapters, and ABHA creation APIs.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-emerald-700 font-bold text-sm">
            <Lock className="w-4 h-4" />
            <span>AES-256 & OAuth 2.0 Security</span>
          </div>
          <p className="text-xs text-slate-600">
            End-to-end encrypted record transmission with Spring Security and Role-Based Access Control (RBAC).
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sky-700 font-bold text-sm">
            <Database className="w-4 h-4" />
            <span>Unified Master Index</span>
          </div>
          <p className="text-xs text-slate-600">
            Spring Boot microservices paired with MySQL primary storage and fast Redis session caching.
          </p>
        </div>
      </section>

    </div>
  );
};
