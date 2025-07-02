
import { useEffect, useState } from 'react';
import { useSafeAreaReflow } from './useSafeAreaReflow';

export function useKeyboardAware() {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  // Use the safe area reflow hook
  useSafeAreaReflow();

  useEffect(() => {
    const handleResize = () => {
      // iOS Safari specific keyboard detection
      const viewport = window.visualViewport;
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      
      if (viewport && isIOS) {
        const keyboardHeight = window.innerHeight - viewport.height;
        const isVisible = keyboardHeight > 0;
        
        setIsKeyboardVisible(isVisible);
        setKeyboardHeight(keyboardHeight);
        
        // Add CSS custom property for keyboard height
        document.documentElement.style.setProperty(
          '--keyboard-height',
          `${keyboardHeight}px`
        );

        // Ensure safe area bottom is maintained when keyboard is visible
        if (isVisible) {
          document.documentElement.style.setProperty(
            '--effective-safe-bottom',
            `max(env(safe-area-inset-bottom, 0px), ${keyboardHeight}px)`
          );
        } else {
          document.documentElement.style.setProperty(
            '--effective-safe-bottom',
            'env(safe-area-inset-bottom, 0px)'
          );
        }
      }
    };

    // Listen for visual viewport changes (iOS Safari)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
      handleResize(); // Initial check
    }

    // Fallback for other browsers
    window.addEventListener('resize', handleResize);

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { isKeyboardVisible, keyboardHeight };
}
