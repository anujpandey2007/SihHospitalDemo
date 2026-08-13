import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAppointmentsByPatient, Appointment } from '../api/appointmentApi';
import { Calendar, FileText, AlertCircle } from 'lucide-react';

const PatientDashboard: React.FC = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // Fallback to random ID if we don't have a numeric one for this mock
        const patientId = parseInt(user?.id || '1', 10);
        const data = await getAppointmentsByPatient(patientId);
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
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome, {user?.name}</h2>
        <p className="text-gray-600">Here is an overview of your medical journey.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Appointments Section */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200 p-4 bg-gray-50 flex justify-between items-center">
            <h3 className="text-lg font-semibold flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-600" />
              Your Appointments
            </h3>
            <span className="text-xs font-semibold bg-amber-100 text-amber-800 px-2 py-1 rounded-full flex items-center">
              <AlertCircle className="w-3 h-3 mr-1"/> Mock Backend
            </span>
          </div>
          
          <div className="p-0">
            {loading ? (
              <div className="p-8 text-center text-gray-500">Loading appointments...</div>
            ) : appointments.length === 0 ? (
              <div className="p-8 text-center text-gray-500 border-b border-gray-100">
                No appointments found.
                {/* // TODO: Add empty state illustration */}
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {appointments.map((apt, idx) => (
                  <li key={idx} className="p-4 hover:bg-gray-50 transition-colors flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">{new Date(apt.appointmentDate).toLocaleString()}</p>
                      <p className="text-sm text-gray-500">{apt.reason}</p>
                    </div>
                    <div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {apt.status}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Action Panel */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative group">
            <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-5 transition-opacity"></div>
            <div className="p-6">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Book Appointment</h3>
              <p className="text-sm text-gray-500 mb-4">Schedule a visit with your preferred doctor.</p>
              
              <button disabled className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg opacity-50 cursor-not-allowed">
                Book Now
              </button>
              <div className="mt-2 text-xs text-amber-600 flex items-center justify-center">
                // TODO: backend endpoint pending
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative group">
            <div className="absolute inset-0 bg-teal-600 opacity-0 group-hover:opacity-5 transition-opacity"></div>
            <div className="p-6">
              <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Medical Records</h3>
              <p className="text-sm text-gray-500 mb-4">View your prescriptions and lab reports.</p>
              
              <button disabled className="w-full bg-teal-600 text-white font-medium py-2 rounded-lg opacity-50 cursor-not-allowed">
                View Records
              </button>
              <div className="mt-2 text-xs text-amber-600 flex items-center justify-center text-center">
                // TODO: backend endpoint for patient's records is missing
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
