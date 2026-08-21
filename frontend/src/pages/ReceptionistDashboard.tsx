import React, { useState, useEffect } from 'react';
import { getAllPatients, createPatient } from '../api/patientApi';
import { getAllAppointments } from '../api/appointmentApi';
import { NewbornRegistrationModal } from '../components/NewbornRegistrationModal';
import { Patient, Appointment } from '../types';
import { Building2, UserPlus, Baby, CheckCircle2, QrCode, Search } from 'lucide-react';

export const ReceptionistDashboard: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Walk-in Registration form
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [dob, setDob] = useState<string>('1998-04-12');
  const [gender, setGender] = useState<'MALE' | 'FEMALE' | 'OTHER'>('MALE');
  const [bloodGroup, setBloodGroup] = useState<string>('O+');
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [regSuccess, setRegSuccess] = useState<boolean>(false);

  // Newborn Modal
  const [showNewbornModal, setShowNewbornModal] = useState<boolean>(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [pList, aList] = await Promise.all([getAllPatients(), getAllAppointments()]);
    setPatients(pList);
    setAppointments(aList);
  };

  const handleRegisterWalkIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const generatedAbha = `91-${randomSuffix}-4829-${randomSuffix}`;

    try {
      const newP = await createPatient({
        firstName,
        lastName,
        phone: phone || '+91 98000 00000',
        email: email || `${firstName.toLowerCase()}@example.com`,
        dateOfBirth: dob,
        gender,
        bloodGroup,
        abhaNumber: generatedAbha,
        abhaAddress: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@abdm`,
      });

      setPatients([newP, ...patients]);
      setRegSuccess(true);
      setTimeout(() => {
        setRegSuccess(false);
        setFirstName('');
        setLastName('');
        setPhone('');
        setEmail('');
      }, 2000);
    } finally {
      setIsRegistering(false);
    }
  };

  const handleNewbornRegister = async (patientData: Omit<Patient, 'id'>) => {
    const newP = await createPatient(patientData);
    setPatients([newP, ...patients]);
  };

  const filteredPatients = patients.filter(
    (p) =>
      p.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.abhaNumber.includes(searchTerm)
  );

  return (
    <div className="space-y-8 py-6 px-4 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="glass-card p-5 rounded-2xl border border-emerald-200 bg-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center font-bold">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-extrabold text-slate-900 text-lg">Hospital Operations & ABHA Registrar</h2>
            <p className="text-xs text-slate-500">Walk-in Intake, Instant ABHA Generation, & Day 1 Newborn Linker</p>
          </div>
        </div>

        {/* Day 1 Newborn Trigger */}
        <button
          onClick={() => setShowNewbornModal(true)}
          className="px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-bold text-xs flex items-center space-x-2 transition shadow-sm"
        >
          <Baby className="w-4 h-4 text-amber-600" />
          <span>Day 1 Newborn Linker</span>
        </button>
      </div>

      {/* Main Grid: Left Registration vs Right Patient Roster */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Walk-in Registration & ABHA Generation */}
        <div className="glass-card rounded-2xl p-6 border border-slate-200 bg-white shadow-sm space-y-4">
          <div className="flex items-center space-x-2 pb-3 border-b border-slate-200">
            <UserPlus className="w-5 h-5 text-teal-600" />
            <h3 className="font-extrabold text-slate-900 text-sm">Register Walk-in Patient & Issue ABHA</h3>
          </div>

          {regSuccess ? (
            <div className="p-6 text-center text-emerald-700 space-y-2 bg-emerald-50 rounded-xl border border-emerald-200">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-extrabold text-base text-slate-900">Universal Health ID Issued!</h4>
              <p className="text-xs text-slate-600">Added to MediLink hospital master index.</p>
            </div>
          ) : (
            <form onSubmit={handleRegisterWalkIn} className="space-y-3 text-xs">
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full rounded-lg bg-slate-50 border border-slate-300 p-2.5 text-slate-900 focus:border-teal-500 outline-none font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full rounded-lg bg-slate-50 border border-slate-300 p-2.5 text-slate-900 focus:border-teal-500 outline-none font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Mobile Number</label>
                <input
                  type="text"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-lg bg-slate-50 border border-slate-300 p-2.5 text-slate-900 focus:border-teal-500 outline-none font-mono font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full rounded-lg bg-slate-50 border border-slate-300 p-2.5 text-slate-900 focus:border-teal-500 outline-none font-medium"
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Blood Group</label>
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="w-full rounded-lg bg-slate-50 border border-slate-300 p-2.5 text-slate-900 focus:border-teal-500 outline-none font-medium"
                  >
                    <option value="O+">O+</option>
                    <option value="B+">B+</option>
                    <option value="A+">A+</option>
                    <option value="AB+">AB+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  required
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full rounded-lg bg-slate-50 border border-slate-300 p-2.5 text-slate-900 focus:border-teal-500 outline-none font-medium"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isRegistering}
                  className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold shadow-md shadow-teal-600/20 flex items-center justify-center space-x-2 transition"
                >
                  <QrCode className="w-4 h-4 text-white" />
                  <span>{isRegistering ? 'Generating ABHA...' : 'Issue Universal ABHA ID'}</span>
                </button>
              </div>

            </form>
          )}
        </div>

        {/* Right 2 Columns: Registered Patients & OPD Queue Roster */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="glass-card rounded-2xl p-6 border border-slate-200 bg-white shadow-sm space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-3">
              <h3 className="font-extrabold text-slate-900 text-sm">Universal Health Registry ({patients.length})</h3>
              
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search name or ABHA..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-3 py-1.5 rounded-lg bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:border-teal-500 outline-none font-medium"
                />
              </div>
            </div>

            <div className="space-y-3">
              {filteredPatients.map((p) => (
                <div
                  key={p.id}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-extrabold text-sm text-slate-900">{p.firstName} {p.lastName}</span>
                      {p.isNewborn && (
                        <span className="px-2.5 py-0.5 text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 rounded-full flex items-center gap-1">
                          <Baby className="w-3 h-3 text-amber-600" /> Day 1 Newborn
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-mono text-teal-700 font-bold mt-0.5">ABHA # {p.abhaNumber}</p>
                    <p className="text-[11px] text-slate-600 mt-1 font-medium">
                      DOB: {p.dateOfBirth} • Gender: {p.gender} • Blood: <strong className="text-teal-700">{p.bloodGroup}</strong>
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => alert(`Printing Token & ABHA Slip for ${p.firstName}`)}
                      className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold border border-slate-300 shadow-sm transition"
                    >
                      Print Token Slip
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

      {/* Newborn Modal Component */}
      <NewbornRegistrationModal
        isOpen={showNewbornModal}
        onClose={() => setShowNewbornModal(false)}
        onRegister={handleNewbornRegister}
      />

    </div>
  );
};
