
import React, { useEffect, useState } from 'react';

interface CachedImage {
  url: string;
  data: string; // base64 encoded image data
  timestamp: number;
  size: number;
  accessCount: number;
  lastAccessed: number;
}

interface OfflineCacheProps {
  maxCacheSize?: number; // in MB
  maxCacheAge?: number; // in milliseconds
  onCacheUpdate?: (stats: CacheStats) => void;
}

interface CacheStats {
  totalSize: number;
  itemCount: number;
  hitRate: number;
  lastCleanup: number;
}

export function OfflineCache({
  maxCacheSize = 50, // 50MB default
  maxCacheAge = 7 * 24 * 60 * 60 * 1000, // 7 days default
  onCacheUpdate
}: OfflineCacheProps) {
  const [cacheStats, setCacheStats] = useState<CacheStats>({
    totalSize: 0,
    itemCount: 0,
    hitRate: 0,
    lastCleanup: Date.now()
  });

  const CACHE_KEY = 'dicom-image-cache';
  const STATS_KEY = 'dicom-cache-stats';

  // Get cached images from localStorage
  const getCachedImages = (): Map<string, CachedImage> => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        return new Map(Object.entries(parsed));
      }
    } catch (error) {
      console.warn('Failed to load cache:', error);
    }
    return new Map();
  };

  // Save cached images to localStorage
  const saveCachedImages = (cache: Map<string, CachedImage>) => {
    try {
      const cacheObject = Object.fromEntries(cache);
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheObject));
      updateCacheStats(cache);
    } catch (error) {
      console.warn('Failed to save cache:', error);
      // If storage is full, try to cleanup and retry
      if (error.name === 'QuotaExceededError') {
        cleanupCache(cache, true);
        try {
          const cacheObject = Object.fromEntries(cache);
          localStorage.setItem(CACHE_KEY, JSON.stringify(cacheObject));
        } catch (retryError) {
          console.error('Failed to save cache after cleanup:', retryError);
        }
      }
    }
  };

  // Convert image to base64 for caching
  const imageToBase64 = (imageUrl: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }
        
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        try {
          const base64 = canvas.toDataURL('image/jpeg', 0.8); // Compress to 80% quality
          resolve(base64);
        } catch (error) {
          reject(error);
        }
      };
      
      img.onerror = () => reject(new Error('Failed to load image for caching'));
      img.src = imageUrl;
    });
  };

  // Cache an image
  const cacheImage = async (url: string): Promise<boolean> => {
    try {
      console.log(`Caching image: ${url}`);
      const base64Data = await imageToBase64(url);
      const cache = getCachedImages();
      
      const cachedImage: CachedImage = {
        url,
        data: base64Data,
        timestamp: Date.now(),
        size: base64Data.length,
        accessCount: 1,
        lastAccessed: Date.now()
      };
      
      cache.set(url, cachedImage);
      
      // Check if we need to cleanup before saving
      const totalSize = Array.from(cache.values()).reduce((sum, img) => sum + img.size, 0);
      if (totalSize > maxCacheSize * 1024 * 1024) { // Convert MB to bytes
        cleanupCache(cache);
      }
      
      saveCachedImages(cache);
      console.log(`Successfully cached image: ${url}`);
      return true;
    } catch (error) {
      console.warn(`Failed to cache image ${url}:`, error);
      return false;
    }
  };

  // Get cached image
  const getCachedImage = (url: string): string | null => {
    const cache = getCachedImages();
    const cachedImage = cache.get(url);
    
    if (cachedImage) {
      // Check if cache is still valid
      const age = Date.now() - cachedImage.timestamp;
      if (age > maxCacheAge) {
        cache.delete(url);
        saveCachedImages(cache);
        return null;
      }
      
      // Update access stats
      cachedImage.accessCount++;
      cachedImage.lastAccessed = Date.now();
      cache.set(url, cachedImage);
      saveCachedImages(cache);
      
      console.log(`Cache hit for: ${url}`);
      return cachedImage.data;
    }
    
    console.log(`Cache miss for: ${url}`);
    return null;
  };

  // Cleanup old or least used cache entries
  const cleanupCache = (cache?: Map<string, CachedImage>, aggressive = false) => {
    const currentCache = cache || getCachedImages();
    const now = Date.now();
    
    console.log('Starting cache cleanup...');
    
    // Remove expired entries
    for (const [url, cachedImage] of currentCache.entries()) {
      const age = now - cachedImage.timestamp;
      if (age > maxCacheAge) {
        currentCache.delete(url);
        console.log(`Removed expired cache entry: ${url}`);
      }
    }
    
    // If still over limit or aggressive cleanup, remove least recently used
    const totalSize = Array.from(currentCache.values()).reduce((sum, img) => sum + img.size, 0);
    const maxBytes = maxCacheSize * 1024 * 1024;
    
    if (totalSize > maxBytes || aggressive) {
      const sortedEntries = Array.from(currentCache.entries())
        .sort(([, a], [, b]) => {
          // Sort by access count (ascending) then by last accessed (ascending)
          if (a.accessCount !== b.accessCount) {
            return a.accessCount - b.accessCount;
          }
          return a.lastAccessed - b.lastAccessed;
        });
      
      let currentSize = totalSize;
      const targetSize = aggressive ? maxBytes * 0.7 : maxBytes; // Aggressive cleanup to 70%
      
      for (const [url] of sortedEntries) {
        if (currentSize <= targetSize) break;
        
        const entry = currentCache.get(url);
        if (entry) {
          currentSize -= entry.size;
          currentCache.delete(url);
          console.log(`Removed LRU cache entry: ${url}`);
        }
      }
    }
    
    saveCachedImages(currentCache);
    console.log(`Cache cleanup completed. Entries: ${currentCache.size}`);
  };

  // Update cache statistics
  const updateCacheStats = (cache: Map<string, CachedImage>) => {
    const totalSize = Array.from(cache.values()).reduce((sum, img) => sum + img.size, 0);
    const itemCount = cache.size;
    
    // Calculate hit rate (simplified)
    const totalAccesses = Array.from(cache.values()).reduce((sum, img) => sum + img.accessCount, 0);
    const hitRate = itemCount > 0 ? (totalAccesses / itemCount) : 0;
    
    const newStats: CacheStats = {
      totalSize: Math.round(totalSize / 1024 / 1024 * 100) / 100, // MB with 2 decimal places
      itemCount,
      hitRate: Math.round(hitRate * 100) / 100,
      lastCleanup: cacheStats.lastCleanup
    };
    
    setCacheStats(newStats);
    
    if (onCacheUpdate) {
      onCacheUpdate(newStats);
    }
  };

  // Clear all cache
  const clearCache = () => {
    localStorage.removeItem(CACHE_KEY);
    localStorage.removeItem(STATS_KEY);
    setCacheStats({
      totalSize: 0,
      itemCount: 0,
      hitRate: 0,
      lastCleanup: Date.now()
    });
    console.log('Cache cleared');
  };

  // Preload frequently accessed images
  const preloadFrequentImages = async (imageUrls: string[]) => {
    const cache = getCachedImages();
    const frequentUrls = imageUrls
      .filter(url => !cache.has(url))
      .slice(0, 5); // Limit to 5 images to avoid overwhelming
    
    console.log(`Preloading ${frequentUrls.length} frequently accessed images...`);
    
    const cachePromises = frequentUrls.map(url => cacheImage(url));
    await Promise.allSettled(cachePromises);
  };

  // Initialize cache management
  useEffect(() => {
    const cache = getCachedImages();
    updateCacheStats(cache);
    
    // Schedule periodic cleanup
    const cleanupInterval = setInterval(() => {
      cleanupCache();
      setCacheStats(prev => ({ ...prev, lastCleanup: Date.now() }));
    }, 60 * 60 * 1000); // Every hour
    
    // Expose cache utilities globally
    if (typeof window !== 'undefined') {
      (window as any).offlineCache = {
        cacheImage,
        getCachedImage,
        clearCache,
        preloadFrequentImages,
        getStats: () => cacheStats
      };
    }
    
    return () => clearInterval(cleanupInterval);
  }, []);

  return null; // This is a logic-only component
}
