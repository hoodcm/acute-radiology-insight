import React from 'react';
import { ImageGallery } from './ImageGallery';
import { Button } from './ui/button';
import { Eye, Image, Activity, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMobile } from '@/hooks/use-mobile';

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
    <div className="my-12 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-accent/10 p-2 rounded-full">
          <Activity className="w-6 h-6 text-accent" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Interactive Medical Images
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
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
                className="relative overflow-hidden rounded-lg border-2 border-gray-200 dark:border-gray-700"
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
            <Button 
              onClick={handleOpenViewer}
              className="bg-accent hover:bg-accent/90 text-black font-medium"
            >
              {isMobile ? <Smartphone className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
              {isMobile ? 'Open Mobile Viewer' : 'Open in DICOM Viewer'}
            </Button>
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-accent/5 rounded-lg border-l-4 border-accent">
        <div className="flex items-start gap-2">
          <Image className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-1">
              {isMobile ? 'Mobile-Optimized Viewer' : 'Advanced Imaging Features'}
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
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
