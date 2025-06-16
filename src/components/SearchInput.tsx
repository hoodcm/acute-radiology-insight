import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export function SearchInput() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(handler);
  }, [query]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      onClick={() => inputRef.current?.focus()}
      className="flex items-center justify-start w-32 focus-within:w-64 transition-all duration-300 ease-in-out border-2 border-black dark:border-white rounded px-2 py-1 overflow-hidden focus-within:shadow-[0_0_0_2px_rgba(255,165,0,0.5)]"
    >
      <label htmlFor="search-input" className="sr-only">
        Search cases or articles
      </label>
      <label
        htmlFor="search-input"
        className="p-1 text-foreground flex items-center justify-center cursor-text"
        aria-label="Focus search"
      >
        <Search size={20} />
      </label>
      <Input
        id="search-input"
        ref={inputRef}
        type="search"
        placeholder="Search"
        aria-label="Search cases or articles"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-2 h-8 bg-transparent border-none font-mono text-base placeholder:italic placeholder:text-muted-foreground focus:outline-none focus:ring-0 w-full"
      />
      {query && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setQuery(''); }}
          aria-label="Clear search"
          className="px-2 text-muted-foreground hover:text-foreground transition-colors duration-75 flex items-center justify-center h-8"
        >
          <span className="text-xl leading-none">×</span>
        </button>
      )}
    </form>
  );
}
