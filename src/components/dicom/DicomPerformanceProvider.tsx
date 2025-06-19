
import React, { createContext, useContext, useEffect, useState } from 'react';
import { PerformanceMonitor } from './PerformanceMonitor';
import { OfflineCache } from './OfflineCache';

interface DicomPerformanceContextType {
  isHighPerformance: boolean;
  batteryLevel?: number;
  connectionQuality: 'fast' | 'slow' | 'offline';
  cacheStats: {
    totalSize: number;
    itemCount: number;
    hitRate: number;
  };
}

const DicomPerformanceContext = createContext<DicomPerformanceContextType>({
  isHighPerformance: true,
  connectionQuality: 'fast',
  cacheStats: { totalSize: 0, itemCount: 0, hitRate: 0 }
});

export const useDicomPerformance = () => useContext(DicomPerformanceContext);

interface DicomPerformanceProviderProps {
  children: React.ReactNode;
}

export function DicomPerformanceProvider({ children }: DicomPerformanceProviderProps) {
  const [isHighPerformance, setIsHighPerformance] = useState(true);
  const [batteryLevel, setBatteryLevel] = useState<number>();
  const [connectionQuality, setConnectionQuality] = useState<'fast' | 'slow' | 'offline'>('fast');
  const [cacheStats, setCacheStats] = useState({
    totalSize: 0,
    itemCount: 0,
    hitRate: 0
  });

  const handlePerformanceUpdate = (metrics: any) => {
    // Determine if device is high performance based on multiple factors
    const highPerf = metrics.fps > 45 && 
                    metrics.memoryUsage < 200 && 
                    !metrics.isLowPowerMode;
    setIsHighPerformance(highPerf);
    setBatteryLevel(metrics.batteryLevel);
    
    // Determine connection quality
    if (!navigator.onLine) {
      setConnectionQuality('offline');
    } else if (metrics.connectionType?.includes('2g') || 
               metrics.connectionType?.includes('slow')) {
      setConnectionQuality('slow');
    } else {
      setConnectionQuality('fast');
    }
  };

  const handlePerformanceWarning = (warning: string) => {
    console.warn('DICOM Performance Warning:', warning);
    // Could implement user notifications here
  };

  const handleCacheUpdate = (stats: any) => {
    setCacheStats({
      totalSize: stats.totalSize,
      itemCount: stats.itemCount,
      hitRate: stats.hitRate
    });
  };

  return (
    <DicomPerformanceContext.Provider value={{
      isHighPerformance,
      batteryLevel,
      connectionQuality,
      cacheStats
    }}>
      <PerformanceMonitor
        onMetricsUpdate={handlePerformanceUpdate}
        onPerformanceWarning={handlePerformanceWarning}
      />
      <OfflineCache
        maxCacheSize={connectionQuality === 'slow' ? 25 : 50}
        onCacheUpdate={handleCacheUpdate}
      />
      {children}
    </DicomPerformanceContext.Provider>
  );
}
