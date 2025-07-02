
import { useRef, useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Eye } from 'lucide-react';
import type { Post } from '@/data/posts';

interface CRTPreviewOverlayProps {
  post: Post;
  isOpen: boolean;
  hasImaging: boolean;
  onClose: () => void;
  onViewImages: (e: React.MouseEvent) => void;
}

export function CRTPreviewOverlay({
  post,
  isOpen,
  hasImaging,
  onClose,
  onViewImages,
}: CRTPreviewOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<'rect' | 'card' | 'exit'>('rect');
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Lock scroll when preview is open
  useEffect(() => {
    if (isOpen) {
      // Store current scroll position
      const scrollY = window.scrollY;
      
      // Lock scroll by setting body position fixed
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      // Prevent system UI from changing opacity on mobile
      if (isMobile) {
        document.documentElement.style.setProperty('--webkit-overflow-scrolling', 'touch');
        document.body.style.overscrollBehavior = 'none';
      }
    } else {
      // Restore scroll when preview closes
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.body.style.overscrollBehavior = '';
      document.documentElement.style.removeProperty('--webkit-overflow-scrolling');
      
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    return () => {
      // Cleanup on unmount
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.body.style.overscrollBehavior = '';
      document.documentElement.style.removeProperty('--webkit-overflow-scrolling');
    };
  }, [isOpen, isMobile]);

  // Calculate mobile-optimized CRT dimensions
  const getMobileCRTTransform = () => {
    if (!isMobile) {
      return {
        scaleY: 0.75,
        scaleX: 0.7,
        borderRadius: '1rem'
      };
    }
    
    // Mobile: match screen proportions and fill majority of screen
    const screenRatio = window.innerHeight / window.innerWidth;
    const targetWidth = 0.9; // 90% of screen width
    const targetHeight = 0.85; // 85% of screen height
    
    return {
      scaleY: targetHeight,
      scaleX: targetWidth,
      borderRadius: '0.5rem'
    };
  };

  const crtFinalTransform = getMobileCRTTransform();

  useEffect(() => {
    if (isOpen) {
      setPhase('rect');
    }
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (overlayRef.current && event.target === overlayRef.current) {
        setPhase('exit');
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape' && isOpen) {
        setPhase('exit');
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-shadow-hard/80 pointer-events-auto"
      style={{
        // Extend to system areas on mobile
        top: isMobile ? 'env(safe-area-inset-top, 0)' : '0',
        bottom: isMobile ? 'env(safe-area-inset-bottom, 0)' : '0',
        left: isMobile ? 'env(safe-area-inset-left, 0)' : '0',
        right: isMobile ? 'env(safe-area-inset-right, 0)' : '0',
        marginTop: isMobile ? 'calc(-1 * env(safe-area-inset-top, 0))' : '0',
        marginBottom: isMobile ? 'calc(-1 * env(safe-area-inset-bottom, 0))' : '0',
        marginLeft: isMobile ? 'calc(-1 * env(safe-area-inset-left, 0))' : '0',
        marginRight: isMobile ? 'calc(-1 * env(safe-area-inset-right, 0))' : '0',
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`preview-title-${post.id}`}
      aria-describedby={`preview-desc-${post.id}`}
    >
      <div 
        className="pointer-events-none fixed z-10 bg-scanlines bg-[length:100%_4px] animate-scan"
        style={{
          // Extend scanlines to full viewport including system areas
          top: isMobile ? 'calc(-1 * env(safe-area-inset-top, 0))' : '0',
          bottom: isMobile ? 'calc(-1 * env(safe-area-inset-bottom, 0))' : '0',
          left: isMobile ? 'calc(-1 * env(safe-area-inset-left, 0))' : '0',
          right: isMobile ? 'calc(-1 * env(safe-area-inset-right, 0))' : '0',
          inset: '0',
        }}
      />
      
      {phase !== 'exit' && (
        <div className="fixed inset-0 flex justify-center items-center pointer-events-none z-30">
          <div
            className="w-screen h-screen bg-surface-card origin-center animate-crtRect"
            onAnimationEnd={() => setPhase('card')}
          />
        </div>
      )}

      {phase === 'exit' && (
        <div className="fixed inset-0 flex justify-center items-center pointer-events-none z-30">
          <div
            className="w-screen h-screen bg-surface-card origin-center animate-crtRectReverse"
            style={{
              transform: `scaleY(${crtFinalTransform.scaleY}) scaleX(${crtFinalTransform.scaleX})`,
              borderRadius: crtFinalTransform.borderRadius
            }}
            onAnimationEnd={onClose}
          />
        </div>
      )}

      {phase === 'card' && (
        <div className="fixed inset-0 flex justify-center items-center pointer-events-none z-30">
          <div
            className="bg-transparent overflow-hidden opacity-0 animate-crtContentFadeIn pointer-events-auto"
            style={{
              width: `${crtFinalTransform.scaleX * 100}${isMobile ? 'vw' : 'vw'}`,
              height: `${crtFinalTransform.scaleY * 100}${isMobile ? 'vh' : 'vh'}`,
              borderRadius: crtFinalTransform.borderRadius
            }}
          >
            <div className="w-full h-full flex flex-col justify-center items-center p-6">
              <h3 id={`preview-title-${post.id}`} className="text-2xl font-bold mb-4 text-text-primary">
                {post.title}
              </h3>
              <p id={`preview-desc-${post.id}`} className="text-base mb-6 leading-relaxed text-text-secondary">
                {post.description}
              </p>
              {hasImaging && (
                <Button onClick={onViewImages} className="bg-accent hover:bg-accent-hover text-text-primary font-medium mb-4">
                  <Eye className="w-4 h-4 mr-2" />
                  Launch DICOM Viewer
                </Button>
              )}
              <p className="text-sm text-text-secondary">Press Escape to close</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CRTPreviewOverlay;
