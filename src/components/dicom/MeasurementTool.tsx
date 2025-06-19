
import React, { useState, useRef } from 'react';

interface Point {
  x: number;
  y: number;
}

interface Measurement {
  id: string;
  start: Point;
  end: Point;
  distance: number;
}

interface MeasurementToolProps {
  isActive: boolean;
  zoom: number;
  onMeasurementsChange: (measurements: Measurement[]) => void;
}

export function MeasurementTool({ isActive, zoom, onMeasurementsChange }: MeasurementToolProps) {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentStart, setCurrentStart] = useState<Point | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isActive) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const point = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    
    setIsDrawing(true);
    setCurrentStart(point);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isActive || !isDrawing || !currentStart) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const end = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    
    const distance = Math.sqrt(
      Math.pow(end.x - currentStart.x, 2) + Math.pow(end.y - currentStart.y, 2)
    ) / zoom; // Adjust for zoom level
    
    const newMeasurement: Measurement = {
      id: Date.now().toString(),
      start: currentStart,
      end,
      distance,
    };
    
    const updatedMeasurements = [...measurements, newMeasurement];
    setMeasurements(updatedMeasurements);
    onMeasurementsChange(updatedMeasurements);
    
    setIsDrawing(false);
    setCurrentStart(null);
  };

  const clearMeasurements = () => {
    setMeasurements([]);
    onMeasurementsChange([]);
  };

  if (!isActive) return null;

  return (
    <>
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 10 }}
      >
        {measurements.map((measurement) => (
          <g key={measurement.id}>
            <line
              x1={measurement.start.x}
              y1={measurement.start.y}
              x2={measurement.end.x}
              y2={measurement.end.y}
              stroke="#f97316"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
            <circle
              cx={measurement.start.x}
              cy={measurement.start.y}
              r="4"
              fill="#f97316"
            />
            <circle
              cx={measurement.end.x}
              cy={measurement.end.y}
              r="4"
              fill="#f97316"
            />
            <text
              x={(measurement.start.x + measurement.end.x) / 2}
              y={(measurement.start.y + measurement.end.y) / 2 - 10}
              fill="#f97316"
              fontSize="12"
              textAnchor="middle"
              className="bg-black/50 px-1 rounded"
            >
              {measurement.distance.toFixed(1)}px
            </text>
          </g>
        ))}
      </svg>
      
      {measurements.length > 0 && (
        <div className="absolute top-4 right-4 bg-black/80 rounded-lg p-2">
          <button
            onClick={clearMeasurements}
            className="text-white text-xs hover:text-orange-500"
          >
            Clear Measurements
          </button>
        </div>
      )}
      
      <div
        className="absolute inset-0 w-full h-full"
        style={{ 
          cursor: isActive ? 'crosshair' : 'default',
          zIndex: isActive ? 5 : -1,
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      />
    </>
  );
}
