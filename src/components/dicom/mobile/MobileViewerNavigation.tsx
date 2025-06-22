
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MobileViewerNavigationProps {
  currentImageIndex: number;
  totalImages: number;
  showControls: boolean;
  zoom: number;
  onPreviousImage: () => void;
  onNextImage: () => void;
}

export function MobileViewerNavigation({
  currentImageIndex,
  totalImages,
  showControls,
  zoom,
  onPreviousImage,
  onNextImage,
}: MobileViewerNavigationProps) {
  if (totalImages <= 1) return null;

  return (
    <>
      {/* Navigation arrows */}
      <button
        onClick={onPreviousImage}
        className={`absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full transition-opacity duration-300 min-h-11 min-w-11 flex items-center justify-center ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={onNextImage}
        className={`absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full transition-opacity duration-300 min-h-11 min-w-11 flex items-center justify-center ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Image counter */}
      <div className={`absolute top-16 sm:top-20 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        {currentImageIndex + 1} / {totalImages}
      </div>

      {/* Zoom indicator */}
      <div className={`absolute top-16 sm:top-20 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        {(zoom * 100).toFixed(0)}%
      </div>
    </>
  );
}
