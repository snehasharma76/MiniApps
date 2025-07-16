"use client";

import React, { useState, useRef } from 'react';
import PolaroidFrame from './PolaroidFrame';
import ImageUploader from './ImageUploader';
import ThemeSelector from './ThemeSelector';
import ShareOptions from './ShareOptions';

const Carousel: React.FC = () => {
  const [images, setImages] = useState<(string | null)[]>([null, null]);
  const [captions, setCaptions] = useState<string[]>(['', '']);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [theme, setTheme] = useState<string>('base');
  
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (file: File, index: number) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const newImages = [...images];
      newImages[index] = e.target?.result as string;
      setImages(newImages);
    };
    reader.readAsDataURL(file);
  };

  const handleCaptionChange = (caption: string, index: number) => {
    const newCaptions = [...captions];
    newCaptions[index] = caption;
    setCaptions(newCaptions);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="carousel-container max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Polaroid Carousel</h2>
      
      <ThemeSelector selectedTheme={theme} onThemeChange={setTheme} />
      
      <div className="upload-section flex justify-center gap-4 mb-6">
        {images.map((_, index) => (
          <ImageUploader 
            key={index} 
            onImageUpload={(file) => handleImageUpload(file, index)} 
            index={index} 
          />
        ))}
      </div>
      
      <div className="carousel-wrapper relative" ref={carouselRef}>
        <PolaroidFrame
          imageUrl={images[currentIndex]}
          caption={captions[currentIndex]}
          theme={theme}
          onCaptionChange={(caption) => handleCaptionChange(caption, currentIndex)}
        />
        
        {images.length > 1 && (
          <div className="navigation-buttons flex justify-between mt-4">
            <button 
              onClick={handlePrevious}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              Previous
            </button>
            <button 
              onClick={handleNext}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              Next
            </button>
          </div>
        )}
      </div>
      
      <ShareOptions carouselRef={carouselRef as React.RefObject<HTMLDivElement>} />
    </div>
  );
};

export default Carousel;
