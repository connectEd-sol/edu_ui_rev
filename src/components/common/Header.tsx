import React from 'react';
import { Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import SearchBar from './SearchBar';
import Notifications from './Notifications';
import UserProfile from './UserProfile';

const Header: React.FC = () => {
  const { user } = useAuth();

  const notifications = [
    {
      id: '1',
      title: 'Attendance Alert',
      message: 'Alex Johnson was marked absent today',
      type: 'warning' as const,
      time: '5 minutes ago'
    },
    {
      id: '2',
      title: 'Bus Update',
      message: 'Route A is running 10 minutes late',
      type: 'info' as const,
      time: '15 minutes ago'
    },
    {
      id: '3',
      title: 'Grade Updated',
      message: 'Math quiz grades have been uploaded',
      type: 'success' as const,
      time: '1 hour ago'
    }
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
            <Menu className="h-5 w-5 text-gray-600" />
          </button>
          
          <div className="hidden md:block w-96">
            <SearchBar />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Notifications notifications={notifications} />
          <UserProfile user={user} />
        </div>
      </div>
    </header>
  );
};

export default Header;