import React from 'react';
import { Filter } from 'lucide-react';
import { PracticeFilter } from '../types';

interface PracticeFiltersProps {
  filters: PracticeFilter;
  onFilterChange: (filters: PracticeFilter) => void;
}

export function PracticeFilters({ filters, onFilterChange }: PracticeFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-4 h-4 text-gray-500" />
        <h3 className="text-sm font-medium text-gray-700">Filtri</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stato
          </label>
          <select
            multiple
            value={filters.status || []}
            onChange={(e) => {
              const values = Array.from(
                e.target.selectedOptions,
                (option) => option.value
              ) as Practice['status'][];
              onFilterChange({ ...filters, status: values });
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="pending">In attesa</option>
            <option value="in_progress">In corso</option>
            <option value="review">In revisione</option>
            <option value="completed">Completata</option>
            <option value="delayed">In ritardo</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Priorità
          </label>
          <select
            multiple
            value={filters.priority || []}
            onChange={(e) => {
              const values = Array.from(
                e.target.selectedOptions,
                (option) => option.value
              ) as Practice['priority'][];
              onFilterChange({ ...filters, priority: values });
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="low">Bassa</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Periodo
          </label>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              value={filters.dateRange?.start?.toISOString().split('T')[0] || ''}
              onChange={(e) => {
                onFilterChange({
                  ...filters,
                  dateRange: {
                    ...filters.dateRange,
                    start: e.target.value ? new Date(e.target.value) : undefined,
                  },
                });
              }}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            <input
              type="date"
              value={filters.dateRange?.end?.toISOString().split('T')[0] || ''}
              onChange={(e) => {
                onFilterChange({
                  ...filters,
                  dateRange: {
                    ...filters.dateRange,
                    end: e.target.value ? new Date(e.target.value) : undefined,
                  },
                });
              }}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}