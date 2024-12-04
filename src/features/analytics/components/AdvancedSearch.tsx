import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { SearchSuggestions } from './SearchSuggestions';
import { mockClientData, mockCompanyData, mockEmployeeData } from '../data/mockData';

interface AdvancedSearchProps {
  type: 'client' | 'employee';
  onSearch: (query: string, filters: Record<string, any>) => void;
}

export function AdvancedSearch({ type, onSearch }: AdvancedSearchProps) {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    if (query.length >= 2) {
      const lowerQuery = query.toLowerCase();
      let results = [];

      if (type === 'client') {
        if ('mario rossi'.includes(lowerQuery)) {
          results.push({
            id: '1',
            name: 'Mario Rossi',
            type: 'client',
            description: 'Cliente Individuale',
          });
        }
        if ('ab communication'.includes(lowerQuery)) {
          results.push({
            id: '2',
            name: 'AB Communication',
            type: 'company',
            description: 'Cliente Aziendale',
          });
        }
      } else if (type === 'employee') {
        if ('mario rossi'.includes(lowerQuery)) {
          results.push({
            id: '3',
            name: 'Mario Rossi',
            type: 'employee',
            description: 'Responsabile',
          });
        }
      }

      setSearchResults(results);
      setShowSuggestions(true);
    } else {
      setSearchResults([]);
      setShowSuggestions(false);
    }
  }, [query, type]);

  const handleSelect = (result: any) => {
    setQuery(result.name);
    setShowSuggestions(false);
    onSearch(result.name, {});
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          placeholder={`Cerca ${type === 'client' ? 'cliente o azienda' : 'dipendente'}...`}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {showSuggestions && (
        <SearchSuggestions
          results={searchResults}
          onSelect={handleSelect}
        />
      )}
    </div>
  );
}