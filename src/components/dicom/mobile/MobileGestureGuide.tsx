
import React, { useState, useEffect } from 'react';

export function MobileGestureGuide() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show help on first visit (could be enhanced with localStorage)
    const timer = setTimeout(() => {
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 4000);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
      <div className="bg-gray-900 rounded-lg p-6 max-w-sm mx-auto text-white text-center">
        <h3 className="text-lg font-semibold mb-4">Touch Gestures</h3>
        <div className="space-y-3 text-sm">
          <div>👆 <strong>Swipe up/down:</strong> Navigate images</div>
          <div>🤏 <strong>Pinch:</strong> Zoom in/out</div>
          <div>✌️ <strong>Two fingers:</strong> Adjust windowing</div>
          <div>👆👆 <strong>Double tap:</strong> Reset view</div>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="mt-4 px-4 py-2 bg-blue-600 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
