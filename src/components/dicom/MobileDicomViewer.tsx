
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileStackViewer } from './mobile/MobileStackViewer';

interface MobileDicomViewerProps {
  dicomData: {
    patientName: string;
    studyDate: string;
    modality: string;
    bodyPart: string;
    images: Array<{ id: number; url: string; name?: string }>;
  };
  onClose?: () => void;
}

export function MobileDicomViewer({ dicomData, onClose }: MobileDicomViewerProps) {
  const navigate = useNavigate();

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };

  // Add escape key handler
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <MobileStackViewer
      images={dicomData.images}
      patientName={dicomData.patientName}
      modality={dicomData.modality}
      bodyPart={dicomData.bodyPart}
      studyDate={dicomData.studyDate}
    />
  );
}
