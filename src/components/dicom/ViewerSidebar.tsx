
import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { WindowingPresets } from './WindowingPresets';

interface ViewerSidebarProps {
  patientData: {
    patientName: string;
    studyDate: string;
    modality: string;
    bodyPart: string;
    images: Array<{ id: number; url: string; name?: string }>;
  };
  currentImageIndex: number;
  onClose: () => void;
  onImageSelect: (index: number) => void;
  onPresetApply: (width: number, center: number) => void;
}

export function ViewerSidebar({ 
  patientData, 
  currentImageIndex, 
  onClose, 
  onImageSelect,
  onPresetApply 
}: ViewerSidebarProps) {
  return (
    <div className="w-80 bg-gray-900 border-l border-gray-700 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-white">Study Info</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-gray-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Patient Information */}
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-sm font-semibold text-gray-300 mb-2">Patient Information</h3>
        <div className="space-y-2 text-sm">
          <div>
            <span className="text-gray-400">Name:</span>
            <span className="text-white ml-2">{patientData.patientName}</span>
          </div>
          <div>
            <span className="text-gray-400">Study Date:</span>
            <span className="text-white ml-2">{patientData.studyDate}</span>
          </div>
          <div>
            <span className="text-gray-400">Modality:</span>
            <span className="text-white ml-2">{patientData.modality}</span>
          </div>
          <div>
            <span className="text-gray-400">Body Part:</span>
            <span className="text-white ml-2">{patientData.bodyPart}</span>
          </div>
        </div>
      </div>

      {/* Series/Images */}
      <div className="p-4 flex-1 max-h-64 overflow-y-auto border-b border-gray-700">
        <h3 className="text-sm font-semibold text-gray-300 mb-2">Image Series</h3>
        <div className="space-y-2">
          {patientData.images.map((image, index) => (
            <div
              key={image.id}
              onClick={() => onImageSelect(index)}
              className={`flex items-center gap-3 p-2 rounded cursor-pointer ${
                index === currentImageIndex 
                  ? 'bg-orange-600 hover:bg-orange-700' 
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              <img
                src={image.url}
                alt={`Image ${index + 1}`}
                className="w-12 h-12 object-cover rounded"
              />
              <div className="flex-1">
                <p className="text-white text-sm">Image {index + 1}</p>
                <p className="text-gray-400 text-xs">512 x 512</p>
              </div>
              {index === currentImageIndex && (
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Window Presets */}
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-sm font-semibold text-gray-300 mb-2">
          Window Presets
          <span className="text-xs text-gray-500 ml-2">(Press 1-6)</span>
        </h3>
        <WindowingPresets onPresetApply={onPresetApply} />
      </div>

      {/* Keyboard Shortcuts Help */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-300 mb-2">Shortcuts</h3>
        <div className="text-xs text-gray-400 space-y-1">
          <div>P - Pan | Z - Zoom | W - Window</div>
          <div>M - Measure | R - Reset | S - Sidebar</div>
          <div>← → - Navigate | +/- - Zoom</div>
        </div>
      </div>
    </div>
  );
}
