import React, { useEffect, useState } from 'react';
import { getAllDoctors, Doctor } from '../api/doctorApi';
import { Shield, Activity, Users, Stethoscope, Plus } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await getAllDoctors();
        setDoctors(data);
      } catch (error) {
        console.error("Failed to fetch doctors", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 flex items-center">
            <Shield className="w-8 h-8 mr-3 text-rose-600" />
            Hospital Administration
          </h2>
          <p className="text-gray-500 mt-1">System overview and staff management.</p>
        </div>
      </div>

      {/* Stats Cards (Mocked) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center">
          <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase">Total Patients</p>
            <p className="text-2xl font-bold text-gray-900">---</p>
            <p className="text-xs text-amber-500 mt-1">// TODO: Add stats API</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center">
          <div className="p-3 rounded-full bg-teal-100 text-teal-600 mr-4">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase">Active Doctors</p>
            <p className="text-2xl font-bold text-gray-900">{doctors.length}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center">
          <div className="p-3 rounded-full bg-rose-100 text-rose-600 mr-4">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase">Today's Appointments</p>
            <p className="text-2xl font-bold text-gray-900">---</p>
            <p className="text-xs text-amber-500 mt-1">// TODO: Add stats API</p>
          </div>
        </div>
      </div>

      {/* Doctor Management */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 p-4 bg-gray-50 flex justify-between items-center">
          <h3 className="text-lg font-semibold flex items-center text-gray-800">
            <Stethoscope className="w-5 h-5 mr-2 text-rose-600" />
            Doctor Management
          </h3>
          <button disabled className="bg-rose-600 text-white px-3 py-1.5 rounded-md flex items-center text-sm font-medium opacity-50 cursor-not-allowed">
            <Plus className="w-4 h-4 mr-1" />
            Add Doctor
          </button>
        </div>
        
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading doctors...</div>
          ) : doctors.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No doctors found in the system.</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {doctors.map((doc, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      Dr. {doc.firstName} {doc.lastName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {doc.specialization}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{doc.phone}</div>
                      <div className="text-sm text-gray-500">{doc.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-rose-600 hover:text-rose-900 mx-2">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Deactivate</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
