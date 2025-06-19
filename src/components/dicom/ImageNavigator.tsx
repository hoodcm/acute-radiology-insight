
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageNavigatorProps {
  currentImageIndex: number;
  totalImages: number;
  onImageChange: (index: number) => void;
  images: Array<{ id: number; url: string; name?: string }>;
}

export function ImageNavigator({
  currentImageIndex,
  totalImages,
  onImageChange,
  images,
}: ImageNavigatorProps) {
  const handlePrevious = () => {
    const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : totalImages - 1;
    onImageChange(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentImageIndex < totalImages - 1 ? currentImageIndex + 1 : 0;
    onImageChange(newIndex);
  };

  return (
    <div className="absolute bottom-4 right-4 bg-black/80 rounded-lg p-3 text-white">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePrevious}
          className="text-white hover:bg-gray-700 p-1"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        
        <div className="text-sm font-medium">
          {currentImageIndex + 1} / {totalImages}
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleNext}
          className="text-white hover:bg-gray-700 p-1"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
      
      {/* Image thumbnails */}
      <div className="flex gap-1 mt-2 max-w-48 overflow-x-auto">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => onImageChange(index)}
            className={`flex-shrink-0 w-8 h-8 rounded border-2 overflow-hidden ${
              index === currentImageIndex ? 'border-orange-500' : 'border-gray-600'
            }`}
          >
            <img
              src={image.url}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
