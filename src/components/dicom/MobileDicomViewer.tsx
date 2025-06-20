
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileViewerHeader } from './mobile/MobileViewerHeader';
import { MobileViewerCanvas } from './mobile/MobileViewerCanvas';
import { MobileViewerNavigation } from './mobile/MobileViewerNavigation';
import { MobileViewerControls } from './mobile/MobileViewerControls';

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
  const [lastPinchDistance, setLastPinchDistance] = useState(0);
  
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
  const getPinchDistance = (touches: React.TouchList) => {
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
      <MobileViewerHeader
        patientName={dicomData.patientName}
        modality={dicomData.modality}
        bodyPart={dicomData.bodyPart}
        studyDate={dicomData.studyDate}
        showControls={showControls}
        onClose={handleClose}
      />

      {/* Main viewer area */}
      <div onClick={resetControlsTimeout}>
        <MobileViewerCanvas
          zoom={zoom}
          pan={pan}
          brightness={brightness}
          contrast={contrast}
          imageUrl={dicomData.images[currentImageIndex].url}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleTouchStartPinch}
          onTouchMove={handleTouchMovePinch}
          onTouchEnd={handleEnd}
        />

        <MobileViewerNavigation
          currentImageIndex={currentImageIndex}
          totalImages={dicomData.images.length}
          showControls={showControls}
          zoom={zoom}
          onPreviousImage={handlePrevImage}
          onNextImage={handleNextImage}
        />
      </div>

      <MobileViewerControls
        zoom={zoom}
        brightness={brightness}
        contrast={contrast}
        showControls={showControls}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onReset={handleReset}
        onBrightnessChange={setBrightness}
        onContrastChange={setContrast}
      />
    </div>
  );
}
