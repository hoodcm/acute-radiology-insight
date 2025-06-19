
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ImageData {
  id: string;
  url: string;
  title: string;
  description?: string;
  modality?: string;
  bodyPart?: string;
}

interface ImageGalleryProps {
  images: ImageData[];
  caseId: string;
  title: string;
}

export function ImageGallery({ images, caseId, title }: ImageGalleryProps) {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageClick = (image: ImageData, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    const nextIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(nextIndex);
    setSelectedImage(images[nextIndex]);
  };

  const handlePrev = () => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    setCurrentIndex(prevIndex);
    setSelectedImage(images[prevIndex]);
  };

  const handleViewInDicom = () => {
    navigate(`/viewer/${caseId}`);
  };

  return (
    <div className="my-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
          Medical Images
        </h3>
        <Button 
          onClick={handleViewInDicom}
          className="bg-accent hover:bg-accent/90 text-black font-medium"
        >
          <Eye className="w-4 h-4 mr-2" />
          Open in DICOM Viewer
        </Button>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {images.map((image, index) => (
          <div 
            key={image.id}
            className="relative cursor-pointer group overflow-hidden rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-accent transition-colors"
            onClick={() => handleImageClick(image, index)}
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
              <h4 className="text-white font-medium text-sm">{image.title}</h4>
              {image.modality && (
                <span className="text-accent text-xs font-medium">{image.modality}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-accent transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-accent transition-colors z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-accent transition-colors z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div className="max-w-4xl max-h-full flex flex-col">
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="max-w-full max-h-[70vh] object-contain"
            />
            <div className="bg-black/80 text-white p-4 mt-4 rounded">
              <h3 className="text-lg font-bold mb-2">{selectedImage.title}</h3>
              {selectedImage.description && (
                <p className="text-gray-300 mb-2">{selectedImage.description}</p>
              )}
              <div className="flex gap-4 text-sm">
                {selectedImage.modality && (
                  <span className="text-accent">Modality: {selectedImage.modality}</span>
                )}
                {selectedImage.bodyPart && (
                  <span className="text-accent">Body Part: {selectedImage.bodyPart}</span>
                )}
              </div>
              <div className="mt-4">
                <Button 
                  onClick={handleViewInDicom}
                  className="bg-accent hover:bg-accent/90 text-black"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Open in Advanced Viewer
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
