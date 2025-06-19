
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
  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {
    const delay = 200;
    const loadDelay = setTimeout(() => {
      setShowSkeleton(true);
    }, delay);

    const fetchData = async () => {
      // Simulated fetch - replace with real fetch if needed
      await new Promise((resolve) => setTimeout(resolve, 1000));
      clearTimeout(loadDelay);
      setLatestPosts(posts);
      setLoading(false);
    };

    fetchData();

    return () => clearTimeout(loadDelay);
  }, []);

  return (
    <>
      <Seo
        title="Home"
        description="Decisive Thinking in Emergency Imaging. Essays, cases, and commentary from the frontlines of acute radiology."
      />
      
      {/* Hero Section */}
      <section className="text-center py-hero" role="banner">
        <div className="container mx-auto">
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground max-w-4xl mx-auto leading-tight animate-slide-up">
            Decisive Thinking in Emergency Imaging
          </h1>
          <p className="mt-lg text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up [animation-delay:200ms]">
            Essays, cases, and commentary from the frontlines of acute radiology.
          </p>
          <div className="mt-xl animate-slide-up [animation-delay:400ms]">
            <Button 
              asChild 
              size="lg" 
              className="font-bold h-12 px-8 text-base touch-target focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              <Link 
                to="/cases"
                aria-describedby="cta-description"
              >
                Explore the Cases
              </Link>
            </Button>
            <p id="cta-description" className="sr-only">
              Browse our collection of radiology case studies and analyses
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section 
        className="container mx-auto pb-cards-section" 
        role="main"
        aria-label="Latest articles"
      >
        <div className="grid grid-cols-12 space-fluid-lg">
          {loading && showSkeleton
            ? Array.from({ length: 4 }).map((_, index) => (
                <PostCardSkeleton 
                  key={index} 
                  className="opacity-0 animate-fade-in" 
                  style={{ animationDelay: `${index * 100}ms` }}
                />
              ))
            : latestPosts.map((post, index) => (
                <div 
                  key={post.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <PostCard post={post} />
                </div>
              ))}
        </div>
        
        {!loading && latestPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No articles available at the moment. Check back soon!
            </p>
          </div>
        )}
      </section>
    </>
  );
};

export default Index;
