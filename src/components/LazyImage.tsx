
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  placeholderSrc: string;
  src: string;
}

export function LazyImage({ placeholderSrc, src, alt, className, ...props }: LazyImageProps) {
  const [imgSrc, setImgSrc] = useState(placeholderSrc);
  const imgRef = useRef<HTMLImageElement>(null);

  const isLoaded = imgSrc === src;

  useEffect(() => {
    if (!src) return;

    // Fallback for browsers without IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      setImgSrc(src);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const highResImage = new Image();
            highResImage.src = src;
            highResImage.onload = () => {
              setImgSrc(src);
            };
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px 200px 0px' } // Start loading 200px before image enters viewport
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
  }, [src]);

  return (
    <img
      ref={imgRef}
      src={imgSrc}
      alt={alt}
      className={cn(
        'transition-all duration-700 ease-in-out',
        isLoaded ? 'blur-0 scale-100' : 'blur-md scale-110',
        className
      )}
      {...props}
      loading="lazy" // Native lazy loading for browsers that support it
    />
  );
}
