
import React from 'react';
import { Button } from '@/components/ui/button';
import { ViewerToolbar } from './ViewerToolbar';
import { ArrowLeft } from 'lucide-react';

interface DicomHeaderProps {
  patientData: {
    patientName: string;
    studyDate: string;
    modality: string;
    bodyPart: string;
  };
  activeTool: 'pan' | 'zoom' | 'windowing' | 'measure' | 'annotate';
  showSidebar: boolean;
  onGoBack: () => void;
  onToolChange: (tool: 'pan' | 'zoom' | 'windowing' | 'measure' | 'annotate') => void;
  onReset: () => void;
  onToggleSidebar: () => void;
}

export function DicomHeader({
  patientData,
  activeTool,
  showSidebar,
  onGoBack,
  onToolChange,
  onReset,
  onToggleSidebar,
}: DicomHeaderProps) {
  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-800 bg-black text-white">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onGoBack}
          className="text-white hover:text-accent hover:bg-gray-800"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold">{patientData.patientName}</h1>
          <p className="text-xs sm:text-sm text-gray-400">
            {patientData.modality} • {patientData.bodyPart} • {patientData.studyDate}
          </p>
        </div>
      </div>
      
      <ViewerToolbar
        activeTool={activeTool}
        onToolChange={onToolChange}
        onReset={onReset}
        onToggleSidebar={onToggleSidebar}
        showSidebar={showSidebar}
      />
    </header>
  );
}
