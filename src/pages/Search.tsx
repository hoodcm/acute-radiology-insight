
import { useSearchParams } from 'react-router-dom';
import { posts } from '@/data/posts';
import { PostCard } from '@/components/PostCard';
import { authors } from '@/data/authors';
import { Seo } from '@/components/Seo';
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  // Get all unique tags for filtering
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }, []);

  // Get all unique categories
  const categories = useMemo(() => {
    const cats = new Set(posts.map(post => post.category));
    return Array.from(cats).sort();
  }, []);

  // Enhanced filtering with performance optimization
  const filteredPosts = useMemo(() => {
    if (!query && selectedFilters.length === 0) return [];
    
    return posts.filter((post) => {
      const author = authors.find((a) => a.id === post.authorId);
      const { title, description, tags, content, category } = post;
      
      // Text search
      const matchesQuery = !query || (
        title.toLowerCase().includes(query) ||
        description.toLowerCase().includes(query) ||
        (author && author.name.toLowerCase().includes(query)) ||
        tags.some((tag) => tag.toLowerCase().includes(query)) ||
        content.toLowerCase().includes(query)
      );
      
      // Filter by selected categories
      const matchesFilters = selectedFilters.length === 0 || 
        selectedFilters.some(filter => 
          tags.includes(filter) || category === filter
        );
      
      return matchesQuery && matchesFilters;
    });
  }, [query, selectedFilters]);

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const clearFilters = () => {
    setSelectedFilters([]);
  };

  return (
    <>
      <Seo 
        title={`Search results for "${query}"`}
        description={`Find posts related to ${query} on Level One Radiology.`}
      />
      <div className="container mx-auto py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-4">
            Search Results
          </h1>
          <p className="text-muted-foreground mb-6 text-base sm:text-lg">
            {query ? (
              filteredPosts.length > 0
                ? `Found ${filteredPosts.length} result(s) for "${searchParams.get('q')}"`
                : `No results found for "${searchParams.get('q')}"`
            ) : (
              'Use filters to discover content'
            )}
          </p>

          {/* Enhanced Filter Controls */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold mb-2 text-foreground">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Badge
                    key={category}
                    variant={selectedFilters.includes(category) ? "default" : "secondary"}
                    className={`cursor-pointer transition-all hover:scale-105 ${
                      selectedFilters.includes(category) 
                        ? 'bg-accent text-accent-foreground hover:bg-accent/90' 
                        : 'hover:bg-accent/20'
                    }`}
                    onClick={() => toggleFilter(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2 text-foreground">Topics</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.slice(0, 12).map(tag => (
                  <Badge
                    key={tag}
                    variant={selectedFilters.includes(tag) ? "default" : "secondary"}
                    className={`cursor-pointer transition-all hover:scale-105 ${
                      selectedFilters.includes(tag) 
                        ? 'bg-accent text-accent-foreground hover:bg-accent/90' 
                        : 'hover:bg-accent/20'
                    }`}
                    onClick={() => toggleFilter(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {selectedFilters.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Active filters:</span>
                <div className="flex flex-wrap gap-1">
                  {selectedFilters.map(filter => (
                    <Badge key={filter} variant="default" className="bg-accent text-accent-foreground">
                      {filter}
                    </Badge>
                  ))}
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="text-xs hover:bg-accent/20"
                >
                  Clear all
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {filteredPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredPosts.map((post) => {
              const author = authors.find(a => a.id === post.authorId);
              return (
                <PostCard
                  key={post.id}
                  post={post}
                  author={{ ...author!, id: author!.id.toString() }}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
