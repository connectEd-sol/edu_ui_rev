import React from 'react';
import Layout from '../common/Layout';
import WelcomeSection from '../dashboard/WelcomeSection';
import QuickActionsSection from '../dashboard/QuickActionsSection';
import RecentActivityFeed from '../dashboard/RecentActivityFeed';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

interface ChildCard {
  id: string;
  name: string;
  class: string;
  profilePicture: string;
  attendance: string;
  homeworkDue: number;
}

interface Alert {
  id: string;
  type: 'absence' | 'notice' | 'homework';
  message: string;
  date: string;
  isDismissible: boolean;
}

interface Event {
  id: string;
  title: string;
  date: string;
  type: string;
}

const ParentDashboard: React.FC = () => {
  const navigate = useNavigate();

  // Mock data for children
  const children: ChildCard[] = [
    { 
      id: '1', 
      name: 'Alex Johnson', 
      class: 'Class 5B',
      profilePicture: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=random',
      attendance: 'Present',
      homeworkDue: 1
    },
    { 
      id: '2', 
      name: 'Sarah Johnson', 
      class: 'Class 7A',
      profilePicture: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=random',
      attendance: 'Present',
      homeworkDue: 2
    }
  ];

  // Mock data for alerts
  const alerts: Alert[] = [
    { 
      id: '1', 
      type: 'absence',
      message: 'Child Alex was Absent on 2024-03-15',
      date: '2024-03-15',
      isDismissible: true
    },
    { 
      id: '2', 
      type: 'notice',
      message: 'New Notice: Parent-Teacher Meeting on 2024-03-20',
      date: '2024-03-20',
      isDismissible: false
    },
    { 
      id: '3', 
      type: 'homework',
      message: 'Homework Due: Maths Ch 5 by 2024-03-18',
      date: '2024-03-18',
      isDismissible: true
    }
  ];

  // Mock data for upcoming events
  const upcomingEvents: Event[] = [
    { id: '1', title: 'Annual Sports Day', date: '2024-03-25', type: 'event' },
    { id: '2', title: 'Science Exhibition', date: '2024-03-28', type: 'event' },
    { id: '3', title: 'Parent-Teacher Meeting', date: '2024-03-20', type: 'meeting' }
  ];

  return (
    <Layout title="Parent Dashboard">
      <div className=" max-w-[100vw] overflow-x-hidden  space-y-3 sm:space-y-6">
        <WelcomeSection />
        <QuickActionsSection />
        
        {/* My Children Section */}
        <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-200 sm:rounded-xl sm:p-4">
          <h2 className="text-base font-bold text-gray-900 mb-2 sm:text-lg sm:mb-4">My Children</h2>
          <div className="flex overflow-x-auto space-x-3 pb-2 sm:space-x-4 scrollbar-hide">
            {children.map((child) => (
              <div 
                key={child.id} 
                className="flex-shrink-0 w-[85vw] max-w-[280px] border border-gray-200 rounded-lg p-2 cursor-pointer hover:shadow-md transition-shadow sm:w-64 sm:p-4"
                onClick={() => navigate(`/child/${child.id}`)}
              >
                <div className="flex items-center space-x-2 mb-2 sm:space-x-3 sm:mb-3">
                  <img 
                    src={child.profilePicture} 
                    alt={child.name}
                    className="w-10 h-10 rounded-full sm:w-12 sm:h-12"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-gray-900 truncate sm:text-base">{child.name}</h3>
                    <p className="text-xs text-gray-600 truncate sm:text-sm">{child.class}</p>
                  </div>
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <p className="text-xs text-gray-600 sm:text-sm">
                    Attendance: <span className="text-green-600">{child.attendance}</span>
                  </p>
                  <p className="text-xs text-gray-600 sm:text-sm">
                    Homework: <span className="text-blue-600">{child.homeworkDue} Due</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts Section */}
        <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-200 sm:rounded-xl sm:p-4">
          <h2 className="text-base font-bold text-gray-900 mb-2 sm:text-lg sm:mb-4">Important Alerts & Reminders</h2>
          <div className="space-y-2 sm:space-y-3">
            {alerts.map((alert) => (
              <div 
                key={alert.id} 
                className={`flex items-start justify-between p-2 rounded-lg sm:p-3 ${
                  alert.type === 'absence' ? 'bg-red-50' :
                  alert.type === 'notice' ? 'bg-green-50' :
                  'bg-blue-50'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-900 truncate sm:text-sm">{alert.message}</p>
                  <p className="text-[10px] text-gray-600 sm:text-xs">{alert.date}</p>
                </div>
                {alert.isDismissible && (
                  <button className="ml-1 flex-shrink-0 p-1 hover:bg-gray-100 rounded-full sm:ml-2">
                    <X className="h-3 w-3 text-gray-500 sm:h-4 sm:w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-200 sm:rounded-xl sm:p-4">
          <div className="flex justify-between items-center mb-2 sm:mb-4">
            <h2 className="text-base font-bold text-gray-900 sm:text-lg">Upcoming School Events</h2>
            <button 
              onClick={() => navigate('/calendar')}
              className="text-xs text-blue-600 hover:underline flex-shrink-0"
            >
              View All
            </button>
          </div>
          <div className="space-y-2 sm:space-y-3">
            {upcomingEvents.slice(0, 3).map((event) => (
              <div key={event.id} className="flex items-start space-x-2 sm:space-x-3">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 flex-shrink-0 sm:w-2 sm:h-2 sm:mt-2" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-gray-900 truncate sm:text-sm">{event.title}</p>
                  <p className="text-[10px] text-gray-600 sm:text-xs">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <RecentActivityFeed />
      </div>
    </Layout>
  );
};

export default ParentDashboard; 