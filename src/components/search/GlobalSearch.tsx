import React, { useState, useCallback, useRef } from 'react';
import { Search } from 'lucide-react';
import { SearchResults } from './SearchResults';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useDebounce } from '../../hooks/useDebounce';
import { useNavigate } from 'react-router-dom';

// Mock search results for demonstration
const mockSearch = async (query: string) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    {
      id: '1',
      type: 'user' as const,
      title: 'Mario Rossi',
      description: 'Admin - Amministrazione',
      link: '/analytics?type=employee&id=1',
    },
    {
      id: '2',
      type: 'practice' as const,
      title: 'Pratica 2024/001',
      description: 'Busta paga - Marzo 2024',
      link: '/practices/2',
    },
    {
      id: '3',
      type: 'client' as const,
      title: 'AB Communication',
      description: 'Cliente Aziendale',
      link: '/analytics?type=client&id=2',
    },
  ].filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.description.toLowerCase().includes(query.toLowerCase())
  );
};

export function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useClickOutside(containerRef, () => setIsOpen(false));

  const debouncedSearch = useDebounce(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }
    setIsLoading(true);
    try {
      const searchResults = await mockSearch(searchQuery);
      setResults(searchResults);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, 300);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(true);
    debouncedSearch(value);
  }, [debouncedSearch]);

  const handleResultClick = (link: string) => {
    navigate(link);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div ref={containerRef} className="relative max-w-md w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="search"
          value={query}
          onChange={handleSearch}
          onFocus={() => setIsOpen(true)}
          placeholder="Cerca clienti, dipendenti, pratiche..."
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      
      {isOpen && (
        <SearchResults
          results={results}
          isLoading={isLoading}
          onClose={() => setIsOpen(false)}
          onSelect={handleResultClick}
        />
      )}
    </div>
  );
}