import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { X, Plus } from 'lucide-react';

interface Point {
  x: number;
  y: number;
}

interface Annotation {
  id: string;
  position: Point;
  text: string;
  timestamp: string;
}

interface AnnotationToolProps {
  isActive: boolean;
  annotations: Annotation[];
  onAnnotationsChange: (annotations: Annotation[]) => void;
}

export function AnnotationTool({ isActive, annotations, onAnnotationsChange }: AnnotationToolProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [newAnnotation, setNewAnnotation] = useState<{ position: Point; text: string } | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (!isActive || isCreating) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const position = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    
    setNewAnnotation({ position, text: '' });
    setIsCreating(true);
  };

  const handleSaveAnnotation = () => {
    if (!newAnnotation || !newAnnotation.text.trim()) return;
    
    const annotation: Annotation = {
      id: Date.now().toString(),
      position: newAnnotation.position,
      text: newAnnotation.text,
      timestamp: new Date().toLocaleString(),
    };
    
    onAnnotationsChange([...annotations, annotation]);
    setNewAnnotation(null);
    setIsCreating(false);
  };

  const handleCancelAnnotation = () => {
    setNewAnnotation(null);
    setIsCreating(false);
  };

  const handleDeleteAnnotation = (id: string) => {
    onAnnotationsChange(annotations.filter(ann => ann.id !== id));
  };

  const handleEditAnnotation = (id: string, newText: string) => {
    onAnnotationsChange(
      annotations.map(ann => 
        ann.id === id ? { ...ann, text: newText, timestamp: new Date().toLocaleString() } : ann
      )
    );
    setEditingId(null);
  };

  if (!isActive) return null;

  return (
    <>
      {/* Click overlay */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{ 
          cursor: isActive ? 'crosshair' : 'default',
          zIndex: 5,
        }}
        onClick={handleCanvasClick}
      />
      
      {/* Existing annotations */}
      {annotations.map((annotation) => (
        <div
          key={annotation.id}
          className="absolute"
          style={{
            left: annotation.position.x,
            top: annotation.position.y,
            zIndex: 10,
          }}
        >
          {/* Annotation marker */}
          <div className="relative">
            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg cursor-pointer"></div>
            
            {/* Annotation popup */}
            <div className="absolute top-6 left-0 bg-black/90 text-white p-3 rounded-lg shadow-xl min-w-48 max-w-64">
              {editingId === annotation.id ? (
                <div className="space-y-2">
                  <Textarea
                    defaultValue={annotation.text}
                    className="text-sm bg-gray-800 border-gray-600"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleEditAnnotation(annotation.id, e.currentTarget.value);
                      }
                      if (e.key === 'Escape') {
                        setEditingId(null);
                      }
                    }}
                    autoFocus
                  />
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      onClick={() => handleEditAnnotation(annotation.id, (document.querySelector('textarea') as HTMLTextAreaElement)?.value || '')}
                      className="text-xs px-2 py-1"
                    >
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingId(null)}
                      className="text-xs px-2 py-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm mb-2">{annotation.text}</p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{annotation.timestamp}</span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => setEditingId(annotation.id)}
                        className="hover:text-white"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteAnnotation(annotation.id)}
                        className="hover:text-red-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      
      {/* New annotation creation */}
      {newAnnotation && (
        <div
          className="absolute"
          style={{
            left: newAnnotation.position.x,
            top: newAnnotation.position.y,
            zIndex: 15,
          }}
        >
          <div className="relative">
            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>
            <div className="absolute top-6 left-0 bg-black/90 text-white p-3 rounded-lg shadow-xl min-w-48">
              <Textarea
                placeholder="Add your annotation..."
                value={newAnnotation.text}
                onChange={(e) => setNewAnnotation({ ...newAnnotation, text: e.target.value })}
                className="text-sm bg-gray-800 border-gray-600 mb-2"
                rows={3}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSaveAnnotation();
                  }
                  if (e.key === 'Escape') {
                    handleCancelAnnotation();
                  }
                }}
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleSaveAnnotation}
                  disabled={!newAnnotation.text.trim()}
                  className="text-xs px-3 py-1"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Add
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancelAnnotation}
                  className="text-xs px-3 py-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Instructions */}
      {annotations.length === 0 && !isCreating && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-lg text-sm">
          Click anywhere on the image to add an annotation
        </div>
      )}
    </>
  );
}
