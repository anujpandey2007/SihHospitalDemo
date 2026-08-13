import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAppointmentsByDoctor, Appointment } from '../api/appointmentApi';
import { Calendar, User, FileText, CheckCircle } from 'lucide-react';

const DoctorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const doctorId = parseInt(user?.id || '1', 10);
        const data = await getAppointmentsByDoctor(doctorId);
        setAppointments(data);
      } catch (error) {
        console.error("Failed to fetch appointments", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-xl shadow-md p-6 text-white">
          <h2 className="text-3xl font-bold mb-2">Dr. {user?.name}</h2>
          <p className="opacity-90">Here is your schedule for today.</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-center items-center">
          <div className="text-4xl font-black text-gray-800">{appointments.length}</div>
          <div className="text-sm font-medium text-gray-500 uppercase tracking-wide mt-1">Appointments</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 p-4 bg-gray-50 flex justify-between items-center">
          <h3 className="text-lg font-semibold flex items-center text-gray-800">
            <Calendar className="w-5 h-5 mr-2 text-teal-600" />
            Assigned Patients / Appointments
          </h3>
          <span className="text-xs font-semibold bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
            Mock Mode
          </span>
        </div>
        
        <div className="p-0">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading schedule...</div>
          ) : appointments.length === 0 ? (
            <div className="p-12 text-center flex flex-col items-center justify-center">
              <CheckCircle className="w-12 h-12 text-gray-300 mb-3" />
              <p className="text-gray-500 font-medium">Your schedule is clear for now.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {appointments.map((apt, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {new Date(apt.appointmentDate).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        #{apt.patientId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {apt.reason}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          {apt.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button disabled className="text-teal-600 hover:text-teal-900 opacity-50 cursor-not-allowed flex items-center justify-end w-full">
                          <FileText className="w-4 h-4 mr-1" /> Update Record
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
