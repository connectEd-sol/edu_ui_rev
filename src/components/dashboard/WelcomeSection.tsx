import React from 'react';
import { useAuth } from '../../context/AuthContext';

const WelcomeSection: React.FC = () => {
  const { user } = useAuth();

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    return `${greeting}, ${user?.name}!`;
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl text-white p-8">
      <h1 className="text-3xl font-bold mb-2">{getWelcomeMessage()}</h1>
      <p className="text-blue-100 text-lg">
        Welcome to your EduManage dashboard. Here's what's happening today.
      </p>
    </div>
  );
};

export default WelcomeSection; 