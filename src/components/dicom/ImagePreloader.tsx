
import React, { useEffect, useRef, useState } from 'react';

interface PreloadedImage {
  index: number;
  url: string;
  imageData: HTMLImageElement;
  quality: 'low' | 'medium' | 'high';
  loadTime: number;
}

interface ImagePreloaderProps {
  images: Array<{ id: number; url: string; name?: string }>;
  currentIndex: number;
  preloadRange?: number;
  onPreloadComplete?: (preloadedImages: PreloadedImage[]) => void;
}

export function ImagePreloader({
  images,
  currentIndex,
  preloadRange = 2,
  onPreloadComplete
}: ImagePreloaderProps) {
  const [preloadedImages, setPreloadedImages] = useState<Map<number, PreloadedImage>>(new Map());
  const [isPreloading, setIsPreloading] = useState(false);
  const preloadQueueRef = useRef<Set<number>>(new Set());
  const loadingPromisesRef = useRef<Map<number, Promise<void>>>(new Map());

  const preloadImage = async (index: number, priority: 'low' | 'medium' | 'high' = 'medium'): Promise<void> => {
    if (index < 0 || index >= images.length) return;
    if (preloadedImages.has(index)) return;
    if (loadingPromisesRef.current.has(index)) {
      return loadingPromisesRef.current.get(index);
    }

    const startTime = performance.now();
    
    const loadPromise = new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      const timeoutId = setTimeout(() => {
        reject(new Error(`Preload timeout for image ${index}`));
      }, 8000);

      img.onload = () => {
        clearTimeout(timeoutId);
        const loadTime = performance.now() - startTime;
        
        const preloadedImage: PreloadedImage = {
          index,
          url: images[index].url,
          imageData: img,
          quality: priority,
          loadTime
        };

        setPreloadedImages(prev => new Map(prev).set(index, preloadedImage));
        loadingPromisesRef.current.delete(index);
        console.log(`Preloaded image ${index} in ${loadTime.toFixed(2)}ms`);
        resolve();
      };

      img.onerror = () => {
        clearTimeout(timeoutId);
        loadingPromisesRef.current.delete(index);
        console.warn(`Failed to preload image ${index}`);
        reject(new Error(`Failed to preload image ${index}`));
      };

      // Use requestIdleCallback for low priority preloading
      if (priority === 'low' && 'requestIdleCallback' in window) {
        requestIdleCallback(() => {
          img.src = images[index].url;
        }, { timeout: 5000 });
      } else {
        img.src = images[index].url;
      }
    });

    loadingPromisesRef.current.set(index, loadPromise);
    return loadPromise;
  };

  const calculatePreloadPriority = (index: number, currentIndex: number): 'low' | 'medium' | 'high' => {
    const distance = Math.abs(index - currentIndex);
    if (distance === 1) return 'high';
    if (distance === 2) return 'medium';
    return 'low';
  };

  const startPreloading = async () => {
    if (isPreloading) return;
    
    setIsPreloading(true);
    const preloadPromises: Promise<void>[] = [];

    // Calculate which images to preload
    const indicesToPreload: number[] = [];
    
    // Preload next and previous images first
    for (let i = 1; i <= preloadRange; i++) {
      const nextIndex = currentIndex + i;
      const prevIndex = currentIndex - i;
      
      if (nextIndex < images.length) {
        indicesToPreload.push(nextIndex);
      }
      if (prevIndex >= 0) {
        indicesToPreload.push(prevIndex);
      }
    }

    // Sort by priority (closer images first)
    indicesToPreload.sort((a, b) => {
      const distanceA = Math.abs(a - currentIndex);
      const distanceB = Math.abs(b - currentIndex);
      return distanceA - distanceB;
    });

    // Start preloading with appropriate priorities
    for (const index of indicesToPreload) {
      if (!preloadQueueRef.current.has(index)) {
        preloadQueueRef.current.add(index);
        const priority = calculatePreloadPriority(index, currentIndex);
        preloadPromises.push(
          preloadImage(index, priority).catch(error => {
            console.warn(`Preload failed for image ${index}:`, error);
          })
        );
      }
    }

    try {
      await Promise.allSettled(preloadPromises);
      
      if (onPreloadComplete) {
        const preloadedArray = Array.from(preloadedImages.values());
        onPreloadComplete(preloadedArray);
      }
    } finally {
      setIsPreloading(false);
    }
  };

  // Cleanup old preloaded images to save memory
  const cleanupOldImages = () => {
    const maxDistance = preloadRange + 2;
    const imagesToKeep = new Map<number, PreloadedImage>();
    
    preloadedImages.forEach((image, index) => {
      const distance = Math.abs(index - currentIndex);
      if (distance <= maxDistance) {
        imagesToKeep.set(index, image);
      }
    });
    
    if (imagesToKeep.size !== preloadedImages.size) {
      setPreloadedImages(imagesToKeep);
      console.log(`Cleaned up ${preloadedImages.size - imagesToKeep.size} preloaded images`);
    }
  };

  // Start preloading when current index changes
  useEffect(() => {
    preloadQueueRef.current.clear();
    cleanupOldImages();
    
    // Debounce preloading to avoid excessive requests
    const timeoutId = setTimeout(() => {
      startPreloading();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [currentIndex, images]);

  // Check if an image is preloaded
  const isImagePreloaded = (index: number): boolean => {
    return preloadedImages.has(index);
  };

  // Get preloaded image data
  const getPreloadedImage = (index: number): PreloadedImage | null => {
    return preloadedImages.get(index) || null;
  };

  // Expose methods to parent components
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).imagePreloader = {
        isImagePreloaded,
        getPreloadedImage,
        preloadedCount: preloadedImages.size,
        isPreloading
      };
    }
  }, [preloadedImages, isPreloading]);

  return null; // This is a logic-only component
}
