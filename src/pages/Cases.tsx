
import { posts } from '@/data/posts';
import { PostCard } from '@/components/PostCard';

const Cases = () => {
  const casePosts = posts.filter(post => post.category === 'Case Study');

  return (
    <div className="container mx-auto py-xl">
      <h1 className="font-serif text-4xl font-bold mb-lg">Cases</h1>
      <p className="text-muted-foreground mb-xl">
        Analysis of notable and educational cases in emergency radiology.
      </p>
      
      {casePosts.length > 0 ? (
        <div className="grid grid-cols-12 gap-md md:gap-lg">
          {casePosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No cases have been posted yet. Check back soon!</p>
      )}
    </div>
  );
};
export default Cases;
