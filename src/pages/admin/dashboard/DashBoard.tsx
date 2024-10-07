import { ChevronRightIcon } from '@/components/icons';
import React from 'react';

const Dashboard = () => {
  return (
    <div>
      <div className="text-primaryAdmin flex items-center text-base">
        <h2>Dashboard</h2>
        <ChevronRightIcon fontSize="small" className="mx-2" />
        <span className="text-primaryAdmin/60">Admin dashboard</span>
      </div>
    </div>
  );
};

export default Dashboard;
