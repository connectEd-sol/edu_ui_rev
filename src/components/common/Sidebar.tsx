import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
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
  MapPin,
  X
} from 'lucide-react';

interface MenuItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const getMenuItems = (): MenuItem[] => {
    const commonItems: MenuItem[] = [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    ];

    if (!user?.role) return commonItems;

    switch (user.role) {
      case 'admin':
        return [
          ...commonItems,
          { icon: Users, label: 'User Management', path: '/users' },
          { icon: ClipboardList, label: 'Attendance', path: '/attendance' },
          { icon: BarChart3, label: 'Performance', path: '/performance' },
          { icon: Bus, label: 'Transportation', path: '/transportation' },
          { icon: Settings, label: 'Settings', path: '/settings' },
        ];
      case 'teacher':
        return [
          ...commonItems,
          { icon: ClipboardList, label: 'Mark Attendance', path: '/attendance' },
          { icon: GraduationCap, label: 'My Classes', path: '/classes' },
          { icon: BarChart3, label: 'Student Performance', path: '/performance' },
          { icon: Calendar, label: 'Schedule', path: '/schedule' },
        ];
      case 'parent':
        return [
          ...commonItems,
          { icon: Calendar, label: 'Attendance', path: '/attendance' },
          { icon: TrendingUp, label: 'Performance', path: '/performance' },
          { icon: MapPin, label: 'Bus Tracking', path: '/bus-tracking' },
          { icon: Settings, label: 'Settings', path: '/settings' },
        ];
      case 'student':
        return [
          ...commonItems,
          { icon: Calendar, label: 'My Attendance', path: '/attendance' },
          { icon: BarChart3, label: 'My Performance', path: '/performance' },
          { icon: MapPin, label: 'Bus Tracking', path: '/bus-tracking' },
        ];
      default:
        return commonItems;
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className={`bg-white shadow-lg transition-all duration-300 h-full ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">EduManage</span>
          </div>
        )}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors hidden lg:block"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5 text-gray-600" />
            ) : (
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            )}
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          )}
        </div>
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
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center px-3 py-3 mb-1 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-700 font-semibold shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className={`h-5 w-5 ${isCollapsed ? 'mx-auto' : 'mr-3'} ${isActive ? 'text-blue-700' : ''}`} />
              {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-0 w-full p-2">
        <button
          onClick={handleLogout}
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