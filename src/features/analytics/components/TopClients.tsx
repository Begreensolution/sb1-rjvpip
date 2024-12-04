import React from 'react';
import { Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface TopClient {
  name: string;
  practices: number;
}

interface TopClientsProps {
  clients: TopClient[];
}

export function TopClients({ clients }: TopClientsProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Clienti</h3>
      <div className="space-y-4">
        {clients.map((client, index) => (
          <div key={client.name} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Building2 className="h-5 w-5 text-gray-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{client.name}</p>
                <p className="text-sm text-gray-500">{client.practices} pratiche</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full ${
                index === 0 ? 'bg-yellow-400' :
                index === 1 ? 'bg-gray-400' :
                'bg-orange-400'
              }`} />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}