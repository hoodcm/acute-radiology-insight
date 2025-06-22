
import { useState, useEffect, useMemo } from 'react';
import { searchIndex, type SearchResult, type SearchOptions } from '@/lib/search/searchIndex';

export interface UseSearchReturn {
  query: string;
  setQuery: (query: string) => void;
  results: SearchResult[];
  isSearching: boolean;
  categories: string[];
  tags: string[];
  options: SearchOptions;
  setOptions: (options: SearchOptions) => void;
}

export function useSearch(debounceDelay: number = 300): UseSearchReturn {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [options, setOptions] = useState<SearchOptions>({});

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, debounceDelay);

    return () => clearTimeout(timer);
  }, [query, debounceDelay]);

  // Perform search when debounced query changes
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    
    // Simulate async search (for future backend integration)
    const performSearch = async () => {
      try {
        const searchResults = searchIndex.search(debouncedQuery, options);
        setResults(searchResults);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    performSearch();
  }, [debouncedQuery, options]);

  const categories = useMemo(() => searchIndex.getCategories(), []);
  const tags = useMemo(() => searchIndex.getAllTags(), []);

  return {
    query,
    setQuery,
    results,
    isSearching,
    categories,
    tags,
    options,
    setOptions,
  };
}
