import React from 'react';
import { Filter } from 'lucide-react';

export interface SearchFilters {
  type: string[];
  department: string[];
  status: string[];
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
}

interface SearchFiltersProps {
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
}

export function SearchFilters({ filters, onFilterChange }: SearchFiltersProps) {
  return (
    <div className="p-4 bg-white border-t border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-4 h-4 text-gray-500" />
        <h3 className="text-sm font-medium text-gray-700">Filtri Avanzati</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo
          </label>
          <div className="space-x-2">
            {['Utenti', 'Pratiche', 'Messaggi'].map((type) => (
              <label key={type} className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={filters.type.includes(type)}
                  onChange={(e) => {
                    const newTypes = e.target.checked
                      ? [...filters.type, type]
                      : filters.type.filter((t) => t !== type);
                    onFilterChange({ ...filters, type: newTypes });
                  }}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dipartimento
          </label>
          <select
            multiple
            value={filters.department}
            onChange={(e) => {
              const values = Array.from(e.target.selectedOptions, (option) => option.value);
              onFilterChange({ ...filters, department: values });
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="amministrazione">Amministrazione</option>
            <option value="buste-paga">Buste Paga</option>
            <option value="contabilita">Contabilità</option>
            <option value="risorse-umane">Risorse Umane</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stato
          </label>
          <select
            multiple
            value={filters.status}
            onChange={(e) => {
              const values = Array.from(e.target.selectedOptions, (option) => option.value);
              onFilterChange({ ...filters, status: values });
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="active">Attivo</option>
            <option value="pending">In Attesa</option>
            <option value="completed">Completato</option>
            <option value="archived">Archiviato</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Periodo
          </label>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              value={filters.dateRange.start?.toISOString().split('T')[0] || ''}
              onChange={(e) => {
                onFilterChange({
                  ...filters,
                  dateRange: {
                    ...filters.dateRange,
                    start: e.target.value ? new Date(e.target.value) : null,
                  },
                });
              }}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            <input
              type="date"
              value={filters.dateRange.end?.toISOString().split('T')[0] || ''}
              onChange={(e) => {
                onFilterChange({
                  ...filters,
                  dateRange: {
                    ...filters.dateRange,
                    end: e.target.value ? new Date(e.target.value) : null,
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