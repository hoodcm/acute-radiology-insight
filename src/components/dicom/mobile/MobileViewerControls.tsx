
import React from 'react';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, Move } from 'lucide-react';

interface MobileViewerControlsProps {
  zoom: number;
  brightness: number;
  contrast: number;
  showControls: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onBrightnessChange: (value: number) => void;
  onContrastChange: (value: number) => void;
}

export function MobileViewerControls({
  zoom,
  brightness,
  contrast,
  showControls,
  onZoomIn,
  onZoomOut,
  onReset,
  onBrightnessChange,
  onContrastChange,
}: MobileViewerControlsProps) {
  return (
    <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="flex items-center justify-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onZoomOut}
          className="text-white hover:bg-white/20"
          disabled={zoom <= 0.5}
        >
          <ZoomOut className="w-5 h-5" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="text-white hover:bg-white/20"
        >
          <Move className="w-5 h-5" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onZoomIn}
          className="text-white hover:bg-white/20"
          disabled={zoom >= 5}
        >
          <ZoomIn className="w-5 h-5" />
        </Button>
      </div>

      {/* Simple brightness/contrast sliders for mobile */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-white text-sm">
          <span className="w-16">Brightness</span>
          <input
            type="range"
            min="-50"
            max="50"
            value={brightness}
            onChange={(e) => onBrightnessChange(Number(e.target.value))}
            className="flex-1 accent-accent"
          />
          <span className="w-8 text-right">{brightness}%</span>
        </div>
        <div className="flex items-center gap-2 text-white text-sm">
          <span className="w-16">Contrast</span>
          <input
            type="range"
            min="-50"
            max="50"
            value={contrast}
            onChange={(e) => onContrastChange(Number(e.target.value))}
            className="flex-1 accent-accent"
          />
          <span className="w-8 text-right">{contrast}%</span>
        </div>
      </div>
    </div>
  );
}
