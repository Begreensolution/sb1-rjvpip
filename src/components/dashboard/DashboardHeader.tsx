import React from 'react';

export function DashboardHeader() {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin</h1>
      <div className="flex space-x-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Nuovo Cliente
        </button>
        <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
          Esporta Report
        </button>
      </div>
    </div>
  );
}