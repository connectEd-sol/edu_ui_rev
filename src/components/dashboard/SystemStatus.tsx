import React from 'react';

const SystemStatus: React.FC = () => {
  return (
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
  );
};

export default SystemStatus; 