
import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface MobileViewerHeaderProps {
  patientName: string;
  modality: string;
  bodyPart: string;
  studyDate: string;
  showControls: boolean;
  onClose: () => void;
}

export function MobileViewerHeader({
  patientName,
  modality,
  bodyPart,
  studyDate,
  showControls,
  onClose,
}: MobileViewerHeaderProps) {
  return (
    <div className={`absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="flex items-center justify-between text-white">
        <div className="flex-1 min-w-0">
          <h2 className="text-base sm:text-lg lg:text-xl font-semibold truncate">{patientName}</h2>
          <p className="text-xs sm:text-sm text-gray-300 truncate">
            {modality} • {bodyPart} • {studyDate}
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-white hover:bg-white/20 ml-2 shrink-0"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
