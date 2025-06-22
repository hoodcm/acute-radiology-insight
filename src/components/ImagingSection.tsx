
import React from 'react';
import { ImageGallery } from './ImageGallery';
import { Image, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMobile } from '@/hooks/use-mobile';
import previewEyeIcon from '@/assets/preview-eye.png';

interface ImagingSectionProps {
  postType: 'Case Study' | 'Essay' | 'Hindsight';
  postSlug: string;
  title: string;
  hasInteractiveImages?: boolean;
}

export function ImagingSection({ postType, postSlug, title, hasInteractiveImages = false }: ImagingSectionProps) {
  const navigate = useNavigate();
  const isMobile = useMobile();

  // Mock image data based on post type
  const getMockImages = () => {
    const baseImages = [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=512&h=512&fit=crop',
        title: 'Initial CT Scan',
        description: 'Axial CT image showing pathological findings',
        modality: 'CT',
        bodyPart: 'Chest'
      },
      {
        id: '2',
        url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=512&h=512&fit=crop',
        title: 'Follow-up Study',
        description: 'Comparative imaging after treatment',
        modality: 'CT',
        bodyPart: 'Chest'
      },
      {
        id: '3',
        url: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=512&h=512&fit=crop',
        title: 'Coronal Reconstruction',
        description: 'Coronal view for better anatomical orientation',
        modality: 'CT',
        bodyPart: 'Chest'
      }
    ];

    switch (postType) {
      case 'Case Study':
        return baseImages;
      case 'Essay':
        return baseImages.slice(0, 2);
      case 'Hindsight':
        return baseImages.slice(0, 1);
      default:
        return [];
    }
  };

  const images = getMockImages();
  const caseId = postSlug.replace(/[^a-zA-Z0-9]/g, '-');

  const handleOpenViewer = () => {
    navigate(`/viewer/${caseId}`);
  };

  if (images.length === 0 || !hasInteractiveImages) {
    return null;
  }

  return (
    <div className="my-8 md:my-12 lg:my-16 p-4 sm:p-6 lg:p-8 bg-muted/30 rounded-lg border border-border">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-accent/10 p-2 rounded-full">
          <Activity className="w-6 h-6 text-accent" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
            Interactive Medical Images
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            {postType === 'Case Study' && 'Explore the complete imaging series with advanced DICOM tools'}
            {postType === 'Essay' && 'Reference images supporting the discussed concepts'}
            {postType === 'Hindsight' && 'Key imaging findings from the retrospective analysis'}
          </p>
        </div>
      </div>

      {postType === 'Case Study' ? (
        <ImageGallery images={images} caseId={caseId} title={title} />
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {images.map((image) => (
              <div 
                key={image.id}
                className="relative overflow-hidden rounded-lg border-2 border-border"
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <h4 className="text-white font-medium text-sm">{image.title}</h4>
                  <span className="text-accent text-xs font-medium">{image.modality}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={handleOpenViewer}
              className="min-h-11 min-w-11 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-md"
              aria-label="View images in DICOM viewer"
            >
              <div className="relative inline-block transform transition-transform duration-150 ease-out hover:-translate-y-0.5 active:translate-y-0">
                <span
                  aria-hidden="true"
                  className="absolute inset-0 translate-x-0.5 translate-y-0.5 rounded-md bg-black dark:bg-slate-700"
                />
                <span className="relative border-2 border-black dark:border-slate-700 rounded-md px-4 py-2 flex items-center justify-center gap-2 transition-all duration-150 ease-out bg-card text-foreground hover:bg-accent hover:text-accent-foreground">
                  <img 
                    src={previewEyeIcon} 
                    alt="" 
                    className="w-6 h-6 filter dark:invert" 
                    aria-hidden="true"
                  />
                  <span className="font-medium text-sm">
                    {isMobile ? 'Open Mobile Viewer' : 'Open in DICOM Viewer'}
                  </span>
                </span>
              </div>
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-accent/5 rounded-lg border-l-4 border-accent">
        <div className="flex items-start gap-2">
          <Image className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-foreground mb-1 text-sm sm:text-base">
              {isMobile ? 'Mobile-Optimized Viewer' : 'Advanced Imaging Features'}
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {isMobile 
                ? 'Touch-optimized interface with pinch-to-zoom, swipe navigation, and essential imaging controls designed for mobile devices.'
                : 'Use the DICOM viewer to adjust windowing, measure structures, and add annotations. Perfect for detailed case analysis and educational review.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
