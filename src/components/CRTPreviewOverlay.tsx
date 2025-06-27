
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

  // Extract CRT animation values to match content container size
  const crtFinalTransform = {
    scaleY: 0.75,
    scaleX: 0.7,
    borderRadius: '1rem'
  };

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

  const handleRectEnd = () => {
    setPhase('card');
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 pointer-events-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`preview-title-${post.id}`}
      aria-describedby={`preview-desc-${post.id}`}
    >
      {phase === 'rect' && (
        <div className="fixed inset-0 flex justify-center items-center pointer-events-none">
          <div
            className="w-screen h-screen bg-white dark:bg-white origin-center animate-crtRect"
            onAnimationEnd={() => setTimeout(handleRectEnd, 200)}
          />
        </div>
      )}

      {phase === 'exit' && (
        <div className="fixed inset-0 flex justify-center items-center pointer-events-none">
          <div
            className="w-screen h-screen bg-white dark:bg-white origin-center scale-y-75 scale-x-[0.7] rounded-xl animate-crtRectReverse"
            onAnimationEnd={() => setTimeout(onClose, 200)}
          />
        </div>
      )}

      {phase === 'card' && (
        <div 
          className="fixed inset-0 flex justify-center items-center pointer-events-none"
          style={{
            transform: `scaleY(${crtFinalTransform.scaleY}) scaleX(${crtFinalTransform.scaleX})`,
            borderRadius: crtFinalTransform.borderRadius
          }}
        >
          <div className="w-screen h-screen bg-background dark:bg-[#2A1B1F] opacity-0 animate-crtContentFadeIn pointer-events-auto flex items-center justify-center p-6">
            <div className="w-full max-w-md sm:max-w-xl lg:max-w-2xl">
              <h3 id={`preview-title-${post.id}`} className="text-2xl font-bold mb-4">
                {post.title}
              </h3>
              <p id={`preview-desc-${post.id}`} className="text-base mb-6 leading-relaxed">
                {post.description}
              </p>
              {hasImaging && (
                <Button onClick={onViewImages} className="bg-accent hover:bg-accent/90 text-black font-medium mb-4">
                  <Eye className="w-4 h-4 mr-2" />
                  Launch DICOM Viewer
                </Button>
              )}
              <p className="text-sm text-muted-foreground">Press Escape to close</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CRTPreviewOverlay;
