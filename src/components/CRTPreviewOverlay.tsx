
import { useRef, useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Eye } from 'lucide-react';
import type { Post } from '@/lib/postConversion';

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

  // Extract CRT animation values to match content container size
  const crtFinalTransform = {
    scaleY: 0.75,
    scaleX: 0.7,
    borderRadius: '1rem'
  };

  // Lock scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      // Prevent scroll on body and html
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      
      // Prevent touch events that could cause scrolling
      const preventTouch = (e: TouchEvent) => {
        if (e.touches.length > 1) {
          e.preventDefault();
        }
      };
      
      document.addEventListener('touchmove', preventTouch, { passive: false });
      
      return () => {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        document.removeEventListener('touchmove', preventTouch);
      };
    }
  }, [isOpen]);

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
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        height: '100vh',
        width: '100vw'
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`preview-title-${post.id}`}
      aria-describedby={`preview-desc-${post.id}`}
    >
      {/* Full screen scan line effect covering system areas */}
      <div 
        className="pointer-events-none fixed z-10 bg-scanlines bg-[length:100%_4px] animate-scan" 
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          height: '100vh',
          width: '100vw',
          zIndex: 10
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
            className="w-screen h-screen bg-surface-card origin-center scale-y-75 scale-x-[0.7] rounded-xl animate-crtRectReverse"
            onAnimationEnd={onClose}
          />
        </div>
      )}

      {phase === 'card' && (
        <div className="fixed inset-0 flex justify-center items-center pointer-events-none z-30">
          <div
            className="bg-transparent overflow-hidden opacity-0 animate-crtContentFadeIn pointer-events-auto"
            style={{
              width: `${crtFinalTransform.scaleX * 100}vw`,
              height: `${crtFinalTransform.scaleY * 100}vh`,
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
