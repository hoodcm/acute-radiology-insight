
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';

export function SearchInput() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Debounce search input for better performance
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
      setIsExpanded(false);
      inputRef.current?.blur();
    }
  };

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleBlur = () => {
    if (!query) {
      setIsExpanded(false);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuery('');
    setIsExpanded(false);
    inputRef.current?.blur();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-center justify-start transition-all duration-300 ease-in-out border-2 border-black dark:border-white rounded-full px-3 py-2 overflow-hidden focus-within:shadow-[0_0_0_2px_rgba(255,165,0,0.5)] ${
        isExpanded ? 'w-64' : 'w-32'
      }`}
    >
      <label htmlFor="search-input" className="sr-only">
        Search cases, essays, or articles
      </label>
      <button
        type="button"
        onClick={() => inputRef.current?.focus()}
        className="p-1 text-foreground flex items-center justify-center cursor-pointer hover:text-accent transition-colors"
        aria-label="Focus search"
      >
        <Search size={18} />
      </button>
      <Input
        id="search-input"
        ref={inputRef}
        type="search"
        placeholder={isExpanded ? "Search radiology content..." : "Search"}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="pl-2 h-6 bg-transparent border-none font-mono text-sm placeholder:italic placeholder:text-muted-foreground focus:outline-none focus:ring-0 w-full"
      />
      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="px-2 text-muted-foreground hover:text-foreground transition-colors duration-75 flex items-center justify-center h-6"
          aria-label="Clear search"
        >
          <X size={14} />
        </button>
      )}
    </form>
  );
}
