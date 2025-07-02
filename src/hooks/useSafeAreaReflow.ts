
import { useEffect, useRef } from 'react';

export function useSafeAreaReflow() {
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Detect overscroll bounce (scroll position becomes negative or exceeds document height)
      const isOverscroll = currentScrollY < 0 || 
        currentScrollY > (document.documentElement.scrollHeight - window.innerHeight);
      
      // Set timeout to trigger reflow after scroll stops
      scrollTimeoutRef.current = setTimeout(() => {
        // Force recalculation of safe area insets
        const rootElement = document.documentElement;
        
        // Temporarily toggle a class to force reflow
        rootElement.classList.add('safe-area-reflow');
        
        // Use requestAnimationFrame to ensure the DOM change takes effect
        requestAnimationFrame(() => {
          // Update CSS custom properties with fresh safe area values
          rootElement.style.setProperty('--safe-area-inset-top', 'env(safe-area-inset-top, 0px)');
          rootElement.style.setProperty('--safe-area-inset-right', 'env(safe-area-inset-right, 0px)');
          rootElement.style.setProperty('--safe-area-inset-bottom', 'env(safe-area-inset-bottom, 0px)');
          rootElement.style.setProperty('--safe-area-inset-left', 'env(safe-area-inset-left, 0px)');
          
          // Remove the reflow class
          rootElement.classList.remove('safe-area-reflow');
        });
      }, isOverscroll ? 100 : 300); // Shorter delay for overscroll detection
      
      lastScrollYRef.current = currentScrollY;
    };

    const handleVisualViewportChange = () => {
      // Also trigger reflow on visual viewport changes (iOS Safari specific)
      const rootElement = document.documentElement;
      rootElement.style.setProperty('--safe-area-inset-bottom', 'env(safe-area-inset-bottom, 0px)');
    };

    // Listen for scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Listen for visual viewport changes on iOS
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleVisualViewportChange);
    }

    // Initial setup
    handleVisualViewportChange();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleVisualViewportChange);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);
}
