
import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Seo } from '@/components/Seo';
import { SearchResults } from '@/components/search/SearchResults';
import { SearchFilters } from '@/components/search/SearchFilters';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search as SearchIcon } from 'lucide-react';
import { useSearch } from '@/hooks/useSearch';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const { 
    query, 
    setQuery, 
    results, 
    isSearching, 
    categories, 
    tags, 
    options, 
    setOptions 
  } = useSearch(150); // Faster debounce for dedicated search page

  const [localQuery, setLocalQuery] = useState(initialQuery);

  // Sync with URL params
  useEffect(() => {
    if (initialQuery !== query) {
      setQuery(initialQuery);
      setLocalQuery(initialQuery);
    }
  }, [initialQuery, query, setQuery]);

  // Update URL when query changes
  useEffect(() => {
    if (query && query !== searchParams.get('q')) {
      setSearchParams({ q: query });
    }
  }, [query, searchParams, setSearchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery(localQuery);
  };

  const enhancedOptions = useMemo(() => ({
    ...options,
    includeContent: true, // Include content chunks in search results
    limit: 20, // More results on dedicated search page
  }), [options]);

  // Use enhanced options for this page
  useEffect(() => {
    setOptions(enhancedOptions);
  }, [setOptions, enhancedOptions]);

  const pageTitle = query ? `Search Results for "${query}"` : 'Search';
  const pageDescription = query 
    ? `Search results for "${query}" across cases, essays, and articles.`
    : 'Search across all radiology content including cases, essays, hindsight articles, and tools.';

  return (
    <>
      <Seo title={pageTitle} description={pageDescription} />
      <div className="container mx-auto py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-6 lg:mb-8 text-text-primary">
            Search
          </h1>
          
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  type="search"
                  placeholder="Search cases, essays, hindsight articles, and tools..."
                  value={localQuery}
                  onChange={(e) => setLocalQuery(e.target.value)}
                  className="pr-10"
                  autoFocus
                />
                <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
              </div>
              <Button type="submit" disabled={!localQuery.trim()}>
                Search
              </Button>
            </div>
          </form>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <div className="sticky top-20">
                <SearchFilters
                  categories={categories}
                  tags={tags}
                  options={options}
                  onOptionsChange={setOptions}
                />
              </div>
            </div>

            <div className="lg:col-span-3">
              {query && (
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-text-secondary text-sm">
                    {isSearching 
                      ? 'Searching...' 
                      : `${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`
                    }
                  </p>
                </div>
              )}

              <div className="bg-surface-card rounded-lg border border-border overflow-hidden">
                <SearchResults
                  results={results}
                  isSearching={isSearching}
                  query={query}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
