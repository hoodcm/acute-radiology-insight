
import React from 'react';
import { Button } from '@/components/ui/button';

interface ViewerToolbarProps {
  activeTool: 'pan' | 'zoom' | 'windowing' | 'measure';
  onToolChange: (tool: 'pan' | 'zoom' | 'windowing' | 'measure') => void;
  onReset: () => void;
  onToggleSidebar: () => void;
  showSidebar: boolean;
}

export function ViewerToolbar({
  activeTool,
  onToolChange,
  onReset,
  onToggleSidebar,
  showSidebar,
}: ViewerToolbarProps) {
  const tools = [
    { id: 'pan' as const, label: 'Pan', icon: '✋', hotkey: 'P' },
    { id: 'zoom' as const, label: 'Zoom', icon: '🔍', hotkey: 'Z' },
    { id: 'windowing' as const, label: 'Window', icon: '🎛️', hotkey: 'W' },
    { id: 'measure' as const, label: 'Measure', icon: '📏', hotkey: 'M' },
  ];

  return (
    <div className="flex items-center gap-2">
      {/* Tool buttons */}
      <div className="flex gap-1 bg-gray-800 rounded-lg p-1">
        {tools.map((tool) => (
          <Button
            key={tool.id}
            variant={activeTool === tool.id ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onToolChange(tool.id)}
            className={`text-xs px-3 relative ${
              activeTool === tool.id 
                ? 'bg-accent text-black' 
                : 'text-gray-300 hover:text-white hover:bg-gray-700'
            }`}
            title={`${tool.label} (${tool.hotkey})`}
          >
            <span className="mr-1">{tool.icon}</span>
            {tool.label}
            <span className="absolute -top-1 -right-1 text-[8px] text-gray-400">
              {tool.hotkey}
            </span>
          </Button>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 ml-4">
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          className="text-white border-gray-600 hover:bg-gray-700"
          title="Reset (R)"
        >
          Reset
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleSidebar}
          className="text-white border-gray-600 hover:bg-gray-700"
          title="Toggle Sidebar (S)"
        >
          {showSidebar ? 'Hide Info' : 'Show Info'}
        </Button>
      </div>
    </div>
  );
}
