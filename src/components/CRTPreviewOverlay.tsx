
import { useRef, useEffect } from 'react';
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
  onViewImages 
}: CRTPreviewOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (overlayRef.current && overlayRef.current === event.target) {
        onClose();
      }
    }

    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-auto"
      style={{
        background: `
          linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.85) 0%,
            rgba(0, 0, 0, 0.9) 50%,
            rgba(0, 0, 0, 0.85) 100%
          ),
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 255, 0, 0.03) 2px,
            rgba(0, 255, 0, 0.03) 4px
          )
        `
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`preview-title-${post.id}`}
      aria-describedby={`preview-desc-${post.id}`}
    >
      {/* CRT expansion container */}
      <div className="w-full max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-2xl flex items-center justify-center pointer-events-none">
        <div className="w-full bg-background dark:bg-[#2A1B1F] rounded-lg shadow-[6px_6px_0px_rgb(0,0,0)] dark:shadow-[6px_6px_0px_rgba(114,43,55,1)] border-[2.5px] border-black dark:border-[#722b37] animate-crtExpand pointer-events-auto">
          <div className="p-6 animate-crtContentFadeIn">
            <h3 
              id={`preview-title-${post.id}`}
              className="text-2xl font-bold mb-4 font-jersey25"
            >
              {post.title}
            </h3>
            <p 
              id={`preview-desc-${post.id}`}
              className="text-base text-muted-foreground dark:text-white mb-6 leading-relaxed"
            >
              {post.description}
            </p>
            {hasImaging && (
              <div className="mb-6">
                <Button
                  onClick={onViewImages}
                  className="bg-accent hover:bg-accent/90 text-black font-medium"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Launch DICOM Viewer
                </Button>
              </div>
            )}
            <p className="text-sm text-muted-foreground">
              Press Escape to close preview
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
