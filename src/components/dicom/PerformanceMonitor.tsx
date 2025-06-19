
import React, { useEffect, useState, useRef } from 'react';

interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  batteryLevel?: number;
  isLowPowerMode?: boolean;
  connectionType?: string;
  renderTime: number;
  imageLoadTime: number;
}

interface PerformanceMonitorProps {
  onMetricsUpdate?: (metrics: PerformanceMetrics) => void;
  onPerformanceWarning?: (warning: string) => void;
}

export function PerformanceMonitor({
  onMetricsUpdate,
  onPerformanceWarning
}: PerformanceMonitorProps) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memoryUsage: 0,
    renderTime: 0,
    imageLoadTime: 0
  });
  
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const renderStartRef = useRef(0);
  const metricsIntervalRef = useRef<NodeJS.Timeout>();

  // FPS monitoring
  const measureFPS = () => {
    frameCountRef.current++;
    const currentTime = performance.now();
    const deltaTime = currentTime - lastTimeRef.current;
    
    if (deltaTime >= 1000) { // Update every second
      const fps = Math.round((frameCountRef.current * 1000) / deltaTime);
      frameCountRef.current = 0;
      lastTimeRef.current = currentTime;
      
      setMetrics(prev => ({ ...prev, fps }));
      
      // Warn if FPS drops significantly
      if (fps < 30 && onPerformanceWarning) {
        onPerformanceWarning(`Low FPS detected: ${fps}fps`);
      }
    }
    
    requestAnimationFrame(measureFPS);
  };

  // Memory usage monitoring
  const measureMemoryUsage = (): number => {
    if ('memory' in performance) {
      const memInfo = (performance as any).memory;
      return Math.round(memInfo.usedJSHeapSize / 1024 / 1024); // MB
    }
    return 0;
  };

  // Battery API monitoring (if available)
  const getBatteryInfo = async (): Promise<{ level?: number; isLowPowerMode?: boolean }> => {
    try {
      if ('getBattery' in navigator) {
        const battery = await (navigator as any).getBattery();
        return {
          level: Math.round(battery.level * 100),
          isLowPowerMode: battery.level < 0.2 // Consider low power when < 20%
        };
      }
    } catch (error) {
      console.warn('Battery API not available');
    }
    return {};
  };

  // Network connection monitoring
  const getConnectionInfo = (): string => {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      return connection.effectiveType || connection.type || 'unknown';
    }
    return 'unknown';
  };

  // Render time measurement
  const startRenderMeasurement = () => {
    renderStartRef.current = performance.now();
  };

  const endRenderMeasurement = () => {
    const renderTime = performance.now() - renderStartRef.current;
    setMetrics(prev => ({ ...prev, renderTime }));
    
    if (renderTime > 16.67 && onPerformanceWarning) { // > 60fps threshold
      onPerformanceWarning(`Slow render detected: ${renderTime.toFixed(2)}ms`);
    }
  };

  // Image load time tracking
  const trackImageLoad = (startTime: number) => {
    const imageLoadTime = performance.now() - startTime;
    setMetrics(prev => ({ ...prev, imageLoadTime }));
    
    if (imageLoadTime > 2000 && onPerformanceWarning) { // > 2 seconds
      onPerformanceWarning(`Slow image load: ${imageLoadTime.toFixed(0)}ms`);
    }
  };

  // Performance optimization recommendations
  const getOptimizationRecommendations = (currentMetrics: PerformanceMetrics): string[] => {
    const recommendations: string[] = [];
    
    if (currentMetrics.fps < 30) {
      recommendations.push('Consider reducing image quality or canvas size');
    }
    
    if (currentMetrics.memoryUsage > 100) {
      recommendations.push('High memory usage detected - consider clearing old images');
    }
    
    if (currentMetrics.isLowPowerMode) {
      recommendations.push('Device in low power mode - disable animations');
    }
    
    if (currentMetrics.connectionType?.includes('2g') || currentMetrics.connectionType?.includes('slow')) {
      recommendations.push('Slow connection detected - use lower quality images');
    }
    
    return recommendations;
  };

  // Main metrics collection
  const collectMetrics = async () => {
    const memoryUsage = measureMemoryUsage();
    const batteryInfo = await getBatteryInfo();
    const connectionType = getConnectionInfo();
    
    const newMetrics: PerformanceMetrics = {
      ...metrics,
      memoryUsage,
      batteryLevel: batteryInfo.level,
      isLowPowerMode: batteryInfo.isLowPowerMode,
      connectionType
    };
    
    setMetrics(newMetrics);
    
    if (onMetricsUpdate) {
      onMetricsUpdate(newMetrics);
    }
    
    // Check for performance issues
    const recommendations = getOptimizationRecommendations(newMetrics);
    if (recommendations.length > 0 && onPerformanceWarning) {
      recommendations.forEach(rec => onPerformanceWarning(rec));
    }
  };

  useEffect(() => {
    // Start FPS monitoring
    requestAnimationFrame(measureFPS);
    
    // Collect other metrics every 5 seconds
    metricsIntervalRef.current = setInterval(collectMetrics, 5000);
    
    // Initial metrics collection
    collectMetrics();
    
    // Expose performance utilities globally
    if (typeof window !== 'undefined') {
      (window as any).performanceMonitor = {
        startRenderMeasurement,
        endRenderMeasurement,
        trackImageLoad,
        getCurrentMetrics: () => metrics
      };
    }
    
    return () => {
      if (metricsIntervalRef.current) {
        clearInterval(metricsIntervalRef.current);
      }
    };
  }, []);

  return null; // This is a logic-only component
}
