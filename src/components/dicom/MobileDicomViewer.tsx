
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { X, ZoomIn, ZoomOut, RotateCw, Move, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MobileDicomViewerProps {
  dicomData: {
    patientName: string;
    studyDate: string;
    modality: string;
    bodyPart: string;
    images: Array<{ id: number; url: string; name?: string }>;
  };
  onClose?: () => void;
}

export function MobileDicomViewer({ dicomData, onClose }: MobileDicomViewerProps) {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showControls, setShowControls] = useState(true);
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  // Auto-hide controls after inactivity
  const resetControlsTimeout = useCallback(() => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    setShowControls(true);
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  }, []);

  // Load and render image
  const renderImage = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !imageRef.current) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply transformations
    ctx.save();
    ctx.translate(canvas.width / 2 + pan.x, canvas.height / 2 + pan.y);
    ctx.scale(zoom, zoom);

    // Apply filters for brightness and contrast
    ctx.filter = `brightness(${100 + brightness}%) contrast(${100 + contrast}%)`;

    // Draw image centered
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

  // Setup canvas size
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

  // Touch and mouse event handlers
  const handleStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    setDragStart({ x: clientX - pan.x, y: clientY - pan.y });
    resetControlsTimeout();
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    
    setPan({
      x: clientX - dragStart.x,
      y: clientY - dragStart.y,
    });
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX, e.clientY);
    }
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      handleStart(touch.clientX, touch.clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (e.touches.length === 1 && isDragging) {
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    }
  };

  // Pinch-to-zoom for touch devices
  const [lastPinchDistance, setLastPinchDistance] = useState(0);

  const getPinchDistance = (touches: React.TouchList) => {
    if (touches.length < 2) return 0;
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStartPinch = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      setLastPinchDistance(getPinchDistance(e.touches));
      setIsDragging(false);
    } else if (e.touches.length === 1) {
      handleTouchStart(e);
    }
  };

  const handleTouchMovePinch = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const distance = getPinchDistance(e.touches);
      if (lastPinchDistance > 0) {
        const scale = distance / lastPinchDistance;
        const newZoom = Math.max(0.5, Math.min(5, zoom * scale));
        setZoom(newZoom);
      }
      setLastPinchDistance(distance);
    } else if (e.touches.length === 1) {
      handleTouchMove(e);
    }
  };

  // Navigation
  const handlePrevImage = () => {
    setCurrentImageIndex(prev => prev > 0 ? prev - 1 : dicomData.images.length - 1);
    resetControlsTimeout();
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev => prev < dicomData.images.length - 1 ? prev + 1 : 0);
    resetControlsTimeout();
  };

  // Zoom controls
  const handleZoomIn = () => {
    setZoom(prev => Math.min(5, prev * 1.2));
    resetControlsTimeout();
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(0.5, prev / 1.2));
    resetControlsTimeout();
  };

  // Reset view
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setBrightness(0);
    setContrast(0);
    resetControlsTimeout();
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };

  // Initialize controls timeout
  useEffect(() => {
    resetControlsTimeout();
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [resetControlsTimeout]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header - only visible when controls are shown */}
      <div className={`absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex items-center justify-between text-white">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold truncate">{dicomData.patientName}</h2>
            <p className="text-sm text-gray-300 truncate">
              {dicomData.modality} • {dicomData.bodyPart} • {dicomData.studyDate}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="text-white hover:bg-white/20 ml-2"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Main viewer area */}
      <div 
        ref={containerRef}
        className="flex-1 relative overflow-hidden"
        onClick={resetControlsTimeout}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleTouchStartPinch}
          onTouchMove={handleTouchMovePinch}
          onTouchEnd={handleEnd}
        />

        {/* Navigation arrows */}
        {dicomData.images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className={`absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNextImage}
              className={`absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Image counter */}
        {dicomData.images.length > 1 && (
          <div className={`absolute top-20 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
            {currentImageIndex + 1} / {dicomData.images.length}
          </div>
        )}

        {/* Zoom indicator */}
        <div className={`absolute top-20 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          {(zoom * 100).toFixed(0)}%
        </div>
      </div>

      {/* Bottom controls */}
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleZoomOut}
            className="text-white hover:bg-white/20"
            disabled={zoom <= 0.5}
          >
            <ZoomOut className="w-5 h-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-white hover:bg-white/20"
          >
            <Move className="w-5 h-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleZoomIn}
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
              onChange={(e) => setBrightness(Number(e.target.value))}
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
              onChange={(e) => setContrast(Number(e.target.value))}
              className="flex-1 accent-accent"
            />
            <span className="w-8 text-right">{contrast}%</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Navigation
  function handlePrevImage() {
    setCurrentImageIndex(prev => prev > 0 ? prev - 1 : dicomData.images.length - 1);
    resetControlsTimeout();
  }

  function handleNextImage() {
    setCurrentImageIndex(prev => prev < dicomData.images.length - 1 ? prev + 1 : 0);
    resetControlsTimeout();
  }

  // Zoom controls
  function handleZoomIn() {
    setZoom(prev => Math.min(5, prev * 1.2));
    resetControlsTimeout();
  }

  function handleZoomOut() {
    setZoom(prev => Math.max(0.5, prev / 1.2));
    resetControlsTimeout();
  }

  // Reset view
  function handleReset() {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setBrightness(0);
    setContrast(0);
    resetControlsTimeout();
  }

  function handleClose() {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  }

  // Initialize controls timeout
  useEffect(() => {
    resetControlsTimeout();
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [resetControlsTimeout]);
}
