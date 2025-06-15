import { useSearchParams } from 'react-router-dom';
import { posts } from '@/data/posts';
import { PostCard } from '@/components/PostCard';
import { authors } from '@/data/authors';
import { Seo } from '@/components/Seo';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';

  const filteredPosts = query
    ? posts.filter((post) => {
        const author = authors.find((a) => a.id === post.authorId);
        const { title, description, tags, content } = post;
        return (
          title.toLowerCase().includes(query) ||
          description.toLowerCase().includes(query) ||
          (author && author.name.toLowerCase().includes(query)) ||
          tags.some((tag) => tag.toLowerCase().includes(query)) ||
          content.toLowerCase().includes(query)
        );
      })
    : [];

  return (
    <>
      <Seo 
        title={`Search results for "${query}"`}
        description={`Find posts related to ${query} on Level One Radiology.`}
      />
      <div className="container mx-auto py-xl">
        <h1 className="font-serif text-4xl font-bold mb-lg">
          Search Results
        </h1>
        <p className="text-muted-foreground mb-xl">
          {filteredPosts.length > 0
            ? `Found ${filteredPosts.length} result(s) for "${searchParams.get('q')}"`
            : `No results found for "${searchParams.get('q')}". Try another search.`}
        </p>
        
        {filteredPosts.length > 0 && (
          <div className="grid grid-cols-12 gap-md md:gap-lg">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
