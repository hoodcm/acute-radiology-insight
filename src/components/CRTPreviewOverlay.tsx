import { useRef, useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Eye } from 'lucide-react';
import type { Post } from '@/lib/postConversion';
import { useOutletContext } from 'react-router-dom';

interface PreviewContext {
  isPreviewOpen: boolean;
  setIsPreviewOpen: (open: boolean) => void;
}

interface CRTPreviewOverlayProps {
  post: Post;
  hasImaging: boolean;
  onClose: () => void;
  onViewImages: (e: React.MouseEvent) => void;
}

export function CRTPreviewOverlay({
  post,
  hasImaging,
  onClose,
  onViewImages,
}: CRTPreviewOverlayProps) {
  const { isPreviewOpen, setIsPreviewOpen } = useOutletContext<PreviewContext>();
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
    if (isPreviewOpen) {
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
  }, [isPreviewOpen]);

  useEffect(() => {
    if (isPreviewOpen) {
      setPhase('rect');
    }
  }, [isPreviewOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (overlayRef.current && event.target === overlayRef.current) {
        setPhase('exit');
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape' && isPreviewOpen) {
        setPhase('exit');
      }
    }
    if (isPreviewOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isPreviewOpen, onClose]);

  if (!isPreviewOpen) return null;

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
        className="
          pointer-events-none
          fixed
          z-10
          bg-scanlines
          bg-[length:100%_4px]
          animate-scan
          top-safe-top
          bottom-safe-bottom
          left-safe-left
          right-safe-right
        "
      />
      
      {phase !== 'exit' && (
        <div className="fixed inset-0 flex justify-center items-center pointer-events-none z-30">
          <div
            className="w-screen h-screen bg-surface-card origin-center animate-crtRectMobile md:animate-crtRect"
            onAnimationEnd={() => setPhase('card')}
          />
        </div>
      )}

      {phase === 'exit' && (
        <div className="fixed inset-0 flex justify-center items-center pointer-events-none z-30">
          <div
            className="w-screen h-screen bg-surface-card origin-center scale-y-75 scale-x-[0.7] rounded-xl animate-crtRectReverseMobile md:animate-crtRectReverse"
            onAnimationEnd={() => {
              setIsPreviewOpen(false);
              onClose();
            }}
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
