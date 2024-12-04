import React from 'react';
import { StatsGrid } from '../../../components/dashboard/StatsGrid';
import { RecentActivity } from '../../../components/dashboard/RecentActivity';

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      </div>
      <StatsGrid />
      <RecentActivity />
    </div>
  );
}