import React from 'react';
import { File, User, MessageSquare, Building2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SearchResult {
  id: string;
  type: 'user' | 'practice' | 'message' | 'client';
  title: string;
  description: string;
  link: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
  onClose: () => void;
  onSelect: (link: string) => void;
}

export function SearchResults({ results, isLoading, onClose, onSelect }: SearchResultsProps) {
  if (!results.length && !isLoading) return null;

  const getIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'user':
        return <User className="w-5 h-5" />;
      case 'practice':
        return <File className="w-5 h-5" />;
      case 'message':
        return <MessageSquare className="w-5 h-5" />;
      case 'client':
        return <Building2 className="w-5 h-5" />;
    }
  };

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50">
      {isLoading ? (
        <div className="p-4 text-center text-gray-500">Ricerca in corso...</div>
      ) : (
        <div className="py-2">
          {results.map((result) => (
            <button
              key={result.id}
              onClick={() => onSelect(result.link)}
              className="flex items-center w-full px-4 py-2 hover:bg-gray-50 text-left"
            >
              <span className={cn(
                'flex-shrink-0 mr-3 text-gray-400',
                result.type === 'user' && 'text-blue-500',
                result.type === 'practice' && 'text-green-500',
                result.type === 'client' && 'text-purple-500',
                result.type === 'message' && 'text-orange-500'
              )}>
                {getIcon(result.type)}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {result.title}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {result.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}