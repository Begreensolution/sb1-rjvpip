import React, { useState } from 'react';
import { EntityAnalytics } from '../components/EntityAnalytics';
import { AdvancedSearch } from '../components/AdvancedSearch';
import { PerformanceMetrics } from '../components/PerformanceMetrics';
import { TopClients } from '../components/TopClients';
import { ServiceDistribution } from '../components/ServiceDistribution';
import { motion } from 'framer-motion';
import { mockEmployeeData, mockCompanyData, mockClientData } from '../data/mockData';

export function AnalyticsPage() {
  const [selectedEntity, setSelectedEntity] = useState<'client' | 'employee'>('client');
  const [searchResults, setSearchResults] = useState(null);
  const [selectedData, setSelectedData] = useState(null);

  const handleSearch = (query: string, filters: Record<string, any>) => {
    if (query.toLowerCase().includes('mario rossi')) {
      setSelectedData(selectedEntity === 'client' ? mockClientData : mockEmployeeData);
    } else if (query.toLowerCase().includes('ab communication')) {
      setSelectedData(mockCompanyData);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSelectedEntity('client')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedEntity === 'client'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Clienti
          </button>
          <button
            onClick={() => setSelectedEntity('employee')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedEntity === 'employee'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Dipendenti
          </button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <AdvancedSearch type={selectedEntity} onSearch={handleSearch} />
      </motion.div>

      {selectedData ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <EntityAnalytics type={selectedEntity} data={selectedData} />
          
          {selectedEntity === 'employee' && selectedData.performance && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PerformanceMetrics metrics={selectedData.performance} />
              <TopClients clients={selectedData.topClients} />
            </div>
          )}

          {selectedEntity === 'client' && selectedData.services && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ServiceDistribution services={selectedData.services} />
              {selectedData.type === 'company' && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Informazioni Aziendali
                  </h3>
                  <dl className="grid grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Dipendenti</dt>
                      <dd className="mt-1 text-lg font-semibold text-gray-900">
                        {selectedData.metrics.employees}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Sedi</dt>
                      <dd className="mt-1 text-lg font-semibold text-gray-900">
                        {selectedData.locations.length}
                      </dd>
                    </div>
                  </dl>
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      Distribuzione Dipendenti
                    </h4>
                    <div className="space-y-2">
                      {selectedData.metrics.departments.map((dept) => (
                        <div key={dept.name} className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">{dept.name}</span>
                          <span className="text-sm font-medium text-gray-900">
                            {dept.employees}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      ) : (
        <div className="text-center text-gray-500 mt-8">
          Cerca un cliente o un dipendente per visualizzare le analytics
        </div>
      )}
    </div>
  );
}