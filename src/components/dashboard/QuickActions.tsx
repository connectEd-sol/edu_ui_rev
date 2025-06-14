import React from 'react';
import { useAuth } from '../../context/AuthContext';

interface QuickAction {
  title: string;
  description: string;
  color: string;
}

const QuickActions: React.FC = () => {
  const { user } = useAuth();

  const getQuickActions = (): QuickAction[] => {
    switch (user?.role) {
      case 'admin':
        return [
          { title: 'Generate Reports', description: 'Create attendance and performance reports', color: 'bg-blue-500' },
          { title: 'Manage Users', description: 'Add or modify user accounts', color: 'bg-green-500' },
          { title: 'System Settings', description: 'Configure system parameters', color: 'bg-purple-500' },
          { title: 'Bus Management', description: 'Monitor transportation system', color: 'bg-orange-500' }
        ];
      case 'teacher':
        return [
          { title: 'Mark Attendance', description: 'Record student attendance', color: 'bg-blue-500' },
          { title: 'Grade Assignments', description: 'Upload and manage grades', color: 'bg-green-500' },
          { title: 'Class Schedule', description: 'View and manage schedule', color: 'bg-purple-500' },
          { title: 'Student Progress', description: 'Monitor student performance', color: 'bg-orange-500' }
        ];
      case 'parent':
        return [
          { title: 'Track Attendance', description: 'View child attendance record', color: 'bg-blue-500' },
          { title: 'Academic Progress', description: 'Monitor grades and performance', color: 'bg-green-500' },
          { title: 'Bus Tracking', description: 'Track school bus location', color: 'bg-purple-500' },
          { title: 'Communications', description: 'Messages from teachers', color: 'bg-orange-500' }
        ];
      case 'student':
        return [
          { title: 'My Attendance', description: 'View attendance record', color: 'bg-blue-500' },
          { title: 'My Grades', description: 'Check academic performance', color: 'bg-green-500' },
          { title: 'Bus Location', description: 'Track bus arrival time', color: 'bg-purple-500' },
          { title: 'Assignments', description: 'View pending assignments', color: 'bg-orange-500' }
        ];
      default:
        return [];
    }
  };

  const quickActions = getQuickActions();

  return (
    <div className="lg:col-span-2">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quickActions.map((action, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer group"
          >
            <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <div className="w-6 h-6 bg-white rounded"></div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
            <p className="text-gray-600 text-sm">{action.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions; 