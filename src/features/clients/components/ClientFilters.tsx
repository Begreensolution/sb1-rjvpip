import React from 'react';
import { Filter } from 'lucide-react';
import { ClientFilter, ClientType } from '../types';

interface ClientFiltersProps {
  filters: ClientFilter;
  onFilterChange: (filters: ClientFilter) => void;
}

export function ClientFilters({ filters, onFilterChange }: ClientFiltersProps) {
  const clientTypes: { value: ClientType; label: string }[] = [
    { value: 'company', label: 'Aziende' },
    { value: 'individual', label: 'Privati' },
    { value: 'studio', label: 'Studi' },
  ];

  const categories = [
    { value: 'standard', label: 'Standard' },
    { value: 'premium', label: 'Premium' },
    { value: 'vip', label: 'VIP' },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-4 h-4 text-gray-500" />
        <h3 className="text-sm font-medium text-gray-700">Filtri</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo Cliente
          </label>
          <div className="space-y-2">
            {clientTypes.map(({ value, label }) => (
              <label key={value} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.type?.includes(value)}
                  onChange={(e) => {
                    const newTypes = e.target.checked
                      ? [...(filters.type || []), value]
                      : filters.type?.filter((t) => t !== value) || [];
                    onFilterChange({ ...filters, type: newTypes });
                  }}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categoria
          </label>
          <div className="space-y-2">
            {categories.map(({ value, label }) => (
              <label key={value} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.category?.includes(value)}
                  onChange={(e) => {
                    const newCategories = e.target.checked
                      ? [...(filters.category || []), value]
                      : filters.category?.filter((c) => c !== value) || [];
                    onFilterChange({ ...filters, category: newCategories });
                  }}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stato
          </label>
          <div className="space-y-2">
            {['active', 'inactive'].map((status) => (
              <label key={status} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.status?.includes(status)}
                  onChange={(e) => {
                    const newStatus = e.target.checked
                      ? [...(filters.status || []), status]
                      : filters.status?.filter((s) => s !== status) || [];
                    onFilterChange({ ...filters, status: newStatus });
                  }}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">
                  {status === 'active' ? 'Attivo' : 'Inattivo'}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ricerca
          </label>
          <input
            type="text"
            value={filters.search || ''}
            onChange={(e) =>
              onFilterChange({ ...filters, search: e.target.value })
            }
            placeholder="Cerca per nome, email, codice fiscale..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
}