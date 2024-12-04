import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
  };
}

export function StatsCard({ title, value, icon: Icon, trend }: StatsCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <Icon className="w-5 h-5 text-gray-400" />
      </div>
      <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
      {trend && (
        <div className="mt-2 flex items-center text-sm">
          <span className={trend.value >= 0 ? 'text-green-500' : 'text-red-500'}>
            {trend.value >= 0 ? '+' : ''}{trend.value}%
          </span>
          <span className="ml-2 text-gray-500">{trend.label}</span>
        </div>
      )}
    </div>
  );
}