
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User } from 'lucide-react';
import { type SearchResult } from '@/lib/search/searchIndex';

interface SearchResultsProps {
  results: SearchResult[];
  isSearching: boolean;
  query: string;
}

export function SearchResults({ results, isSearching, query }: SearchResultsProps) {
  if (isSearching) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        <div className="animate-pulse">Searching...</div>
      </div>
    );
  }

  if (!query.trim()) {
    return null;
  }

  if (results.length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        No results found for "{query}"
      </div>
    );
  }

  return (
    <div className="divide-y divide-border">
      {results.map((result) => (
        <SearchResultItem key={result.post.id} result={result} query={query} />
      ))}
    </div>
  );
}

interface SearchResultItemProps {
  result: SearchResult;
  query: string;
}

function SearchResultItem({ result, query }: SearchResultItemProps) {
  const { post, chunk, highlights } = result;

  const highlightText = (text: string, highlights: string[]) => {
    if (highlights.length === 0) return text;

    let highlightedText = text;
    highlights.forEach(highlight => {
      const regex = new RegExp(`(${highlight})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<mark class="bg-accent text-accent-foreground">$1</mark>');
    });

    return highlightedText;
  };

  return (
    <Link
      to={`/posts/${post.slug}`}
      className="block p-4 hover:bg-muted/50 transition-colors"
    >
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 
              className="font-semibold text-foreground text-base sm:text-lg line-clamp-2"
              dangerouslySetInnerHTML={{ 
                __html: highlightText(post.title, highlights) 
              }}
            />
            <p 
              className="text-sm text-muted-foreground mt-1 line-clamp-2"
              dangerouslySetInnerHTML={{ 
                __html: highlightText(post.description, highlights) 
              }}
            />
          </div>
          <Badge variant="secondary" className="text-xs">
            {post.category}
          </Badge>
        </div>

        {chunk && (
          <div className="bg-muted/30 p-3 rounded-md">
            <p 
              className="text-sm text-foreground line-clamp-3"
              dangerouslySetInnerHTML={{ 
                __html: highlightText(chunk.content, highlights) 
              }}
            />
            {chunk.metadata.sectionTitle && (
              <p className="text-xs text-muted-foreground mt-1">
                From: {chunk.metadata.sectionTitle}
              </p>
            )}
          </div>
        )}

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {post.date}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </div>
        </div>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {post.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{post.tags.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
