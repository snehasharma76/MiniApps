"use client";

import { useState, useRef } from 'react';
import Image from 'next/image';
import PolaroidFrame from './PolaroidFrame';
import ImageUploader from './ImageUploader';
import ThemeSelector from './ThemeSelector';
import ShareOptions from './ShareOptions';

interface Photo {
  url: string;
  caption: string;
}

export default function Carousel() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [theme, setTheme] = useState('vintage'); // Default theme
  const [isUploading, setIsUploading] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (imageUrl: string) => {
    setIsUploading(false);
    if (photos.length < 2) {
      setPhotos([...photos, { url: imageUrl, caption: '' }]);
    } else {
      alert('You can only upload up to 2 photos!');
    }
  };

  const handleCaptionChange = (caption: string) => {
    const updatedPhotos = [...photos];
    updatedPhotos[currentIndex].caption = caption;
    setPhotos(updatedPhotos);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < photos.length - 1 ? prevIndex + 1 : prevIndex));
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  const startUpload = () => {
    setIsUploading(true);
  };

  // Random rotation for polaroid stack effect
  const getRandomRotation = () => {
    return Math.floor(Math.random() * 10) - 5;
  };

  return (
    <div className="carousel-container">
      <div className="theme-selector-container mb-6 bg-white/70 p-5 rounded-lg shadow-md border-2 border-amber-200" style={{ backgroundImage: 'url("/sparkle.svg")', backgroundRepeat: 'no-repeat', backgroundPosition: 'top right', backgroundSize: '40px' }}>
        <div className="mb-3">
          <h3 className="font-retro-bold text-xl inline-block transform -rotate-1">Choose your vibe:</h3>
        </div>
        <ThemeSelector onThemeChange={handleThemeChange} currentTheme={theme} />
      </div>
      
      <div className="carousel-content relative" ref={carouselRef}>
        {photos.length > 0 ? (
          <>
            <div className="polaroid-stack relative">
              {/* Show stack effect for multiple photos */}
              {photos.length > 1 && currentIndex === 0 && (
                <div 
                  className="absolute top-2 left-2 w-full h-full opacity-70"
                  style={{ transform: `rotate(${getRandomRotation()}deg)` }}
                >
                  <div className="w-12 h-12 bg-white absolute top-0 right-0"></div>
                </div>
              )}
              
              {/* Show stack effect for multiple photos */}
              {photos.length > 1 && currentIndex === 1 && (
                <div 
                  className="absolute top-2 left-2 w-full h-full opacity-70"
                  style={{ transform: `rotate(${getRandomRotation()}deg)` }}
                >
                  <div className="w-12 h-12 bg-white absolute top-0 right-0"></div>
                </div>
              )}
              
              <PolaroidFrame 
                imageUrl={photos[currentIndex].url}
                caption={photos[currentIndex].caption}
                onCaptionChange={handleCaptionChange}
                theme={theme}
              />
            </div>
            
            <div className="navigation-controls flex justify-between mt-6">
              <button 
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="px-4 py-2 text-white rounded-md disabled:opacity-50 font-retro-bold text-lg btn-retro relative overflow-hidden group"
              >
                <span className="relative z-10 block text-white font-bold" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>← Previous</span>
                <span className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-700 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </button>
              <div className="flex-1 text-center flex items-center justify-center">
                <span className="retro-text-bg px-3 py-1">
                  <span className="font-retro-bold text-lg">{currentIndex + 1} / {photos.length}</span>
                </span>
              </div>
              <button 
                onClick={handleNext}
                disabled={currentIndex === photos.length - 1}
                className="px-4 py-2 text-white rounded-md disabled:opacity-50 font-retro-bold text-lg btn-retro relative overflow-hidden group"
              >
                <span className="relative z-10 block text-white font-bold" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>Next →</span>
                <span className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-700 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </button>
            </div>
            
            <div className="share-options-container mt-8 bg-white/70 p-5 rounded-lg shadow-md border-2 border-amber-200" style={{ backgroundImage: 'url("/sparkle.svg")', backgroundRepeat: 'no-repeat', backgroundPosition: 'bottom right', backgroundSize: '40px' }}>
              <div className="mb-3">
                <h3 className="font-retro-bold text-xl inline-block transform -rotate-1">Share your memories:</h3>
              </div>
              <ShareOptions carouselRef={carouselRef} />
            </div>
          </>
        ) : (
          <div className="upload-prompt text-center p-8 border-2 border-dashed border-amber-700/50 rounded-lg bg-white/70 shadow-md" style={{ backgroundImage: 'url("/sparkle.svg")', backgroundRepeat: 'no-repeat', backgroundPosition: 'top right', backgroundSize: '40px' }}>
            {isUploading ? (
              <div className="loading-state">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="w-16 h-16 mb-4 relative">
                    <Image src="/sparkle.svg" alt="Loading" width={64} height={64} className="animate-twinkle" priority />
                  </div>
                  <div className="retro-text-bg">
                    <p className="font-retro-bold text-xl mb-0">Processing your memory...</p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <h3 className="font-retro-bold text-2xl inline-block transform -rotate-1">Capture your blockchain journey</h3>
                </div>
                <p className="mb-6 text-vintage-brown/80 font-caveat text-xl">Upload up to 2 photos to create your Polaroid memories</p>
                <ImageUploader onImageUpload={handleImageUpload} onUploadStart={startUpload} />
              </>
            )}
          </div>
        )}
        
        {photos.length > 0 && photos.length < 2 && !isUploading && (
          <div className="add-more-photos mt-8 text-center bg-white/70 p-5 rounded-lg shadow-md border-2 border-amber-200" style={{ backgroundImage: 'url("/sparkle.svg")', backgroundRepeat: 'no-repeat', backgroundPosition: 'bottom left', backgroundSize: '40px' }}>
            <div className="mb-3">
              <h3 className="font-retro-bold text-xl inline-block transform -rotate-1">Add another memory?</h3>
            </div>
            <ImageUploader onImageUpload={handleImageUpload} onUploadStart={startUpload} />
          </div>
        )}
      </div>
    </div>
  );
};
