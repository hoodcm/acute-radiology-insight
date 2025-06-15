
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PostCard } from '@/components/PostCard';
import { posts } from '@/data/posts';

const Index = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="text-center py-20 lg:py-32">
        <div className="container mx-auto">
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white max-w-4xl mx-auto leading-tight">
            Decisive Thinking in Emergency Imaging
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Essays, cases, and commentary from the frontlines of acute radiology.
          </p>
          <div className="mt-10">
            <Button asChild size="lg" className="bg-[var(--color-accent)] text-black font-bold hover:bg-yellow-600 h-12 px-8 text-base">
              <Link to="#">Explore the Cases</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Body */}
      <section className="container mx-auto pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Index;
