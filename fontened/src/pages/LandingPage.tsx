import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, User, Stethoscope, ClipboardList, Shield } from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: string) => {
    navigate(`/login?role=${role}`);
  };

  const roles = [
    {
      id: 'Patient',
      title: 'Patient',
      description: 'Access your medical records and book appointments.',
      icon: <User className="w-12 h-12 text-blue-500" />,
      color: 'hover:border-blue-500 hover:shadow-blue-100',
    },
    {
      id: 'Doctor',
      title: 'Doctor',
      description: 'Manage appointments and update medical records.',
      icon: <Stethoscope className="w-12 h-12 text-teal-500" />,
      color: 'hover:border-teal-500 hover:shadow-teal-100',
    },
    {
      id: 'Receptionist',
      title: 'Receptionist',
      description: 'Register patients and manage schedules.',
      icon: <ClipboardList className="w-12 h-12 text-purple-500" />,
      color: 'hover:border-purple-500 hover:shadow-purple-100',
    },
    {
      id: 'Admin',
      title: 'Hospital Admin',
      description: 'System overview and staff management.',
      icon: <Shield className="w-12 h-12 text-rose-500" />,
      color: 'hover:border-rose-500 hover:shadow-rose-100',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="bg-white p-4 rounded-full shadow-md">
            <Activity className="w-12 h-12 text-blue-600" />
          </div>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-4">
          Welcome to HealthSync
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Please select your portal to continue. Our system provides tailored dashboards to streamline hospital management and patient care.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => handleRoleSelect(role.id)}
            className={`flex flex-col items-center p-8 bg-white rounded-2xl border-2 border-transparent shadow-sm transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg ${role.color}`}
          >
            <div className="mb-4 bg-gray-50 p-4 rounded-full">
              {role.icon}
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{role.title}</h2>
            <p className="text-gray-500 text-center">{role.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
