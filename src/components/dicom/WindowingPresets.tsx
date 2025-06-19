
import React from 'react';
import { Button } from '@/components/ui/button';

interface WindowingPreset {
  name: string;
  width: number;
  center: number;
  key: string;
  description: string;
}

interface WindowingPresetsProps {
  onPresetApply: (width: number, center: number) => void;
}

const presets: WindowingPreset[] = [
  { name: 'Soft Tissue', width: 400, center: 40, key: '1', description: 'General soft tissue visualization' },
  { name: 'Bone', width: 1500, center: 300, key: '2', description: 'Bone and calcification detection' },
  { name: 'Lung', width: 1500, center: -600, key: '3', description: 'Pulmonary parenchyma and airways' },
  { name: 'Brain', width: 80, center: 40, key: '4', description: 'Brain tissue differentiation' },
  { name: 'Liver', width: 150, center: 30, key: '5', description: 'Hepatic parenchyma evaluation' },
  { name: 'Abdomen', width: 350, center: 50, key: '6', description: 'Abdominal organs visualization' },
  { name: 'Mediastinum', width: 350, center: 50, key: '7', description: 'Mediastinal structures' },
  { name: 'Spine', width: 250, center: 50, key: '8', description: 'Spinal cord and vertebrae' },
  { name: 'Pelvis', width: 400, center: 40, key: '9', description: 'Pelvic organs and bones' },
];

export function WindowingPresets({ onPresetApply }: WindowingPresetsProps) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-1">
        {presets.map((preset) => (
          <Button
            key={preset.name}
            variant="outline"
            size="sm"
            onClick={() => onPresetApply(preset.width, preset.center)}
            className="text-xs text-white border-gray-600 hover:bg-gray-700 relative h-12 flex flex-col justify-center"
            title={`${preset.description} - W: ${preset.width}, C: ${preset.center} (Press ${preset.key})`}
          >
            <span className="font-medium">{preset.name}</span>
            <span className="text-[10px] text-gray-400 absolute top-1 right-1">
              {preset.key}
            </span>
          </Button>
        ))}
      </div>
      
      {/* Custom windowing input */}
      <div className="border-t border-gray-700 pt-3">
        <h4 className="text-xs font-medium text-gray-300 mb-2">Custom Window</h4>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-gray-400">Width</label>
            <input
              type="number"
              placeholder="400"
              className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-xs text-white"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const width = parseInt(e.currentTarget.value);
                  const centerInput = e.currentTarget.parentElement?.parentElement?.querySelector('input[placeholder="40"]') as HTMLInputElement;
                  const center = parseInt(centerInput?.value || '40');
                  if (!isNaN(width) && !isNaN(center)) {
                    onPresetApply(width, center);
                  }
                }
              }}
            />
          </div>
          <div>
            <label className="text-xs text-gray-400">Center</label>
            <input
              type="number"
              placeholder="40"
              className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-xs text-white"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const center = parseInt(e.currentTarget.value);
                  const widthInput = e.currentTarget.parentElement?.parentElement?.querySelector('input[placeholder="400"]') as HTMLInputElement;
                  const width = parseInt(widthInput?.value || '400');
                  if (!isNaN(width) && !isNaN(center)) {
                    onPresetApply(width, center);
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
