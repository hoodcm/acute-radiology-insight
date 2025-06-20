
import React, { useState, useEffect } from 'react';
import { posts, type Post } from '@/data/posts';
import { PostCard } from '@/components/PostCard';
import { PostCardSkeleton } from '@/components/PostCardSkeleton';
import { Seo } from '@/components/Seo';
import { DicomViewerOverlay } from '@/components/dicom/DicomViewerOverlay';
import { Button } from '@/components/ui/button';
import { Monitor, Smartphone, Activity } from 'lucide-react';

const Tools = () => {
  const [toolPosts, setToolPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [dicomOverlay, setDicomOverlay] = useState<{
    isOpen: boolean;
    mode?: 'desktop' | 'mobile';
  }>({ isOpen: false });

  useEffect(() => {
    const timer = setTimeout(() => {
      const filteredPosts = posts.filter((post: Post) => post.category === 'Tool');
      setToolPosts(filteredPosts);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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
      <div className="container mx-auto py-xl">
        <h1 className="font-serif text-4xl font-bold mb-lg">{pageTitle}</h1>
        <p className="text-muted-foreground mb-xl">{pageDescription}</p>
        
        {/* DICOM Viewer Tools Section */}
        <div className="mb-xl p-6 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-accent/10 p-2 rounded-full">
              <Activity className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                DICOM Viewers
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Interactive medical image viewers for different platforms
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-3">
                <Monitor className="w-5 h-5 text-accent" />
                <h3 className="font-semibold text-slate-900 dark:text-white">Desktop DICOM Viewer</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Full-featured viewer with advanced tools, windowing controls, and measurement capabilities.
              </p>
              <Button 
                onClick={() => openDicomViewer('desktop')}
                className="w-full bg-accent hover:bg-accent/90 text-black font-medium"
              >
                <Monitor className="w-4 h-4 mr-2" />
                Launch Desktop Viewer
              </Button>
            </div>
            
            <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-3">
                <Smartphone className="w-5 h-5 text-accent" />
                <h3 className="font-semibold text-slate-900 dark:text-white">Mobile DICOM Viewer</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Touch-optimized viewer with pinch-to-zoom, swipe navigation, and essential controls.
              </p>
              <Button 
                onClick={() => openDicomViewer('mobile')}
                className="w-full bg-accent hover:bg-accent/90 text-black font-medium"
              >
                <Smartphone className="w-4 h-4 mr-2" />
                Launch Mobile Viewer
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-12 gap-md md:gap-lg">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => <PostCardSkeleton key={index} />)
          ) : toolPosts.length > 0 ? (
            toolPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <p className="col-span-12 text-muted-foreground">No tools have been posted yet. Check back soon!</p>
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
