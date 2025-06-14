import React from 'react';
import Layout from '../common/Layout';
import DashboardStats from './DashboardStats';
import WelcomeSection from './WelcomeSection';
import QuickActions from './QuickActions';
import RecentActivities from './RecentActivities';
import SystemStatus from './SystemStatus';

const Dashboard: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-8">
        <WelcomeSection />
        <DashboardStats />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <QuickActions />
          <RecentActivities />
        </div>
        <SystemStatus />
      </div>
    </Layout>
  );
};

export default Dashboard;