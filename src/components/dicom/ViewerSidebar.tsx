
import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface ViewerSidebarProps {
  patientData: {
    patientName: string;
    studyDate: string;
    modality: string;
    bodyPart: string;
    images: Array<{ id: number; url: string }>;
  };
  onClose: () => void;
}

export function ViewerSidebar({ patientData, onClose }: ViewerSidebarProps) {
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
      <div className="p-4 flex-1">
        <h3 className="text-sm font-semibold text-gray-300 mb-2">Image Series</h3>
        <div className="space-y-2">
          {patientData.images.map((image, index) => (
            <div
              key={image.id}
              className="flex items-center gap-3 p-2 rounded bg-gray-800 hover:bg-gray-700 cursor-pointer"
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
            </div>
          ))}
        </div>
      </div>

      {/* Presets */}
      <div className="p-4 border-t border-gray-700">
        <h3 className="text-sm font-semibold text-gray-300 mb-2">Window Presets</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-xs text-white border-gray-600 hover:bg-gray-700"
          >
            Soft Tissue
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs text-white border-gray-600 hover:bg-gray-700"
          >
            Bone
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs text-white border-gray-600 hover:bg-gray-700"
          >
            Lung
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs text-white border-gray-600 hover:bg-gray-700"
          >
            Brain
          </Button>
        </div>
      </div>
    </div>
  );
}
