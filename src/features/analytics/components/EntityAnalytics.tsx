import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface EntityAnalyticsProps {
  type: 'client' | 'employee';
  data: {
    id: string;
    name: string;
    metrics: {
      practicesCompleted: number;
      practicesInProgress: number;
      practicesDelayed: number;
      averageCompletionTime: number;
      efficiency: number;
    };
    history: {
      month: string;
      completed: number;
      delayed: number;
    }[];
  };
}

const COLORS = ['#10B981', '#3B82F6', '#EF4444'];

export function EntityAnalytics({ type, data }: EntityAnalyticsProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">
          {type === 'client' ? 'Analisi Cliente' : 'Analisi Dipendente'}
        </h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder={`Cerca ${type === 'client' ? 'cliente' : 'dipendente'}`}
              className={cn(
                "pl-10 pr-4 py-2 border border-gray-300 rounded-lg",
                "focus:outline-none focus:ring-2 focus:ring-blue-500"
              )}
            />
          </div>
          <button className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4 mr-2" />
            Filtri
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <h3 className="text-sm font-medium text-gray-500 mb-4">Pratiche Completate</h3>
          <div className="mt-2">
            <div className="flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">
                {data.metrics.practicesCompleted}
              </p>
              <p className="ml-2 text-sm text-green-600">
                +{Math.round(data.metrics.efficiency)}%
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <h3 className="text-sm font-medium text-gray-500 mb-4">Tempo Medio Completamento</h3>
          <div className="mt-2">
            <div className="flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">
                {data.metrics.averageCompletionTime}
              </p>
              <p className="ml-2 text-sm text-gray-500">giorni</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <h3 className="text-sm font-medium text-gray-500 mb-4">Pratiche in Ritardo</h3>
          <div className="mt-2">
            <div className="flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">
                {data.metrics.practicesDelayed}
              </p>
              <p className="ml-2 text-sm text-red-600">
                {((data.metrics.practicesDelayed / data.metrics.practicesCompleted) * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold mb-4">Andamento Pratiche</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.history}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completed" name="Completate" fill="#10B981" />
                <Bar dataKey="delayed" name="In Ritardo" fill="#EF4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold mb-4">Distribuzione Pratiche</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Completate', value: data.metrics.practicesCompleted },
                    { name: 'In Corso', value: data.metrics.practicesInProgress },
                    { name: 'In Ritardo', value: data.metrics.practicesDelayed },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}