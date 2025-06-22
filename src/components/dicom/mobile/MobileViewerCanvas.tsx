
import React, { useRef, useEffect, useCallback } from 'react';

interface MobileViewerCanvasProps {
  zoom: number;
  pan: { x: number; y: number };
  brightness: number;
  contrast: number;
  imageUrl: string;
  onMouseDown: (e: React.MouseEvent) => void;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
}

export function MobileViewerCanvas({
  zoom,
  pan,
  brightness,
  contrast,
  imageUrl,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onMouseLeave,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}: MobileViewerCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

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
    img.src = imageUrl;
  }, [imageUrl, renderImage]);

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

  return (
    <div ref={containerRef} className="flex-1 relative overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      />
    </div>
  );
}
