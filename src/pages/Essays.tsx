
import { posts } from '@/data/posts';
import { PostCard } from '@/components/PostCard';

const Essays = () => {
  const essayPosts = posts.filter(post => post.category === 'Essay');

  return (
    <div className="container mx-auto py-xl">
      <h1 className="font-serif text-4xl font-bold mb-lg">Essays</h1>
      <p className="text-muted-foreground mb-xl">
        Long-form thoughts on radiology, technology, and medical practice.
      </p>
      
      {essayPosts.length > 0 ? (
        <div className="grid grid-cols-12 gap-md md:gap-lg">
          {essayPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No essays have been posted yet. Check back soon!</p>
      )}
    </div>
  );
};
export default Essays;
