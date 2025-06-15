
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PostCard } from '@/components/PostCard';
import { posts, type Post } from '@/data/posts';
import { PostCardSkeleton } from '@/components/PostCardSkeleton';
import { Seo } from '@/components/Seo';

const Index = () => {
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLatestPosts(posts);
      setLoading(false);
    }, 1000); // Simulate network delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Seo
        title="Home"
        description="Decisive Thinking in Emergency Imaging. Essays, cases, and commentary from the frontlines of acute radiology."
      />
      {/* Hero Section */}
      <section className="text-center py-hero">
        <div className="container mx-auto">
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground max-w-4xl mx-auto leading-tight">
            Decisive Thinking in Emergency Imaging
          </h1>
          <p className="mt-lg text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Essays, cases, and commentary from the frontlines of acute radiology.
          </p>
          <div className="mt-xl">
            <Button asChild size="lg" className="font-bold h-12 px-8 text-base">
              <Link to="/cases">Explore the Cases</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Body */}
      <section className="container mx-auto pb-cards-section">
        <div className="grid grid-cols-12 gap-md md:gap-lg">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => <PostCardSkeleton key={index} />)
            : latestPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
        </div>
      </section>
    </>
  );
};

export default Index;
