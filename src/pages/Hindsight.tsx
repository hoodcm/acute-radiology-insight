
import { posts } from '@/data/posts';
import { PostCard } from '@/components/PostCard';

const Hindsight = () => {
  const hindsightPosts = posts.filter(post => post.category === 'Hindsight');

  return (
    <div className="container mx-auto py-xl">
      <h1 className="font-serif text-4xl font-bold mb-lg">Hindsight</h1>
      <p className="text-muted-foreground mb-xl">
        Reflections and learnings from past cases and experiences.
      </p>
      
      {hindsightPosts.length > 0 ? (
        <div className="grid grid-cols-12 gap-md md:gap-lg">
          {hindsightPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No hindsight articles have been posted yet. Check back soon!</p>
      )}
    </div>
  );
};
export default Hindsight;
