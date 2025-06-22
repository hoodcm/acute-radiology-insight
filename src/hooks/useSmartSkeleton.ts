import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

interface UseSmartSkeletonOptions {
  delay?: number;
  minDisplayTime?: number;
}

export function useSmartSkeleton(
  isLoading: boolean,
  options: UseSmartSkeletonOptions = {}
) {
  const { delay = 200, minDisplayTime = 300 } = options;
  const [showSkeleton, setShowSkeleton] = useState(false);
  const location = useLocation();
  const navigationType = useNavigationType();
  const timeoutRef = useRef<NodeJS.Timeout>();
  const skeletonStartTime = useRef<number>();
  const isNavigatingBack = useRef(false);

  // Track navigation type to detect back/forward navigation
  useEffect(() => {
    isNavigatingBack.current = navigationType === 'POP';
  }, [navigationType, location]);

  useEffect(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }

    if (isLoading) {
      // Don't show skeleton immediately on back/forward navigation
      // as pages are likely cached
      if (isNavigatingBack.current) {
        return;
      }

      // Set a delay before showing the skeleton
      timeoutRef.current = setTimeout(() => {
        setShowSkeleton(true);
        skeletonStartTime.current = Date.now();
      }, delay);
    } else {
      // Data is ready
      if (showSkeleton && skeletonStartTime.current) {
        const elapsedTime = Date.now() - skeletonStartTime.current;
        
        // If skeleton has been shown for less than minimum time,
        // keep it visible a bit longer to avoid flickering
        if (elapsedTime < minDisplayTime) {
          timeoutRef.current = setTimeout(() => {
            setShowSkeleton(false);
            skeletonStartTime.current = undefined;
          }, minDisplayTime - elapsedTime);
        } else {
          setShowSkeleton(false);
          skeletonStartTime.current = undefined;
        }
      } else {
        // Never showed skeleton or it's been long enough
        setShowSkeleton(false);
        skeletonStartTime.current = undefined;
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isLoading, delay, minDisplayTime, showSkeleton]);

  // Reset navigation tracking after a short delay
  useEffect(() => {
    const resetTimeout = setTimeout(() => {
      isNavigatingBack.current = false;
    }, 100);

    return () => clearTimeout(resetTimeout);
  }, [location]);

  return showSkeleton;
}
