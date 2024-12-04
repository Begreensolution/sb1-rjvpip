import React from 'react';
import { Building2, User } from 'lucide-react';

interface SearchResult {
  id: string;
  name: string;
  type: 'client' | 'company' | 'employee';
  description?: string;
}

interface SearchSuggestionsProps {
  results: SearchResult[];
  onSelect: (result: SearchResult) => void;
}

export function SearchSuggestions({ results, onSelect }: SearchSuggestionsProps) {
  if (!results.length) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50">
      <div className="py-2">
        {results.map((result) => (
          <button
            key={result.id}
            onClick={() => onSelect(result)}
            className="flex items-center w-full px-4 py-2 hover:bg-gray-50 text-left"
          >
            <span className="flex-shrink-0 mr-3">
              {result.type === 'employee' ? (
                <User className="h-5 w-5 text-blue-500" />
              ) : (
                <Building2 className="h-5 w-5 text-purple-500" />
              )}
            </span>
            <div>
              <p className="text-sm font-medium text-gray-900">{result.name}</p>
              {result.description && (
                <p className="text-sm text-gray-500">{result.description}</p>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}