import React, { useState } from 'react';
import { PracticeList } from '../components/PracticeList';
import { PracticeDetails } from '../components/PracticeDetails';
import { PracticeFilters } from '../components/PracticeFilters';
import { Practice, PracticeFilter } from '../types';
import { mockPractices } from '../data/mockPractices';
import { FileUpload } from '../../../components/FileUpload';

export function PracticesPage() {
  const [practices] = useState<Practice[]>(mockPractices);
  const [selectedPractice, setSelectedPractice] = useState<Practice | null>(null);
  const [filters, setFilters] = useState<PracticeFilter>({});
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (newFilters: PracticeFilter) => {
    setFilters(newFilters);
    // Apply filters to practices...
  };

  const handleFileUpload = (files: File[]) => {
    console.log('Files to upload:', files);
    // Implement file upload logic...
  };

  return (
    <div className="h-[calc(100vh-theme(spacing.16))] flex">
      <div className="w-80 border-r border-gray-200 overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Pratiche</h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              {showFilters ? 'Nascondi filtri' : 'Mostra filtri'}
            </button>
          </div>
          {showFilters && (
            <div className="mt-4">
              <PracticeFilters
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            </div>
          )}
        </div>
        <PracticeList
          practices={practices}
          onSelectPractice={setSelectedPractice}
        />
      </div>

      {selectedPractice ? (
        <PracticeDetails
          practice={selectedPractice}
          onClose={() => setSelectedPractice(null)}
          onFileUpload={handleFileUpload}
        />
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <p className="text-gray-500">
            Seleziona una pratica per visualizzare i dettagli
          </p>
        </div>
      )}
    </div>
  );
}