import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (files: File[]) => void;
  maxSize?: number;
  accept?: Record<string, string[]>;
}

export function FileUpload({ onFileSelect, maxSize = 5242880, accept }: FileUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFileSelect(acceptedFiles);
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    maxSize,
    accept,
  });

  return (
    <div className="mt-2">
      <div
        {...getRootProps()}
        className={`p-4 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-8 w-8 text-gray-400" />
        <p className="mt-2 text-sm text-gray-500">
          {isDragActive
            ? 'Rilascia i file qui...'
            : 'Trascina i file qui, o clicca per selezionarli'}
        </p>
        <p className="mt-1 text-xs text-gray-400">
          Dimensione massima: {(maxSize / 1024 / 1024).toFixed(0)}MB
        </p>
      </div>

      {fileRejections.length > 0 && (
        <div className="mt-2">
          {fileRejections.map(({ file, errors }) => (
            <div key={file.name} className="text-sm text-red-500">
              {errors.map(error => (
                <p key={error.code}>{error.message}</p>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}