import React from 'react';
import { X, Clock, AlertTriangle, CheckCircle, ArrowLeft } from 'lucide-react';
import { Practice } from '../types';
import { PracticeTimeline } from './PracticeTimeline';
import { FileUpload } from '../../../components/FileUpload';
import { formatDate } from '../../../lib/utils';

interface PracticeDetailsProps {
  practice: Practice;
  onClose: () => void;
  onFileUpload: (files: File[]) => void;
}

export function PracticeDetails({ practice, onClose, onFileUpload }: PracticeDetailsProps) {
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
    <div className="fixed inset-0 bg-white z-50 overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="h-5 w-5 text-gray-500" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{practice.title}</h1>
            <p className="text-sm text-gray-500">
              {practice.client.name} - {practice.client.company}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Stato</h3>
              <div className="flex items-center space-x-2">
                {getStatusIcon(practice.status)}
                <span className="text-sm font-medium text-gray-900">
                  {getStatusText(practice.status)}
                </span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Scadenza</h3>
              <p className="text-sm text-gray-900">
                {formatDate(practice.dueDate)}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Progresso
              </h3>
              <div className="space-y-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${practice.progress}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600">{practice.progress}%</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Descrizione
                </h2>
                <p className="text-sm text-gray-600">{practice.description}</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Documenti
                </h2>
                <FileUpload
                  onFileSelect={onFileUpload}
                  accept={{
                    'application/pdf': ['.pdf'],
                    'image/*': ['.png', '.jpg', '.jpeg'],
                  }}
                />
                {practice.attachments.length > 0 ? (
                  <ul className="mt-4 divide-y divide-gray-200">
                    {practice.attachments.map((attachment) => (
                      <li
                        key={attachment.id}
                        className="py-3 flex justify-between items-center"
                      >
                        <div className="flex items-center">
                          <span className="text-sm text-gray-900">
                            {attachment.name}
                          </span>
                          <span className="ml-2 text-xs text-gray-500">
                            {(attachment.size / 1024).toFixed(2)} KB
                          </span>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 text-sm">
                          Scarica
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 text-sm text-gray-500">
                    Nessun documento caricato
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Dettagli
                </h2>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Categoria
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {practice.category}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Priorità
                    </dt>
                    <dd className="mt-1">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          practice.priority === 'high'
                            ? 'bg-red-100 text-red-800'
                            : practice.priority === 'medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {practice.priority === 'high'
                          ? 'Alta'
                          : practice.priority === 'medium'
                          ? 'Media'
                          : 'Bassa'}
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Tag</dt>
                    <dd className="mt-1 flex flex-wrap gap-2">
                      {practice.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Cronologia
                </h2>
                <PracticeTimeline timeline={practice.timeline} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}