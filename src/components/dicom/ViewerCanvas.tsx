
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { MeasurementTool } from './MeasurementTool';
import { AnnotationTool } from './AnnotationTool';
import { ProgressiveImageLoader } from './ProgressiveImageLoader';
import { ImagePreloader } from './ImagePreloader';
import { PerformanceMonitor } from './PerformanceMonitor';
import { OfflineCache } from './OfflineCache';

interface ViewerCanvasProps {
  imageUrl: string;
  zoom: number;
  pan: { x: number; y: number };
  windowWidth: number;
  windowCenter: number;
  brightness: number;
  contrast: number;
  activeTool: 'pan' | 'zoom' | 'windowing' | 'measure' | 'annotate';
  onZoomChange: (zoom: number) => void;
  onPanChange: (pan: { x: number; y: number }) => void;
  onWindowingChange: (width: number, center: number) => void;
}

export function ViewerCanvas({
  imageUrl,
  zoom,
  pan,
  windowWidth,
  windowCenter,
  brightness,
  contrast,
  activeTool,
  onZoomChange,
  onPanChange,
  onWindowingChange,
}: ViewerCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imageData, setImageData] = useState<HTMLImageElement | null>(null);
  const [measurements, setMeasurements] = useState([]);
  const [annotations, setAnnotations] = useState([]);
  const [currentQuality, setCurrentQuality] = useState<'low' | 'medium' | 'high'>('low');
  const [isOptimizedMode, setIsOptimizedMode] = useState(false);

  // Performance monitoring
  const handlePerformanceWarning = (warning: string) => {
    console.warn('Performance warning:', warning);
    
    // Enable optimization mode if performance is poor
    if (warning.includes('Low FPS') || warning.includes('Slow render')) {
      setIsOptimizedMode(true);
      console.log('Enabled optimization mode due to performance issues');
    }
  };

  // Progressive image loading
  const handleProgressiveImageLoad = (loadedImage: HTMLImageElement, quality: string) => {
    setImageData(loadedImage);
    setCurrentQuality(quality as 'low' | 'medium' | 'high');
    console.log(`Progressive load complete: ${quality} quality`);
    
    // Track performance
    if (typeof window !== 'undefined' && (window as any).performanceMonitor) {
      (window as any).performanceMonitor.trackImageLoad(performance.now());
    }
  };

  const handleProgressiveImageError = (error: Error) => {
    console.error('Progressive image load error:', error);
    
    // Try to load from offline cache
    if (typeof window !== 'undefined' && (window as any).offlineCache) {
      const cachedData = (window as any).offlineCache.getCachedImage(imageUrl);
      if (cachedData) {
        const img = new Image();
        img.onload = () => setImageData(img);
        img.src = cachedData;
      }
    }
  };

  // Generate progressive resolutions
  const generateProgressiveResolutions = (url: string) => {
    return [
      { url: url, quality: 'low' as const, size: 1 },
      { url: url, quality: 'medium' as const, size: 2 },
      { url: url, quality: 'high' as const, size: 3 }
    ];
  };

  // Render canvas with performance optimizations
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !imageData) return;

    // Start performance measurement
    if (typeof window !== 'undefined' && (window as any).performanceMonitor) {
      (window as any).performanceMonitor.startRenderMeasurement();
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply transformations
    ctx.save();
    ctx.translate(canvas.width / 2 + pan.x, canvas.height / 2 + pan.y);
    ctx.scale(zoom, zoom);

    // Optimize rendering based on performance mode
    if (isOptimizedMode) {
      // Use lower quality rendering for better performance
      ctx.imageSmoothingEnabled = false;
      ctx.imageSmoothingQuality = 'low';
    } else {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
    }

    // Apply image filters for windowing, brightness, and contrast
    const windowMin = windowCenter - windowWidth / 2;
    const windowMax = windowCenter + windowWidth / 2;
    
    ctx.filter = `brightness(${100 + brightness}%) contrast(${100 + contrast}%)`;

    // Draw image centered
    ctx.drawImage(
      imageData,
      -imageData.width / 2,
      -imageData.height / 2,
      imageData.width,
      imageData.height
    );

    ctx.restore();

    // End performance measurement
    if (typeof window !== 'undefined' && (window as any).performanceMonitor) {
      (window as any).performanceMonitor.endRenderMeasurement();
    }
  }, [imageData, zoom, pan, windowWidth, windowCenter, brightness, contrast, isOptimizedMode]);

  // Update canvas size with debouncing for performance
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let resizeTimeout: NodeJS.Timeout;
    
    const resizeCanvas = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const rect = container.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        renderCanvas();
      }, 100); // Debounce resize events
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearTimeout(resizeTimeout);
    };
  }, [renderCanvas]);

  // Render when dependencies change with throttling
  useEffect(() => {
    // Throttle rendering for better performance
    const throttleTimeout = setTimeout(() => {
      renderCanvas();
    }, isOptimizedMode ? 33 : 16); // 30fps vs 60fps

    return () => clearTimeout(throttleTimeout);
  }, [renderCanvas, isOptimizedMode]);

  // Mouse event handlers with performance optimizations
  const handleMouseDown = (e: React.MouseEvent) => {
    if (activeTool === 'measure' || activeTool === 'annotate') return;
    
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || activeTool === 'measure' || activeTool === 'annotate') return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    if (activeTool === 'pan') {
      onPanChange({
        x: pan.x + deltaX,
        y: pan.y + deltaY,
      });
    } else if (activeTool === 'windowing') {
      const sensitivity = isOptimizedMode ? 4 : 2; // Reduce sensitivity in optimized mode
      const newWidth = Math.max(1, windowWidth + deltaX * sensitivity);
      const newCenter = windowCenter + deltaY * sensitivity;
      onWindowingChange(newWidth, newCenter);
    }

    setDragStart({ x: e.clientX, y: e.clientY });
  }, [isDragging, activeTool, dragStart, pan, windowWidth, windowCenter, isOptimizedMode]);

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    
    if (activeTool === 'zoom' || e.ctrlKey) {
      const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
      const newZoom = Math.max(0.1, Math.min(10, zoom * zoomFactor));
      onZoomChange(newZoom);
    }
  };

  const getCursor = () => {
    if (activeTool === 'measure') return 'crosshair';
    if (activeTool === 'annotate') return 'crosshair';
    switch (activeTool) {
      case 'pan': return isDragging ? 'grabbing' : 'grab';
      case 'zoom': return 'zoom-in';
      case 'windowing': return 'crosshair';
      default: return 'default';
    }
  };

  return (
    <div 
      ref={containerRef}
      className="w-full h-full bg-black relative overflow-hidden"
      style={{ cursor: getCursor() }}
    >
      {/* Performance monitoring */}
      <PerformanceMonitor onPerformanceWarning={handlePerformanceWarning} />
      
      {/* Offline caching */}
      <OfflineCache maxCacheSize={50} />
      
      {/* Progressive image loading */}
      <ProgressiveImageLoader
        resolutions={generateProgressiveResolutions(imageUrl)}
        onImageLoad={handleProgressiveImageLoad}
        onError={handleProgressiveImageError}
        priority={true}
      />
      
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      />
      
      {/* Measurement overlay */}
      <MeasurementTool
        isActive={activeTool === 'measure'}
        zoom={zoom}
        onMeasurementsChange={setMeasurements}
      />
      
      {/* Annotation overlay */}
      <AnnotationTool
        isActive={activeTool === 'annotate'}
        annotations={annotations}
        onAnnotationsChange={setAnnotations}
      />
      
      {/* Image info overlay */}
      <div className="absolute top-4 left-4 text-white text-sm bg-black/50 px-2 py-1 rounded">
        Zoom: {(zoom * 100).toFixed(0)}% | Quality: {currentQuality}
        {isOptimizedMode && <span className="text-yellow-400 ml-2">⚡ Optimized</span>}
      </div>
      
      <div className="absolute top-4 right-4 text-white text-sm bg-black/50 px-2 py-1 rounded">
        W: {windowWidth.toFixed(0)} | C: {windowCenter.toFixed(0)}
      </div>

      {/* Tool indicator */}
      <div className="absolute bottom-4 left-4 text-white text-xs bg-black/50 px-2 py-1 rounded">
        Tool: {activeTool.charAt(0).toUpperCase() + activeTool.slice(1)}
      </div>
      
      {/* Annotations counter */}
      {annotations.length > 0 && (
        <div className="absolute top-16 right-4 text-white text-xs bg-blue-600/80 px-2 py-1 rounded">
          {annotations.length} annotation{annotations.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
}
