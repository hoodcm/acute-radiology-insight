
import React, { useEffect } from 'react';

interface KeyboardShortcutsProps {
  onToolChange: (tool: 'pan' | 'zoom' | 'windowing' | 'measure' | 'annotate') => void;
  onReset: () => void;
  onToggleSidebar: () => void;
  onNextImage: () => void;
  onPrevImage: () => void;
  onZoom: (direction: 'in' | 'out') => void;
  onPreset: (preset: string) => void;
}

export function KeyboardShortcuts({
  onToolChange,
  onReset,
  onToggleSidebar,
  onNextImage,
  onPrevImage,
  onZoom,
  onPreset,
}: KeyboardShortcutsProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key.toLowerCase()) {
        case 'p':
          e.preventDefault();
          onToolChange('pan');
          break;
        case 'z':
          e.preventDefault();
          onToolChange('zoom');
          break;
        case 'w':
          e.preventDefault();
          onToolChange('windowing');
          break;
        case 'm':
          e.preventDefault();
          onToolChange('measure');
          break;
        case 'a':
          e.preventDefault();
          onToolChange('annotate');
          break;
        case 'r':
          e.preventDefault();
          onReset();
          break;
        case 's':
          e.preventDefault();
          onToggleSidebar();
          break;
        case 'arrowleft':
          e.preventDefault();
          onPrevImage();
          break;
        case 'arrowright':
          e.preventDefault();
          onNextImage();
          break;
        case '=':
        case '+':
          e.preventDefault();
          onZoom('in');
          break;
        case '-':
          e.preventDefault();
          onZoom('out');
          break;
        case '1':
          e.preventDefault();
          onPreset('soft-tissue');
          break;
        case '2':
          e.preventDefault();
          onPreset('bone');
          break;
        case '3':
          e.preventDefault();
          onPreset('lung');
          break;
        case '4':
          e.preventDefault();
          onPreset('brain');
          break;
        case '5':
          e.preventDefault();
          onPreset('liver');
          break;
        case '6':
          e.preventDefault();
          onPreset('abdomen');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onToolChange, onReset, onToggleSidebar, onNextImage, onPrevImage, onZoom, onPreset]);

  return null; // This component doesn't render anything
}
