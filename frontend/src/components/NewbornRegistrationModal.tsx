import React, { useState } from 'react';
import { Patient } from '../types';
import { Baby, X, Heart, Sparkles } from 'lucide-react';

interface NewbornRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (patient: Omit<Patient, 'id'>) => void;
}

export const NewbornRegistrationModal: React.FC<NewbornRegistrationModalProps> = ({
  isOpen,
  onClose,
  onRegister,
}) => {
  const [babyName, setBabyName] = useState('Baby of Priya Verma');
  const [motherAbha, setMotherAbha] = useState('91-5510-8832-9012');
  const [gender, setGender] = useState<'MALE' | 'FEMALE'>('MALE');
  const [bloodGroup, setBloodGroup] = useState('B+');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newAbha = `91-99${randomSuffix.toString().slice(0, 2)}-${randomSuffix}-0001`;

    onRegister({
      firstName: babyName,
      lastName: 'Verma',
      email: 'maternal.care@hospital.gov.in',
      phone: '+91 98123 76543',
      dateOfBirth: new Date().toISOString().split('T')[0],
      gender,
      bloodGroup,
      abhaNumber: newAbha,
      abhaAddress: `newborn.${randomSuffix}@abdm`,
      motherAbhaNumber: motherAbha,
      isNewborn: true,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="glass-card rounded-2xl border border-slate-200 p-6 max-w-md w-full relative shadow-2xl bg-white animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 pb-4 mb-4 border-b border-slate-200">
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
            <Baby className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">Day 1 Newborn Universal ABHA Linker</h3>
            <p className="text-xs text-slate-500">Digital Record From Day One (Maternity Ward Auto-Link)</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          <div>
            <label className="block font-bold text-slate-700 mb-1">Newborn Name / Label</label>
            <input
              type="text"
              required
              value={babyName}
              onChange={(e) => setBabyName(e.target.value)}
              className="w-full rounded-lg bg-slate-50 border border-slate-300 p-2.5 text-slate-900 focus:border-teal-500 outline-none font-medium"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Mother's 14-Digit ABHA Number</label>
            <input
              type="text"
              required
              value={motherAbha}
              onChange={(e) => setMotherAbha(e.target.value)}
              className="w-full rounded-lg bg-slate-50 border border-slate-300 p-2.5 text-teal-700 font-mono font-bold focus:border-teal-500 outline-none"
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
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Blood Group</label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full rounded-lg bg-slate-50 border border-slate-300 p-2.5 text-slate-900 focus:border-teal-500 outline-none font-medium"
              >
                <option value="B+">B+</option>
                <option value="O+">O+</option>
                <option value="A+">A+</option>
                <option value="AB+">AB+</option>
              </select>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 space-y-1">
            <div className="flex items-center space-x-1.5 font-bold">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>MediLink Auto-Linking</span>
            </div>
            <p className="text-[11px] text-slate-600">
              Instantly issues a lifetime Universal Health ID starting from Day 1 of birth, cross-linked with the mother's record.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold shadow-md shadow-teal-600/20 flex items-center space-x-1.5 transition"
            >
              <Heart className="w-4 h-4 text-white" />
              <span>Register & Issue ABHA ID</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
