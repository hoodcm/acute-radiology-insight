
import React, { useState, useEffect } from 'react';
import { posts, type Post } from '@/data/posts';
import { PostCard } from '@/components/PostCard';
import { PostCardSkeleton } from '@/components/PostCardSkeleton';
import { Seo } from '@/components/Seo';

const Cases = () => {
  const [casePosts, setCasePosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const filteredPosts = posts.filter((post: Post) => post.category === 'Case Study');
      setCasePosts(filteredPosts);
      setLoading(false);
    }, 1000); // Simulate network delay

    return () => clearTimeout(timer);
  }, []);

  const pageTitle = "Cases";
  const pageDescription = "Analysis of notable and educational cases in emergency radiology.";

  return (
    <>
      <Seo title={pageTitle} description={pageDescription} />
      <div className="container mx-auto py-xl">
        <h1 className="font-serif text-4xl font-bold mb-lg">{pageTitle}</h1>
        <p className="text-muted-foreground mb-xl">{pageDescription}</p>
        
        <div className="grid grid-cols-12 gap-md md:gap-lg">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => <PostCardSkeleton key={index} />)
          ) : casePosts.length > 0 ? (
            casePosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <p className="col-span-12 text-muted-foreground">No cases have been posted yet. Check back soon!</p>
          )}
        </div>
      </div>
    </>
  );
};
export default Cases;
