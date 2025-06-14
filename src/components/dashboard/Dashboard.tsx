import React from 'react';
import { useAuth } from '../../context/AuthContext';
import DashboardStats from './DashboardStats';
import { Calendar, TrendingUp, Users, Bell, MapPin, Bus } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    return `${greeting}, ${user?.name}!`;
  };

  const getRecentActivities = () => {
    switch (user?.role) {
      case 'admin':
        return [
          { icon: Users, text: '15 new student registrations this week', time: '2 hours ago' },
          { icon: TrendingUp, text: 'Monthly performance report generated', time: '4 hours ago' },
          { icon: Bus, text: 'Bus route optimization completed', time: '1 day ago' },
          { icon: Bell, text: 'System maintenance scheduled for Sunday', time: '2 days ago' }
        ];
      case 'teacher':
        return [
          { icon: Calendar, text: 'Attendance marked for Class 10-A', time: '1 hour ago' },
          { icon: TrendingUp, text: 'Math quiz grades uploaded', time: '3 hours ago' },
          { icon: Users, text: 'Parent-teacher meeting scheduled', time: '5 hours ago' },
          { icon: Bell, text: 'Assignment deadline reminder sent', time: '1 day ago' }
        ];
      case 'parent':
        return [
          { icon: Calendar, text: 'Alex marked present today', time: '2 hours ago' },
          { icon: TrendingUp, text: 'Science test score: 92/100', time: '1 day ago' },
          { icon: MapPin, text: 'Bus arrived at school on time', time: '2 days ago' },
          { icon: Bell, text: 'Parent-teacher meeting confirmed', time: '3 days ago' }
        ];
      case 'student':
        return [
          { icon: Calendar, text: 'Attendance: Present (96.8% this month)', time: 'Today' },
          { icon: TrendingUp, text: 'Science assignment graded: A-', time: '1 day ago' },
          { icon: MapPin, text: 'Bus tracking: On time arrival', time: '2 days ago' },
          { icon: Bell, text: 'Math homework due tomorrow', time: '3 days ago' }
        ];
      default:
        return [];
    }
  };

  const recentActivities = getRecentActivities();

  const getQuickActions = () => {
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
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl text-white p-8">
        <h1 className="text-3xl font-bold mb-2">{getWelcomeMessage()}</h1>
        <p className="text-blue-100 text-lg">
          Welcome to your EduManage dashboard. Here's what's happening today.
        </p>
      </div>

      {/* Stats */}
      <DashboardStats />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
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

        {/* Recent Activities */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activities</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="space-y-4">
              {recentActivities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <Icon className="h-4 w-4 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 mb-1">{activity.text}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">System Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <div>
              <p className="font-medium text-gray-900">Attendance System</p>
              <p className="text-sm text-gray-600">All systems operational</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <div>
              <p className="font-medium text-gray-900">Grade Management</p>
              <p className="text-sm text-gray-600">All systems operational</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div>
              <p className="font-medium text-gray-900">Bus Tracking</p>
              <p className="text-sm text-gray-600">Minor delays on Route C</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;