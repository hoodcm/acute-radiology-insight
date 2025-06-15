
import { posts, type Post } from '@/data/posts';
import { PostCard } from '@/components/PostCard';

const Tools = () => {
  const toolPosts = posts.filter((post: Post) => post.category === 'Tool');

  return (
    <div className="container mx-auto py-xl">
      <h1 className="font-serif text-4xl font-bold mb-lg">Tools</h1>
      <p className="text-muted-foreground mb-xl">
        Useful tools, resources, and technical guides for radiologists.
      </p>
      
      {toolPosts.length > 0 ? (
        <div className="grid grid-cols-12 gap-md md:gap-lg">
          {toolPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No tools have been posted yet. Check back soon!</p>
      )}
    </div>
  );
};
export default Tools;
