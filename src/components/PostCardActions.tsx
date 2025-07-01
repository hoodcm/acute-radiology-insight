
import { Eye, View } from 'lucide-react';
import type { Post } from '@/data/posts';

interface PostCardActionsProps {
  post: Post;
  hasImaging: boolean;
  previewOpen: boolean;
  onViewImages: (e: React.MouseEvent) => void;
  onPreviewToggle: (e: React.MouseEvent | React.KeyboardEvent) => void;
}

export function PostCardActions({ 
  post, 
  hasImaging, 
  previewOpen, 
  onViewImages, 
  onPreviewToggle 
}: PostCardActionsProps) {
  return (
    <div className="absolute bottom-3 right-3 z-10 flex gap-2">
      {hasImaging && (
        <button
          onClick={onViewImages}
          className="touch-target focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-md"
          aria-label={`View images for ${post.title}`}
        >
          <div className="relative inline-block transform transition-transform duration-150 ease-out">
            <span
              aria-hidden="true"
              className="absolute inset-0 translate-x-[2px] translate-y-[2px] rounded-md bg-shadow-hard"
            />
            <span
              className="relative border-2 border-border rounded-md h-8 px-3 flex items-center justify-center gap-1 transition-all duration-150 ease-out bg-surface-card text-text-primary hover:-translate-y-[1px] hover:bg-accent hover:text-surface-card"
            >
              <Eye className="w-3 h-3 mr-1" />
              View Images
            </span>
          </div>
        </button>
      )}
      
      <button
        onClick={onPreviewToggle}
        onKeyDown={onPreviewToggle}
        className="touch-target focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-md"
        aria-label={previewOpen ? `Close preview of ${post.title}` : `Preview ${post.title}`}
        aria-expanded={previewOpen}
        aria-controls={`preview-${post.id}`}
      >
        <div className="relative inline-block transform transition-transform duration-150 ease-out">
          <span
            aria-hidden="true"
            className="absolute inset-0 translate-x-[2px] translate-y-[2px] rounded-md bg-shadow-hard"
          />
          <span
            className={`
              relative border-2 border-border rounded-md min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center p-2 transition-all duration-150 ease-out
              ${
                previewOpen
                  ? 'translate-x-[2px] translate-y-[2px] bg-accent text-surface-card'
                  : 'bg-surface-card text-text-primary hover:-translate-y-[1px] hover:bg-accent hover:text-surface-card'
              }
            `}
          >
            <View className="w-5 h-5" aria-hidden="true" />
          </span>
        </div>
      </button>
    </div>
  );
}
