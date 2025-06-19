
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  placeholderSrc: string;
  src: string;
  lowQualitySrc?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export function LazyImage({ 
  placeholderSrc, 
  lowQualitySrc,
  src, 
  alt, 
  className, 
  onLoad,
  onError,
  ...props 
}: LazyImageProps) {
  const [imgSrc, setImgSrc] = useState(placeholderSrc);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const isLoaded = imgSrc === src && !isLoading;

  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
    onLoad?.();
  }, [onLoad]);

  const handleImageError = useCallback(() => {
    setHasError(true);
    setIsLoading(false);
    onError?.();
  }, [onError]);

  const loadImage = useCallback(async (imageSrc: string) => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = imageSrc;
    });
  }, []);

  useEffect(() => {
    if (!src) return;

    // Fallback for browsers without IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      setImgSrc(src);
      return;
    }

    const observer = new IntersectionObserver(
      async (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            try {
              // Progressive loading: low quality first, then high quality
              if (lowQualitySrc && lowQualitySrc !== placeholderSrc) {
                await loadImage(lowQualitySrc);
                setImgSrc(lowQualitySrc);
              }
              
              // Load high quality image
              await loadImage(src);
              setImgSrc(src);
              handleImageLoad();
            } catch (error) {
              handleImageError();
              console.warn('Failed to load image:', src);
            }
            observer.unobserve(entry.target);
          }
        }
      },
      { 
        rootMargin: '50px 0px 200px 0px', // Start loading earlier for better UX
        threshold: 0.1 
      }
    );

    const currentImgRef = imgRef.current;
    if (currentImgRef) {
      observer.observe(currentImgRef);
    }

    return () => {
      if (currentImgRef) {
        observer.unobserve(currentImgRef);
      }
    };
  }, [src, lowQualitySrc, loadImage, handleImageLoad, handleImageError]);

  if (hasError) {
    return (
      <div 
        className={cn(
          "flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-500",
          className
        )}
        {...props}
      >
        <span className="text-sm">Failed to load image</span>
      </div>
    );
  }

  return (
    <img
      ref={imgRef}
      src={imgSrc}
      alt={alt}
      className={cn(
        'transition-all duration-500 ease-in-out',
        isLoaded ? 'blur-0 scale-100 opacity-100' : 'blur-sm scale-105 opacity-75',
        isLoading && 'animate-pulse',
        className
      )}
      loading="lazy"
      decoding="async"
      {...props}
    />
  );
}
