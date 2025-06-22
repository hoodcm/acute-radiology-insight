
import React, { useRef, useEffect, useState, useCallback } from 'react';

interface MobileStackViewerProps {
  images: Array<{ id: number; url: string; name?: string }>;
  patientName: string;
  modality: string;
  bodyPart: string;
  studyDate: string;
}

export function MobileStackViewer({ 
  images, 
  patientName,
  modality,
  bodyPart,
  studyDate 
}: MobileStackViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [windowLevel, setWindowLevel] = useState({ width: 400, center: 40 });
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  
  // Touch handling state
  const [isDragging, setIsDragging] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [isWindowing, setIsWindowing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastPinchDistance, setLastPinchDistance] = useState(0);
  const [lastTouchY, setLastTouchY] = useState(0);
  
  // Image loading state
  const [loadedImages, setLoadedImages] = useState<Map<number, HTMLImageElement>>(new Map());
  const [currentImage, setCurrentImage] = useState<HTMLImageElement | null>(null);

  // Preload images
  useEffect(() => {
    const preloadImage = (index: number) => {
      if (loadedImages.has(index)) return;
      
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        setLoadedImages(prev => new Map(prev).set(index, img));
        if (index === currentImageIndex) {
          setCurrentImage(img);
        }
      };
      img.src = images[index].url;
    };

    // Preload current and adjacent images
    preloadImage(currentImageIndex);
    if (currentImageIndex > 0) preloadImage(currentImageIndex - 1);
    if (currentImageIndex < images.length - 1) preloadImage(currentImageIndex + 1);
  }, [currentImageIndex, images, loadedImages]);

  // Update current image when index changes
  useEffect(() => {
    const img = loadedImages.get(currentImageIndex);
    if (img) {
      setCurrentImage(img);
    }
  }, [currentImageIndex, loadedImages]);

  // Canvas rendering with improved centering
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !currentImage) return;

    // Clear canvas with black background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Calculate scaling to fit image in viewport while maintaining aspect ratio
    const canvasAspect = canvas.width / canvas.height;
    const imageAspect = currentImage.width / currentImage.height;
    
    let baseScale;
    if (imageAspect > canvasAspect) {
      // Image is wider - fit to width
      baseScale = canvas.width / currentImage.width;
    } else {
      // Image is taller - fit to height
      baseScale = canvas.height / currentImage.height;
    }

    // Apply transformations
    ctx.save();
    ctx.translate(canvas.width / 2 + pan.x, canvas.height / 2 + pan.y);
    ctx.scale(zoom * baseScale, zoom * baseScale);

    // Apply image processing with windowing simulation
    const normalizedBrightness = brightness;
    const normalizedContrast = contrast;
    ctx.filter = `brightness(${100 + normalizedBrightness}%) contrast(${100 + normalizedContrast}%)`;

    // Draw image centered
    ctx.drawImage(
      currentImage,
      -currentImage.width / 2,
      -currentImage.height / 2,
      currentImage.width,
      currentImage.height
    );

    ctx.restore();
  }, [currentImage, zoom, pan, brightness, contrast]);

  // Setup canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      renderCanvas();
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [renderCanvas]);

  // Render when dependencies change
  useEffect(() => {
    renderCanvas();
  }, [renderCanvas]);

  // Touch event utilities - Fixed TypeScript errors
  const getTouchDistance = (touches: React.TouchList) => {
    if (touches.length < 2) return 0;
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const getTouchCenter = (touches: React.TouchList) => {
    if (touches.length < 2) return { x: 0, y: 0 };
    return {
      x: (touches[0].clientX + touches[1].clientX) / 2,
      y: (touches[0].clientY + touches[1].clientY) / 2,
    };
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    
    if (e.touches.length === 1) {
      // Single touch - prepare for pan or scroll
      const touch = e.touches[0];
      setDragStart({ x: touch.clientX, y: touch.clientY });
      setLastTouchY(touch.clientY);
      setIsDragging(true);
      setIsZooming(false);
      setIsWindowing(false);
    } else if (e.touches.length === 2) {
      // Two touches - pinch zoom or windowing
      const distance = getTouchDistance(e.touches);
      const center = getTouchCenter(e.touches);
      
      setLastPinchDistance(distance);
      setDragStart(center);
      setIsDragging(false);
      setIsZooming(true);
      setIsWindowing(false);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    
    if (e.touches.length === 1 && isDragging) {
      const touch = e.touches[0];
      const deltaX = touch.clientX - dragStart.x;
      const deltaY = touch.clientY - dragStart.y;
      
      // Vertical gesture for image scrolling (when not zoomed)
      if (zoom <= 1.1 && Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 20) {
        const sensitivity = 100;
        if (deltaY > sensitivity && currentImageIndex > 0) {
          setCurrentImageIndex(prev => prev - 1);
          setDragStart({ x: touch.clientX, y: touch.clientY });
        } else if (deltaY < -sensitivity && currentImageIndex < images.length - 1) {
          setCurrentImageIndex(prev => prev + 1);
          setDragStart({ x: touch.clientX, y: touch.clientY });
        }
      } else {
        // Horizontal pan when zoomed
        setPan(prev => ({
          x: prev.x + deltaX * 0.8,
          y: prev.y + deltaY * 0.8,
        }));
        setDragStart({ x: touch.clientX, y: touch.clientY });
      }
    } else if (e.touches.length === 2 && isZooming) {
      const distance = getTouchDistance(e.touches);
      const center = getTouchCenter(e.touches);
      
      if (lastPinchDistance > 0) {
        // Pinch to zoom
        const scale = distance / lastPinchDistance;
        const newZoom = Math.max(0.5, Math.min(5, zoom * scale));
        setZoom(newZoom);
        
        // Two-finger windowing (if moving vertically)
        const deltaY = center.y - dragStart.y;
        const deltaX = center.x - dragStart.x;
        if (Math.abs(deltaY) > 5 || Math.abs(deltaX) > 5) {
          const windowSensitivity = 3;
          const newWidth = Math.max(50, Math.min(2000, windowLevel.width + deltaY * windowSensitivity));
          const newCenter = Math.max(-1000, Math.min(3000, windowLevel.center + deltaX * windowSensitivity * 0.5));
          
          setWindowLevel({ width: newWidth, center: newCenter });
          setBrightness(prev => Math.max(-100, Math.min(100, prev + deltaY * 0.2)));
          setContrast(prev => Math.max(-100, Math.min(100, prev + deltaX * 0.2)));
        }
      }
      
      setLastPinchDistance(distance);
      setDragStart(center);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setIsZooming(false);
    setIsWindowing(false);
    setLastPinchDistance(0);
  };

  // Double tap to reset
  const handleDoubleClick = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setBrightness(0);
    setContrast(0);
    setWindowLevel({ width: 400, center: 40 });
  };

  return (
    <div className="fixed inset-0 bg-black">
      {/* Full screen canvas container */}
      <div 
        ref={containerRef}
        className="w-full h-full relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onDoubleClick={handleDoubleClick}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full touch-none"
          style={{ touchAction: 'none' }}
        />
        
        {/* Minimal info overlay */}
        <div className="absolute top-4 left-4 text-white text-xs bg-black/50 px-3 py-2 rounded opacity-90 pointer-events-none">
          {currentImageIndex + 1}/{images.length}
        </div>
        
        <div className="absolute top-4 right-4 text-white text-xs bg-black/50 px-3 py-2 rounded opacity-90 pointer-events-none">
          {(zoom * 100).toFixed(0)}%
        </div>
        
        {/* Windowing info */}
        <div className="absolute top-16 right-4 text-white text-xs bg-black/50 px-3 py-2 rounded opacity-90 pointer-events-none">
          W: {windowLevel.width.toFixed(0)} L: {windowLevel.center.toFixed(0)}
        </div>
        
        {/* Patient info */}
        <div className="absolute bottom-4 left-4 text-white text-xs bg-black/50 px-3 py-2 rounded opacity-75 pointer-events-none">
          {patientName} • {modality} • {bodyPart}
        </div>
        
        {/* Loading indicator */}
        {!currentImage && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
}
