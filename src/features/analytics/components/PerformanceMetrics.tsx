import React from 'react';
import { motion } from 'framer-motion';

interface MetricProps {
  label: string;
  value: number;
  maxValue?: number;
  color: string;
}

function Metric({ label, value, maxValue = 100, color }: MetricProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-600">{label}</span>
        <span className="text-sm font-medium text-gray-900">{value}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(value / maxValue) * 100}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
    </div>
  );
}

interface PerformanceMetricsProps {
  metrics: {
    accuracy: number;
    speed: number;
    communication: number;
    teamwork: number;
  };
}

export function PerformanceMetrics({ metrics }: PerformanceMetricsProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance</h3>
      <div className="space-y-4">
        <Metric label="Accuratezza" value={metrics.accuracy} color="bg-blue-500" />
        <Metric label="Velocità" value={metrics.speed} color="bg-green-500" />
        <Metric label="Comunicazione" value={metrics.communication} color="bg-purple-500" />
        <Metric label="Lavoro di Squadra" value={metrics.teamwork} color="bg-yellow-500" />
      </div>
    </motion.div>
  );
}