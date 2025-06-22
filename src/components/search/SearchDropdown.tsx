
import React, { useRef, useEffect } from 'react';
import { SearchResults } from './SearchResults';
import { SearchFilters } from './SearchFilters';
import { useSearch } from '@/hooks/useSearch';

interface SearchDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  query: string;
}

export function SearchDropdown({ isOpen, onClose, query }: SearchDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { results, isSearching, categories, tags, options, setOptions } = useSearch();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full left-0 right-0 mt-2 bg-card rounded-lg border border-border shadow-lg z-50 max-h-96 overflow-hidden"
    >
      <div className="flex flex-col max-h-96">
        <div className="flex-1 overflow-y-auto">
          <SearchResults 
            results={results} 
            isSearching={isSearching} 
            query={query}
          />
        </div>
        <SearchFilters
          categories={categories}
          tags={tags}
          options={options}
          onOptionsChange={setOptions}
        />
      </div>
    </div>
  );
}
