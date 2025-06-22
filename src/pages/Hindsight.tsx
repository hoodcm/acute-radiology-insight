
import React, { useState, useEffect } from 'react';
import { posts, type Post } from '@/data/posts';
import { PostCard } from '@/components/PostCard';
import { PostCardSkeleton } from '@/components/PostCardSkeleton';
import { Seo } from '@/components/Seo';
import { useSmartSkeleton } from '@/hooks/useSmartSkeleton';

const Hindsight = () => {
  const [hindsightPosts, setHindsightPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const filteredPosts = posts.filter((post: Post) => post.category === 'Hindsight');
      setHindsightPosts(filteredPosts);
      setLoading(false);
    }, 1000); // Simulate network delay

    return () => clearTimeout(timer);
  }, []);

  const showSkeleton = useSmartSkeleton(loading, {
    delay: 200,
    minDisplayTime: 300
  });

  const pageTitle = "Hindsight";
  const pageDescription = "Reflections and learnings from past cases and experiences.";

  return (
    <>
      <Seo title={pageTitle} description={pageDescription} />
      <div className="container mx-auto py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-6 lg:mb-8">{pageTitle}</h1>
        <p className="text-muted-foreground mb-8 md:mb-12 lg:mb-16 text-base sm:text-lg">{pageDescription}</p>
        
        <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8">
          {showSkeleton ? (
            Array.from({ length: 4 }).map((_, index) => <PostCardSkeleton key={index} />)
          ) : hindsightPosts.length > 0 ? (
            hindsightPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            !loading && (
              <p className="col-span-12 text-muted-foreground text-base sm:text-lg">No hindsight articles have been posted yet. Check back soon!</p>
            )
          )}
        </div>
      </div>
    </>
  );
};
export default Hindsight;
