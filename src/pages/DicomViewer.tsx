
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DicomHeader } from '@/components/dicom/DicomHeader';
import { DicomMainViewer } from '@/components/dicom/DicomMainViewer';
import { KeyboardShortcuts } from '@/components/dicom/KeyboardShortcuts';
import { useDicomViewerState } from '@/hooks/useDicomViewerState';
import { Seo } from '@/components/Seo';

const DicomViewer = () => {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  const {
    windowWidth,
    windowCenter,
    zoom,
    pan,
    brightness,
    contrast,
    activeTool,
    showSidebar,
    currentImageIndex,
    setWindowWidth,
    setWindowCenter,
    setZoom,
    setPan,
    setBrightness,
    setContrast,
    setShowSidebar,
    handleToolChange,
    handleReset,
    handleImageChange,
    handleNextImage,
    handlePrevImage,
    handleZoomKeyboard,
    handlePresetKeyboard,
    handlePresetApply,
  } = useDicomViewerState();

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
        onNextImage={() => handleNextImage(dicomData.images.length)}
        onPrevImage={() => handlePrevImage(dicomData.images.length)}
        onZoom={handleZoomKeyboard}
        onPreset={handlePresetKeyboard}
      />
      
      <div className="min-h-screen bg-black text-white flex flex-col">
        {/* Header */}
        <DicomHeader
          patientData={dicomData}
          activeTool={activeTool}
          showSidebar={showSidebar}
          onGoBack={handleGoBack}
          onToolChange={handleToolChange}
          onReset={handleReset}
          onToggleSidebar={() => setShowSidebar(!showSidebar)}
        />

        {/* Main viewer area */}
        <DicomMainViewer
          dicomData={dicomData}
          currentImageIndex={currentImageIndex}
          zoom={zoom}
          pan={pan}
          windowWidth={windowWidth}
          windowCenter={windowCenter}
          brightness={brightness}
          contrast={contrast}
          activeTool={activeTool}
          showSidebar={showSidebar}
          onZoomChange={setZoom}
          onPanChange={setPan}
          onWindowingChange={(width, center) => {
            setWindowWidth(width);
            setWindowCenter(center);
          }}
          onWindowWidthChange={setWindowWidth}
          onWindowCenterChange={setWindowCenter}
          onBrightnessChange={setBrightness}
          onContrastChange={setContrast}
          onImageChange={handleImageChange}
          onSidebarClose={() => setShowSidebar(false)}
          onPresetApply={handlePresetApply}
        />
      </div>
    </>
  );
};

export default DicomViewer;
