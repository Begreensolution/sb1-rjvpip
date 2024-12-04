import React from 'react';
import { Practice } from '../types';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { Clock, AlertTriangle, CheckCircle } from 'lucide-react';

interface PracticeListProps {
  practices: Practice[];
  onSelectPractice: (practice: Practice) => void;
}

export function PracticeList({ practices, onSelectPractice }: PracticeListProps) {
  const getStatusIcon = (status: Practice['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'delayed':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-blue-500" />;
    }
  };

  const getStatusText = (status: Practice['status']) => {
    switch (status) {
      case 'pending':
        return 'In attesa';
      case 'in_progress':
        return 'In corso';
      case 'review':
        return 'In revisione';
      case 'completed':
        return 'Completata';
      case 'delayed':
        return 'In ritardo';
      default:
        return status;
    }
  };

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {practices.map((practice) => (
          <li key={practice.id}>
            <button
              onClick={() => onSelectPractice(practice)}
              className="block hover:bg-gray-50 w-full text-left"
            >
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {getStatusIcon(practice.status)}
                    <p className="ml-2 truncate text-sm font-medium text-gray-900">
                      {practice.title}
                    </p>
                  </div>
                  <div className="ml-2 flex flex-shrink-0">
                    <p className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      practice.priority === 'high'
                        ? 'bg-red-100 text-red-800'
                        : practice.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {practice.priority === 'high' ? 'Alta' : practice.priority === 'medium' ? 'Media' : 'Bassa'}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      {practice.client.name} - {practice.client.company}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <p>
                      Scadenza:{' '}
                      {format(new Date(practice.dueDate), 'd MMMM yyyy', {
                        locale: it,
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}