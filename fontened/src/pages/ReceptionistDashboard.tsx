import React, { useEffect, useState } from 'react';
import { getAllPatients, Patient } from '../api/patientApi';
import { Users, Search, PlusCircle, Calendar } from 'lucide-react';

const ReceptionistDashboard: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await getAllPatients();
        setPatients(data);
      } catch (error) {
        console.error("Failed to fetch patients", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Receptionist Desk</h2>
          <p className="text-gray-500">Manage patient registrations and appointments.</p>
        </div>
        <div className="flex space-x-3">
          <button disabled className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center font-medium opacity-50 cursor-not-allowed">
            <PlusCircle className="w-5 h-5 mr-2" />
            New Patient
          </button>
          <button disabled className="bg-white border border-purple-600 text-purple-600 px-4 py-2 rounded-lg flex items-center font-medium opacity-50 cursor-not-allowed">
            <Calendar className="w-5 h-5 mr-2" />
            Schedule
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h3 className="text-xl font-semibold flex items-center text-gray-800">
            <Users className="w-5 h-5 mr-2 text-purple-600" />
            Patient Directory
          </h3>
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search patients..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 sm:text-sm transition duration-150 ease-in-out"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading patients...</div>
          ) : patients.length === 0 ? (
            <div className="p-12 text-center flex flex-col items-center justify-center bg-gray-50">
              <Users className="w-12 h-12 text-gray-300 mb-3" />
              <p className="text-gray-500 font-medium">No patients found in the system.</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {patients.map((p, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{p.firstName} {p.lastName}</div>
                      <div className="text-sm text-gray-500">{p.gender} • {p.dateOfBirth}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{p.phone}</div>
                      <div className="text-sm text-gray-500">{p.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      #{p.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-purple-600 hover:text-purple-900 mx-2">Edit</button>
                      <button className="text-blue-600 hover:text-blue-900">Appt</button>
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

export default ReceptionistDashboard;
