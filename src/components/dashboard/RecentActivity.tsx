import React from 'react';

export function RecentActivity() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Attività Recenti</h2>
      <div className="space-y-4">
        <p className="text-gray-500">Loading activities...</p>
      </div>
    </div>
  );
}