```tsx
import React from 'react';
import { FileText, Download, Trash2 } from 'lucide-react';
import { FileUpload } from '../../../components/FileUpload';

interface ClientDocument {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: Date;
  uploadedBy: string;
  category: string;
  version: number;
}

interface ClientDocumentsProps {
  documents: ClientDocument[];
  onUpload: (files: File[]) => void;
  onDownload: (documentId: string) => void;
  onDelete: (documentId: string) => void;
}

export function ClientDocuments({
  documents,
  onUpload,
  onDownload,
  onDelete,
}: ClientDocumentsProps) {
  const documentCategories = [
    'Documenti Societari',
    'Buste Paga',
    'Dichiarazioni',
    'Contratti',
    'Altri Documenti',
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Documenti</h2>
        <div className="flex items-center space-x-2">
          <select className="rounded-md border-gray-300 text-sm">
            <option value="">Tutti i documenti</option>
            {documentCategories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <FileUpload
        onFileSelect={onUpload}
        accept={{
          'application/pdf': ['.pdf'],
          'application/msword': ['.doc'],
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
          'image/*': ['.png', '.jpg', '.jpeg'],
        }}
      />

      <div className="bg-white rounded-lg border border-gray-200">
        {documents.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {documents.map((doc) => (
              <li key={doc.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-6 w-6 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                      <div className="flex items-center text-xs text-gray-500 space-x-2">
                        <span>{doc.category}</span>
                        <span>•</span>
                        <span>v{doc.version}</span>
                        <span>•</span>
                        <span>{(doc.size / 1024).toFixed(2)} KB</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onDownload(doc.id)}
                      className="p-1 text-gray-400 hover:text-gray-500"
                    >
                      <Download className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => onDelete(doc.id)}
                      className="p-1 text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-4 text-center text-gray-500">
            Nessun documento caricato
          </div>
        )}
      </div>
    </div>
  );
}
```