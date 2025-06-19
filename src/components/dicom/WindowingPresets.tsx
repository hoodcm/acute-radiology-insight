
import React from 'react';
import { Button } from '@/components/ui/button';

interface WindowingPreset {
  name: string;
  width: number;
  center: number;
  key: string;
}

interface WindowingPresetsProps {
  onPresetApply: (width: number, center: number) => void;
}

const presets: WindowingPreset[] = [
  { name: 'Soft Tissue', width: 400, center: 40, key: '1' },
  { name: 'Bone', width: 1500, center: 300, key: '2' },
  { name: 'Lung', width: 1500, center: -600, key: '3' },
  { name: 'Brain', width: 80, center: 40, key: '4' },
  { name: 'Liver', width: 150, center: 30, key: '5' },
  { name: 'Abdomen', width: 350, center: 50, key: '6' },
];

export function WindowingPresets({ onPresetApply }: WindowingPresetsProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {presets.map((preset) => (
        <Button
          key={preset.name}
          variant="outline"
          size="sm"
          onClick={() => onPresetApply(preset.width, preset.center)}
          className="text-xs text-white border-gray-600 hover:bg-gray-700 relative"
          title={`W: ${preset.width}, C: ${preset.center} (Press ${preset.key})`}
        >
          {preset.name}
          <span className="absolute top-0 right-1 text-[10px] text-gray-400">
            {preset.key}
          </span>
        </Button>
      ))}
    </div>
  );
}
