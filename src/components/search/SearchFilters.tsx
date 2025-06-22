
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { type SearchOptions } from '@/lib/search/searchIndex';

interface SearchFiltersProps {
  categories: string[];
  tags: string[];
  options: SearchOptions;
  onOptionsChange: (options: SearchOptions) => void;
}

export function SearchFilters({ categories, tags, options, onOptionsChange }: SearchFiltersProps) {
  const hasActiveFilters = options.category || (options.tags && options.tags.length > 0);

  const toggleCategory = (category: string) => {
    onOptionsChange({
      ...options,
      category: options.category === category ? undefined : category,
    });
  };

  const toggleTag = (tag: string) => {
    const currentTags = options.tags || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];
    
    onOptionsChange({
      ...options,
      tags: newTags.length > 0 ? newTags : undefined,
    });
  };

  const clearFilters = () => {
    onOptionsChange({});
  };

  return (
    <div className="p-4 border-t border-border bg-muted/20">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-foreground">Filters</h4>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-6 px-2 text-xs"
          >
            <X className="w-3 h-3 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-xs text-muted-foreground mb-2">Categories</p>
          <div className="flex flex-wrap gap-1">
            {categories.map(category => (
              <Badge
                key={category}
                variant={options.category === category ? "default" : "outline"}
                className="text-xs cursor-pointer hover:bg-accent hover:text-accent-foreground"
                onClick={() => toggleCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-2">Tags</p>
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 10).map(tag => (
              <Badge
                key={tag}
                variant={(options.tags || []).includes(tag) ? "default" : "outline"}
                className="text-xs cursor-pointer hover:bg-accent hover:text-accent-foreground"
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
