import React from 'react';
import { Building2, User, Briefcase } from 'lucide-react';
import { Client, ClientFilter } from '../types';
import { formatDate } from '../../../lib/utils';

interface ClientListProps {
  clients: Client[];
  filters: ClientFilter;
  onSelectClient: (client: Client) => void;
  selectedClientId?: string;
}

export function ClientList({
  clients,
  filters,
  onSelectClient,
  selectedClientId,
}: ClientListProps) {
  const getClientIcon = (type: Client['type']) => {
    switch (type) {
      case 'company':
        return <Building2 className="h-5 w-5 text-blue-500" />;
      case 'individual':
        return <User className="h-5 w-5 text-green-500" />;
      case 'studio':
        return <Briefcase className="h-5 w-5 text-purple-500" />;
    }
  };

  const getClientTypeLabel = (type: Client['type']) => {
    switch (type) {
      case 'company':
        return 'Azienda';
      case 'individual':
        return 'Privato';
      case 'studio':
        return 'Studio';
    }
  };

  return (
    <div className="overflow-hidden bg-white rounded-lg">
      <ul className="divide-y divide-gray-200">
        {clients.map((client) => (
          <li
            key={client.id}
            className={`hover:bg-gray-50 cursor-pointer ${
              selectedClientId === client.id ? 'bg-blue-50' : ''
            }`}
            onClick={() => onSelectClient(client)}
          >
            <div className="px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center min-w-0">
                  <div className="flex-shrink-0">
                    {getClientIcon(client.type)}
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {client.name}
                    </p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-gray-500">
                        {getClientTypeLabel(client.type)}
                      </span>
                      <span className="mx-1.5 text-gray-300">·</span>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          client.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {client.status === 'active' ? 'Attivo' : 'Inattivo'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end ml-4">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      client.category === 'vip'
                        ? 'bg-purple-100 text-purple-800'
                        : client.category === 'premium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {client.category.toUpperCase()}
                  </span>
                  <p className="mt-1 text-xs text-gray-500">
                    {client.practices.length} pratiche
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}