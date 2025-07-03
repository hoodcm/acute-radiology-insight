
import React, { useState } from 'react';
import { usePostsByCategory } from '@/hooks/useAsyncPosts';
import { PostCard } from '@/components/PostCard';
import { PostCardSkeleton } from '@/components/PostCardSkeleton';
import { Seo } from '@/components/Seo';
import { DicomViewerOverlay } from '@/components/dicom/DicomViewerOverlay';
import { Button } from '@/components/ui/button';
import { Monitor, Smartphone, Activity } from 'lucide-react';
import { useSmartSkeleton } from '@/hooks/useSmartSkeleton';

const Tools = () => {
  const { posts: toolPosts, loading, error } = usePostsByCategory('Tool');
  const [dicomOverlay, setDicomOverlay] = useState<{
    isOpen: boolean;
    mode?: 'desktop' | 'mobile';
  }>({ isOpen: false });

  const showSkeleton = useSmartSkeleton(loading, {
    delay: 200,
    minDisplayTime: 300
  });

  const openDicomViewer = (mode: 'desktop' | 'mobile') => {
    setDicomOverlay({ isOpen: true, mode });
  };

  const closeDicomViewer = () => {
    setDicomOverlay({ isOpen: false });
  };

  const pageTitle = "Tools";
  const pageDescription = "Useful tools, resources, and technical guides for radiologists.";

  return (
    <>
      <Seo title={pageTitle} description={pageDescription} />
      <div className="container mx-auto py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-6 lg:mb-8 text-text-primary">{pageTitle}</h1>
        <p className="text-text-secondary mb-8 md:mb-12 lg:mb-16 text-base sm:text-lg">{pageDescription}</p>
        
        {/* DICOM Viewer Tools Section */}
        <div className="mb-8 md:mb-12 lg:mb-16 p-6 bg-surface-card/50 rounded-lg border border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-accent/10 p-2 rounded-full">
              <Activity className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-text-primary">
                DICOM Viewers
              </h2>
              <p className="text-text-secondary text-sm sm:text-base">
                Interactive medical image viewers for different platforms
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-surface-card rounded-lg border border-border">
              <div className="flex items-center gap-2 mb-3">
                <Monitor className="w-5 h-5 text-accent" />
                <h3 className="font-semibold text-text-primary text-base sm:text-lg">Desktop DICOM Viewer</h3>
              </div>
              <p className="text-sm text-text-secondary mb-4">
                Full-featured viewer with advanced tools, windowing controls, and measurement capabilities.
              </p>
              <Button 
                onClick={() => openDicomViewer('desktop')}
                className="w-full bg-accent hover:bg-accent-hover text-surface-card font-medium"
              >
                <Monitor className="w-4 h-4 mr-2" />
                Launch Desktop Viewer
              </Button>
            </div>
            
            <div className="p-4 bg-surface-card rounded-lg border border-border">
              <div className="flex items-center gap-2 mb-3">
                <Smartphone className="w-5 h-5 text-accent" />
                <h3 className="font-semibold text-text-primary text-base sm:text-lg">Mobile DICOM Viewer</h3>
              </div>
              <p className="text-sm text-text-secondary mb-4">
                Touch-optimized viewer with pinch-to-zoom, swipe navigation, and essential controls.
              </p>
              <Button 
                onClick={() => openDicomViewer('mobile')}
                className="w-full bg-accent hover:bg-accent-hover text-surface-card font-medium"
              >
                <Smartphone className="w-4 h-4 mr-2" />
                Launch Mobile Viewer
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8">
          {showSkeleton ? (
            Array.from({ length: 4 }).map((_, index) => <PostCardSkeleton key={index} />)
          ) : error ? (
            <p className="col-span-12 text-red-500 text-base sm:text-lg">Error loading tools: {error}</p>
          ) : toolPosts.length > 0 ? (
            toolPosts.map((post) => (
              <PostCard 
                key={post.id} 
                post={{
                  id: parseInt(post.id) || 1,
                  slug: post.slug,
                  title: post.title,
                  description: post.description,
                  category: post.category,
                  tags: post.tags,
                  date: post.date,
                  authorId: post.authorId,
                  content: post.content,
                  readTime: post.readTime || '5 min',
                  outline: post.outline,
                  thumbnailUrl: post.thumbnailUrl,
                  micrographics: post.micrographics || {
                    topLeft: '',
                    topRight: '',
                    bottomLeft: '',
                  },
                }}
              />
            ))
          ) : (
            <p className="col-span-12 text-text-secondary text-base sm:text-lg">No tools have been posted yet. Check back soon!</p>
          )}
        </div>
      </div>
      
      <DicomViewerOverlay 
        isOpen={dicomOverlay.isOpen}
        onClose={closeDicomViewer}
        forceMode={dicomOverlay.mode}
      />
    </>
  );
};
export default Tools;
