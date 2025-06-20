
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { X, ZoomIn, ZoomOut, RotateCw, Move, ChevronLeft, ChevronRight, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DicomViewerProps {
  dicomData: {
    patientName: string;
    studyDate: string;
    modality: string;
    bodyPart: string;
    images: Array<{ id: number; url: string; name?: string }>;
  };
  onClose?: () => void;
}

export function DicomViewer({ dicomData, onClose }: DicomViewerProps) {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [showAdvancedControls, setShowAdvancedControls] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  // Render image on canvas
  const renderImage = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !imageRef.current) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2 + pan.x, canvas.height / 2 + pan.y);
    ctx.scale(zoom, zoom);
    ctx.filter = `brightness(${100 + brightness}%) contrast(${100 + contrast}%)`;
    
    ctx.drawImage(
      imageRef.current,
      -imageRef.current.width / 2,
      -imageRef.current.height / 2,
      imageRef.current.width,
      imageRef.current.height
    );
    
    ctx.restore();
  }, [zoom, pan, brightness, contrast]);

  // Load current image
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imageRef.current = img;
      renderImage();
    };
    img.src = dicomData.images[currentImageIndex].url;
  }, [currentImageIndex, renderImage]);

  // Setup canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      renderImage();
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [renderImage]);

  // Mouse interactions
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => Math.max(0.5, Math.min(5, prev * zoomFactor)));
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between text-white">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-semibold truncate">{dicomData.patientName}</h2>
            <p className="text-sm text-gray-300">
              {dicomData.modality} • {dicomData.bodyPart} • {dicomData.studyDate}
            </p>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAdvancedControls(!showAdvancedControls)}
              className="text-white hover:bg-gray-700"
            >
              <Settings className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="text-white hover:bg-gray-700"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main viewer */}
      <div className="flex-1 flex">
        <div 
          ref={containerRef}
          className="flex-1 relative bg-black"
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
          />

          {/* Navigation */}
          {dicomData.images.length > 1 && (
            <>
              <button
                onClick={() => setCurrentImageIndex(prev => prev > 0 ? prev - 1 : dicomData.images.length - 1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentImageIndex(prev => prev < dicomData.images.length - 1 ? prev + 1 : 0)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Image info */}
          <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-2 rounded text-sm">
            <div>Zoom: {(zoom * 100).toFixed(0)}%</div>
            {dicomData.images.length > 1 && (
              <div>Image: {currentImageIndex + 1} / {dicomData.images.length}</div>
            )}
          </div>
        </div>

        {/* Controls sidebar */}
        {showAdvancedControls && (
          <div className="w-80 bg-gray-900 border-l border-gray-700 p-4 text-white">
            <h3 className="text-lg font-semibold mb-4">Controls</h3>
            
            <div className="space-y-4">
              {/* Zoom controls */}
              <div>
                <label className="block text-sm font-medium mb-2">Zoom: {(zoom * 100).toFixed(0)}%</label>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setZoom(prev => Math.max(0.5, prev / 1.2))}
                    className="flex-1"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setZoom(1)}
                    className="flex-1"
                  >
                    1:1
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setZoom(prev => Math.min(5, prev * 1.2))}
                    className="flex-1"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Brightness */}
              <div>
                <label className="block text-sm font-medium mb-2">Brightness: {brightness}%</label>
                <input
                  type="range"
                  min="-100"
                  max="100"
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  className="w-full accent-accent"
                />
              </div>

              {/* Contrast */}
              <div>
                <label className="block text-sm font-medium mb-2">Contrast: {contrast}%</label>
                <input
                  type="range"
                  min="-100"
                  max="100"
                  value={contrast}
                  onChange={(e) => setContrast(Number(e.target.value))}
                  className="w-full accent-accent"
                />
              </div>

              {/* Reset */}
              <Button
                variant="outline"
                onClick={() => {
                  setZoom(1);
                  setPan({ x: 0, y: 0 });
                  setBrightness(0);
                  setContrast(0);
                }}
                className="w-full"
              >
                <Move className="w-4 h-4 mr-2" />
                Reset View
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
