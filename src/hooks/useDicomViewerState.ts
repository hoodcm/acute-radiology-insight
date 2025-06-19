
import { useState } from 'react';

export function useDicomViewerState() {
  const [windowWidth, setWindowWidth] = useState(400);
  const [windowCenter, setWindowCenter] = useState(40);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [activeTool, setActiveTool] = useState<'pan' | 'zoom' | 'windowing' | 'measure' | 'annotate'>('pan');
  const [showSidebar, setShowSidebar] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleToolChange = (tool: typeof activeTool) => {
    setActiveTool(tool);
  };

  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setWindowWidth(400);
    setWindowCenter(40);
    setBrightness(0);
    setContrast(0);
  };

  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleNextImage = (totalImages: number) => {
    const nextIndex = currentImageIndex < totalImages - 1 ? currentImageIndex + 1 : 0;
    setCurrentImageIndex(nextIndex);
  };

  const handlePrevImage = (totalImages: number) => {
    const prevIndex = currentImageIndex > 0 ? currentImageIndex - 1 : totalImages - 1;
    setCurrentImageIndex(prevIndex);
  };

  const handleZoomKeyboard = (direction: 'in' | 'out') => {
    const zoomFactor = direction === 'in' ? 1.2 : 0.8;
    const newZoom = Math.max(0.1, Math.min(10, zoom * zoomFactor));
    setZoom(newZoom);
  };

  const handlePresetKeyboard = (preset: string) => {
    const presets = {
      'soft-tissue': { width: 400, center: 40 },
      'bone': { width: 1500, center: 300 },
      'lung': { width: 1500, center: -600 },
      'brain': { width: 80, center: 40 },
      'liver': { width: 150, center: 30 },
      'abdomen': { width: 350, center: 50 },
      'mediastinum': { width: 350, center: 50 },
      'spine': { width: 250, center: 50 },
      'pelvis': { width: 400, center: 40 },
    };
    
    const presetValues = presets[preset as keyof typeof presets];
    if (presetValues) {
      setWindowWidth(presetValues.width);
      setWindowCenter(presetValues.center);
    }
  };

  const handlePresetApply = (width: number, center: number) => {
    setWindowWidth(width);
    setWindowCenter(center);
  };

  return {
    // State
    windowWidth,
    windowCenter,
    zoom,
    pan,
    brightness,
    contrast,
    activeTool,
    showSidebar,
    currentImageIndex,
    // Setters
    setWindowWidth,
    setWindowCenter,
    setZoom,
    setPan,
    setBrightness,
    setContrast,
    setShowSidebar,
    // Handlers
    handleToolChange,
    handleReset,
    handleImageChange,
    handleNextImage,
    handlePrevImage,
    handleZoomKeyboard,
    handlePresetKeyboard,
    handlePresetApply,
  };
}
