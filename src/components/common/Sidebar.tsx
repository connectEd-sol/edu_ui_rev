import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  Bus, 
  ClipboardList,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Calendar,
  TrendingUp,
  MapPin
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const getMenuItems = () => {
    const commonItems = [
      { icon: LayoutDashboard, label: 'Dashboard', href: '#dashboard', active: true },
    ];

    switch (user?.role) {
      case 'admin':
        return [
          ...commonItems,
          { icon: Users, label: 'User Management', href: '#users' },
          { icon: ClipboardList, label: 'Attendance', href: '#attendance' },
          { icon: BarChart3, label: 'Performance', href: '#performance' },
          { icon: Bus, label: 'Transportation', href: '#transportation' },
          { icon: Settings, label: 'Settings', href: '#settings' },
        ];
      case 'teacher':
        return [
          ...commonItems,
          { icon: ClipboardList, label: 'Mark Attendance', href: '#attendance' },
          { icon: GraduationCap, label: 'My Classes', href: '#classes' },
          { icon: BarChart3, label: 'Student Performance', href: '#performance' },
          { icon: Calendar, label: 'Schedule', href: '#schedule' },
        ];
      case 'parent':
        return [
          ...commonItems,
          { icon: Calendar, label: 'Attendance', href: '#attendance' },
          { icon: TrendingUp, label: 'Performance', href: '#performance' },
          { icon: MapPin, label: 'Bus Tracking', href: '#bus-tracking' },
          { icon: Settings, label: 'Settings', href: '#settings' },
        ];
      case 'student':
        return [
          ...commonItems,
          { icon: Calendar, label: 'My Attendance', href: '#attendance' },
          { icon: BarChart3, label: 'My Performance', href: '#performance' },
          { icon: MapPin, label: 'Bus Tracking', href: '#bus-tracking' },
        ];
      default:
        return commonItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className={`bg-white shadow-lg transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">EduManage</span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5 text-gray-600" />
          ) : (
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          )}
        </button>
      </div>

      {!isCollapsed && user && (
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <img
              src={user.avatar || `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100`}
              alt={user.name}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user.role}</p>
            </div>
          </div>
        </div>
      )}

      <nav className="mt-4 px-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <a
              key={index}
              href={item.href}
              className={`flex items-center px-3 py-3 mb-1 rounded-lg transition-colors ${
                item.active
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className={`h-5 w-5 ${isCollapsed ? 'mx-auto' : 'mr-3'}`} />
              {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
            </a>
          );
        })}
      </nav>

      <div className="absolute bottom-0 w-full p-2">
        <button
          onClick={logout}
          className={`flex items-center w-full px-3 py-3 text-gray-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          <LogOut className={`h-5 w-5 ${isCollapsed ? '' : 'mr-3'}`} />
          {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;