
import React from 'react';

interface ViewerControlsProps {
  zoom: number;
  windowWidth: number;
  windowCenter: number;
  brightness: number;
  contrast: number;
  onZoomChange: (zoom: number) => void;
  onWindowWidthChange: (width: number) => void;
  onWindowCenterChange: (center: number) => void;
  onBrightnessChange: (brightness: number) => void;
  onContrastChange: (contrast: number) => void;
}

export function ViewerControls({
  zoom,
  windowWidth,
  windowCenter,
  brightness,
  contrast,
  onZoomChange,
  onWindowWidthChange,
  onWindowCenterChange,
  onBrightnessChange,
  onContrastChange,
}: ViewerControlsProps) {
  return (
    <div className="absolute bottom-4 left-4 bg-black/80 rounded-lg p-4 text-white text-sm min-w-64">
      <h3 className="font-semibold mb-3">Image Controls</h3>
      
      <div className="space-y-3">
        {/* Zoom */}
        <div>
          <label className="block mb-1">Zoom: {(zoom * 100).toFixed(0)}%</label>
          <input
            type="range"
            min="0.1"
            max="5"
            step="0.1"
            value={zoom}
            onChange={(e) => onZoomChange(Number(e.target.value))}
            className="w-full accent-orange-500"
          />
        </div>

        {/* Window Width */}
        <div>
          <label className="block mb-1">Window Width: {windowWidth.toFixed(0)}</label>
          <input
            type="range"
            min="1"
            max="2000"
            step="10"
            value={windowWidth}
            onChange={(e) => onWindowWidthChange(Number(e.target.value))}
            className="w-full accent-orange-500"
          />
        </div>

        {/* Window Center */}
        <div>
          <label className="block mb-1">Window Center: {windowCenter.toFixed(0)}</label>
          <input
            type="range"
            min="-1000"
            max="1000"
            step="10"
            value={windowCenter}
            onChange={(e) => onWindowCenterChange(Number(e.target.value))}
            className="w-full accent-orange-500"
          />
        </div>

        {/* Brightness */}
        <div>
          <label className="block mb-1">Brightness: {brightness.toFixed(0)}%</label>
          <input
            type="range"
            min="-100"
            max="100"
            step="5"
            value={brightness}
            onChange={(e) => onBrightnessChange(Number(e.target.value))}
            className="w-full accent-orange-500"
          />
        </div>

        {/* Contrast */}
        <div>
          <label className="block mb-1">Contrast: {contrast.toFixed(0)}%</label>
          <input
            type="range"
            min="-100"
            max="100"
            step="5"
            value={contrast}
            onChange={(e) => onContrastChange(Number(e.target.value))}
            className="w-full accent-orange-500"
          />
        </div>
      </div>
    </div>
  );
}
