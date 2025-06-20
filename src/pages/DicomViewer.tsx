
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ResponsiveDicomViewer } from '@/components/dicom/ResponsiveDicomViewer';
import { Seo } from '@/components/Seo';

const DicomViewer = () => {
  const { caseId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  
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
    }, 1000); // Reduced loading time for better mobile experience

    return () => clearTimeout(timer);
  }, [caseId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-pulse mb-4">
            <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
          <p className="text-base">Loading images...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Seo 
        title={`DICOM Viewer - Case ${caseId}`}
        description="Mobile-optimized DICOM image viewer for radiology cases"
      />
      
      <ResponsiveDicomViewer dicomData={dicomData} />
    </>
  );
};

export default DicomViewer;
