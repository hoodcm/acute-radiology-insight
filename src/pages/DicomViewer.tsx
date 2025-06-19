
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ViewerCanvas } from '@/components/dicom/ViewerCanvas';
import { ViewerToolbar } from '@/components/dicom/ViewerToolbar';
import { ViewerControls } from '@/components/dicom/ViewerControls';
import { ViewerSidebar } from '@/components/dicom/ViewerSidebar';
import { ImageNavigator } from '@/components/dicom/ImageNavigator';
import { KeyboardShortcuts } from '@/components/dicom/KeyboardShortcuts';
import { Seo } from '@/components/Seo';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const DicomViewer = () => {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(400);
  const [windowCenter, setWindowCenter] = useState(40);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [activeTool, setActiveTool] = useState<'pan' | 'zoom' | 'windowing' | 'measure' | 'annotate'>('pan');
  const [showSidebar, setShowSidebar] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Mock DICOM data - replace with real data fetching
  const dicomData = {
    patientName: 'John Doe',
    studyDate: '2024-01-15',
    modality: 'CT',
    bodyPart: 'Head',
    images: [
      { id: 1, url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=512&h=512&fit=crop', name: 'Axial 001' },
      { id: 2, url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=512&h=512&fit=crop', name: 'Axial 002' },
      { id: 3, url: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=512&h=512&fit=crop', name: 'Axial 003' },
    ]
  };

  useEffect(() => {
    // Simulate loading DICOM data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [caseId]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleToolChange = (tool: typeof activeTool) => {
    setActiveTool(tool);
  };

  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setWindowWidth(400);
    setWindowCenter(40);
    setBrightness(0);
    setContrast(0);
  };

  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleNextImage = () => {
    const nextIndex = currentImageIndex < dicomData.images.length - 1 ? currentImageIndex + 1 : 0;
    setCurrentImageIndex(nextIndex);
  };

  const handlePrevImage = () => {
    const prevIndex = currentImageIndex > 0 ? currentImageIndex - 1 : dicomData.images.length - 1;
    setCurrentImageIndex(prevIndex);
  };

  const handleZoomKeyboard = (direction: 'in' | 'out') => {
    const zoomFactor = direction === 'in' ? 1.2 : 0.8;
    const newZoom = Math.max(0.1, Math.min(10, zoom * zoomFactor));
    setZoom(newZoom);
  };

  const handlePresetKeyboard = (preset: string) => {
    const presets = {
      'soft-tissue': { width: 400, center: 40 },
      'bone': { width: 1500, center: 300 },
      'lung': { width: 1500, center: -600 },
      'brain': { width: 80, center: 40 },
      'liver': { width: 150, center: 30 },
      'abdomen': { width: 350, center: 50 },
      'mediastinum': { width: 350, center: 50 },
      'spine': { width: 250, center: 50 },
      'pelvis': { width: 400, center: 40 },
    };
    
    const presetValues = presets[preset as keyof typeof presets];
    if (presetValues) {
      setWindowWidth(presetValues.width);
      setWindowCenter(presetValues.center);
    }
  };

  const handlePresetApply = (width: number, center: number) => {
    setWindowWidth(width);
    setWindowCenter(center);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-pulse mb-4">
            <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
          <p className="text-lg">Loading DICOM images...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Seo 
        title={`DICOM Viewer - Case ${caseId}`}
        description="Professional DICOM image viewer for radiology cases with advanced windowing, measurements, and annotations"
      />
      
      {/* Keyboard shortcuts handler */}
      <KeyboardShortcuts
        onToolChange={handleToolChange}
        onReset={handleReset}
        onToggleSidebar={() => setShowSidebar(!showSidebar)}
        onNextImage={handleNextImage}
        onPrevImage={handlePrevImage}
        onZoom={handleZoomKeyboard}
        onPreset={handlePresetKeyboard}
      />
      
      <div className="min-h-screen bg-black text-white flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleGoBack}
              className="text-white hover:text-accent"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-xl font-semibold">{dicomData.patientName}</h1>
              <p className="text-sm text-gray-400">
                {dicomData.modality} • {dicomData.bodyPart} • {dicomData.studyDate}
              </p>
            </div>
          </div>
          
          <ViewerToolbar
            activeTool={activeTool}
            onToolChange={handleToolChange}
            onReset={handleReset}
            onToggleSidebar={() => setShowSidebar(!showSidebar)}
            showSidebar={showSidebar}
          />
        </header>

        {/* Main viewer area */}
        <div className="flex-1 flex">
          {/* Canvas area */}
          <div className="flex-1 relative">
            <ViewerCanvas
              imageUrl={dicomData.images[currentImageIndex].url}
              zoom={zoom}
              pan={pan}
              windowWidth={windowWidth}
              windowCenter={windowCenter}
              brightness={brightness}
              contrast={contrast}
              activeTool={activeTool}
              onZoomChange={setZoom}
              onPanChange={setPan}
              onWindowingChange={(width, center) => {
                setWindowWidth(width);
                setWindowCenter(center);
              }}
            />
            
            {/* Controls overlay */}
            <ViewerControls
              zoom={zoom}
              windowWidth={windowWidth}
              windowCenter={windowCenter}
              brightness={brightness}
              contrast={contrast}
              onZoomChange={setZoom}
              onWindowWidthChange={setWindowWidth}
              onWindowCenterChange={setWindowCenter}
              onBrightnessChange={setBrightness}
              onContrastChange={setContrast}
            />

            {/* Image navigation */}
            <ImageNavigator
              currentImageIndex={currentImageIndex}
              totalImages={dicomData.images.length}
              onImageChange={handleImageChange}
              images={dicomData.images}
            />
          </div>

          {/* Sidebar */}
          {showSidebar && (
            <ViewerSidebar
              patientData={dicomData}
              currentImageIndex={currentImageIndex}
              onClose={() => setShowSidebar(false)}
              onImageSelect={handleImageChange}
              onPresetApply={handlePresetApply}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default DicomViewer;
