
import React from 'react';
import { ResponsiveDicomViewer } from './ResponsiveDicomViewer';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DicomViewerOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  forceMode?: 'desktop' | 'mobile';
}

export function DicomViewerOverlay({ isOpen, onClose, forceMode }: DicomViewerOverlayProps) {
  // Medical imaging test data with grayscale images for better windowing demonstration
  const dicomData = {
    patientName: 'Test Patient',
    studyDate: '2024-01-15',
    modality: 'CT',
    bodyPart: 'Chest',
    images: [
      { 
        id: 1, 
        url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=512&h=512&fit=crop&auto=format&q=80&sat=-100', 
        name: 'Axial 001' 
      },
      { 
        id: 2, 
        url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=512&h=512&fit=crop&auto=format&q=80&sat=-100', 
        name: 'Axial 002' 
      },
      { 
        id: 3, 
        url: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=512&h=512&fit=crop&auto=format&q=80&sat=-100', 
        name: 'Axial 003' 
      },
      { 
        id: 4, 
        url: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=512&h=512&fit=crop&auto=format&q=80&sat=-100', 
        name: 'Axial 004' 
      },
      { 
        id: 5, 
        url: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=512&h=512&fit=crop&auto=format&q=80&sat=-100', 
        name: 'Axial 005' 
      },
    ]
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
      <div className="relative w-full h-full max-w-7xl max-h-screen m-4">
        <Button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/70 text-white border-none"
          size="icon"
        >
          <X className="w-4 h-4" />
        </Button>
        <div className="w-full h-full bg-black rounded-lg overflow-hidden">
          <ResponsiveDicomViewer 
            dicomData={dicomData} 
            onClose={onClose}
            forceMode={forceMode}
          />
        </div>
      </div>
    </div>
  );
}
