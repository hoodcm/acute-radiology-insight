
import React, { useState, useEffect } from 'react';
import { DicomViewer } from './DicomViewer';
import { MobileDicomViewer } from './MobileDicomViewer';
import { useMobile } from '@/hooks/use-mobile';

interface ResponsiveDicomViewerProps {
  dicomData: {
    patientName: string;
    studyDate: string;
    modality: string;
    bodyPart: string;
    images: Array<{ id: number; url: string; name?: string }>;
  };
  onClose?: () => void;
  forceMode?: 'desktop' | 'mobile';
}

export function ResponsiveDicomViewer({ 
  dicomData, 
  onClose,
  forceMode
}: ResponsiveDicomViewerProps) {
  const isMobile = useMobile();
  const [viewerMode, setViewerMode] = useState<'desktop' | 'mobile'>('desktop');

  useEffect(() => {
    if (forceMode) {
      setViewerMode(forceMode);
    } else {
      // Auto-detect based on screen size and device capabilities
      const shouldUseMobile = isMobile || window.innerWidth < 768 || 
                             ('ontouchstart' in window && window.innerWidth < 1024);
      setViewerMode(shouldUseMobile ? 'mobile' : 'desktop');
    }
  }, [isMobile, forceMode]);

  if (viewerMode === 'mobile') {
    return <MobileDicomViewer dicomData={dicomData} onClose={onClose} />;
  }

  return <DicomViewer dicomData={dicomData} onClose={onClose} />;
}
