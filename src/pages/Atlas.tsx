
import React, { useState, useEffect } from 'react';
import { posts, type Post } from '@/data/posts';
import { PostCard } from '@/components/PostCard';
import { PostCardSkeleton } from '@/components/PostCardSkeleton';
import { Seo } from '@/components/Seo';
import { useSmartSkeleton } from '@/hooks/useSmartSkeleton';
import { navigationConfig } from '@/config/navigation';

const Atlas = () => {
  const [atlasPosts, setAtlasPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const sectionConfig = navigationConfig.sections.atlas;

  useEffect(() => {
    const timer = setTimeout(() => {
      // For now, filter by a placeholder category - we'll update this with actual atlas content
      const filteredPosts = posts.filter((post: Post) => post.category === 'Case Study').slice(0, 2);
      setAtlasPosts(filteredPosts);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const showSkeleton = useSmartSkeleton(loading, {
    delay: 200,
    minDisplayTime: 300
  });

  return (
    <>
      <Seo title={sectionConfig.name} description={sectionConfig.description} />
      <div className="container mx-auto py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-6 lg:mb-8 text-text-primary">{sectionConfig.name}</h1>
        <p className="text-text-secondary mb-8 md:mb-12 lg:mb-16 text-base sm:text-lg">{sectionConfig.description}</p>
        
        <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8">
          {showSkeleton ? (
            Array.from({ length: 4 }).map((_, index) => <PostCardSkeleton key={index} />)
          ) : atlasPosts.length > 0 ? (
            atlasPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            !loading && (
              <p className="col-span-12 text-text-secondary text-base sm:text-lg">The {sectionConfig.name.toLowerCase()} is being curated. Check back soon!</p>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Atlas;
