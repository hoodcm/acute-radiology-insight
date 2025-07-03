
import { View } from 'lucide-react';

interface PostCardActionsProps {
  title: string;
  id: string;
  previewOpen: boolean;
  onPreviewToggle: (e: React.MouseEvent | React.KeyboardEvent) => void;
}

export function PostCardActions({ 
  title, 
  id,
  previewOpen, 
  onPreviewToggle 
}: PostCardActionsProps) {
  return (
    <div className="absolute bottom-3 right-3 z-10 flex gap-2">
      <button
        onClick={onPreviewToggle}
        onKeyDown={onPreviewToggle}
        className="touch-target focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-md"
        aria-label={previewOpen ? `Close preview of ${title}` : `Preview ${title}`}
        aria-expanded={previewOpen}
        aria-controls={`preview-${id}`}
      >
        <div className="relative inline-block transform transition-transform duration-150 ease-out">
          <span
            aria-hidden="true"
            className="absolute inset-0 translate-x-[2px] translate-y-[2px] rounded-md bg-shadow-hard"
          />
          <span
            className={`
              relative border-2 border-border rounded-md min-w-[44px] min-h-[44px] w-12 h-12 flex items-center justify-center p-1.5 transition-all duration-150 ease-out
              ${
                previewOpen
                  ? 'translate-x-[2px] translate-y-[2px] bg-accent text-surface-card'
                  : 'bg-surface-card text-text-primary hover:-translate-y-[1px] hover:bg-accent hover:text-surface-card'
              }
            `}
          >
            <View className="w-20 h-20" aria-hidden="true" />
          </span>
        </div>
      </button>
    </div>
  );
}
