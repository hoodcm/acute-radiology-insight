
import React, { useState, useEffect, useRef } from 'react';

interface ImageResolution {
  url: string;
  quality: 'low' | 'medium' | 'high';
  size: number;
}

interface ProgressiveImageLoaderProps {
  resolutions: ImageResolution[];
  onImageLoad: (imageData: HTMLImageElement, quality: string) => void;
  onError: (error: Error) => void;
  priority?: boolean;
}

export function ProgressiveImageLoader({
  resolutions,
  onImageLoad,
  onError,
  priority = false
}: ProgressiveImageLoaderProps) {
  const [loadedQualities, setLoadedQualities] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    // Abort previous loading if component unmounts or resolutions change
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [resolutions]);

  const loadImage = async (resolution: ImageResolution): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      const timeoutId = setTimeout(() => {
        reject(new Error(`Image load timeout for ${resolution.quality} quality`));
      }, 10000); // 10 second timeout

      img.onload = () => {
        clearTimeout(timeoutId);
        resolve(img);
      };

      img.onerror = () => {
        clearTimeout(timeoutId);
        reject(new Error(`Failed to load ${resolution.quality} quality image`));
      };

      img.src = resolution.url;
    });
  };

  const startProgressiveLoading = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    abortControllerRef.current = new AbortController();
    
    try {
      // Sort resolutions by quality (low to high)
      const sortedResolutions = [...resolutions].sort((a, b) => {
        const qualityOrder = { low: 1, medium: 2, high: 3 };
        return qualityOrder[a.quality] - qualityOrder[b.quality];
      });

      for (const resolution of sortedResolutions) {
        if (abortControllerRef.current?.signal.aborted) break;
        
        try {
          console.log(`Loading ${resolution.quality} quality image...`);
          const imageData = await loadImage(resolution);
          
          if (!abortControllerRef.current?.signal.aborted) {
            setLoadedQualities(prev => new Set([...prev, resolution.quality]));
            onImageLoad(imageData, resolution.quality);
            console.log(`Successfully loaded ${resolution.quality} quality image`);
          }
        } catch (error) {
          console.warn(`Failed to load ${resolution.quality} quality:`, error);
          if (resolution.quality === 'low') {
            // If even low quality fails, report error
            onError(error as Error);
          }
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-start loading when component mounts or resolutions change
  useEffect(() => {
    if (resolutions.length > 0) {
      startProgressiveLoading();
    }
  }, [resolutions]);

  return null; // This is a logic-only component
}
