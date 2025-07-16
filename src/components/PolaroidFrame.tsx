"use client";

import React from 'react';
import Image from 'next/image';

interface PolaroidFrameProps {
  imageUrl: string | null;
  caption: string;
  onCaptionChange: (caption: string) => void;
  theme: string;
}

const themeColors = {
  sepia: 'bg-amber-50 shadow-amber-200',
  monochrome: 'bg-gray-100 shadow-gray-300',
  vintage: 'bg-vintage-cream shadow-amber-100',
  classic: 'bg-blue-50 shadow-blue-200',
  default: 'bg-vintage-cream shadow-amber-100'
};

const themeBorders = {
  sepia: 'bg-amber-700',
  monochrome: 'bg-gray-900',
  vintage: 'bg-vintage-amber',
  classic: 'bg-blue-600',
  default: 'bg-vintage-amber'
};

const themeFilters = {
  sepia: 'sepia(0.8)',
  monochrome: 'grayscale(1)',
  vintage: 'contrast(1.1) brightness(1.1) sepia(0.3)',
  classic: 'saturate(1.2)',
  default: 'contrast(1.1) brightness(1.1) sepia(0.3)'
};

const themeCaptionStyles = {
  sepia: 'font-caveat text-amber-900',
  monochrome: 'font-mono text-gray-800',
  vintage: 'font-caveat text-vintage-brown',
  classic: 'font-caveat text-blue-800',
  default: 'font-caveat text-vintage-brown'
};

const PolaroidFrame: React.FC<PolaroidFrameProps> = ({
  imageUrl,
  caption,
  onCaptionChange,
  theme
}) => {
  const themeColor = themeColors[theme as keyof typeof themeColors] || themeColors.default;
  const themeBorder = themeBorders[theme as keyof typeof themeBorders] || themeBorders.default;
  const themeFilter = themeFilters[theme as keyof typeof themeFilters] || themeFilters.default;
  const captionStyle = themeCaptionStyles[theme as keyof typeof themeCaptionStyles] || themeCaptionStyles.default;
  
  // Random rotation between -5 and 5 degrees
  const randomRotation = Math.floor(Math.random() * 10) - 5;

  return (
    <div 
      className={`polaroid-frame ${themeColor} p-5 rounded-sm shadow-xl max-w-xs mx-auto relative transition-all duration-300 ease-out`}
      style={{
        boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
        border: '12px solid white',
        transform: `rotate(${randomRotation}deg)`,
      }}
    >
      {/* Colored strip at the bottom of the Polaroid */}
      <div 
        className={`absolute bottom-0 left-0 right-0 h-1 ${themeBorder}`} 
        style={{ marginBottom: '-12px' }}
      />
      
      <div className="polaroid-image-container relative w-full h-64 bg-black overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="Polaroid image"
            fill
            style={{ objectFit: 'cover', filter: themeFilter }}
            className="rounded-sm"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white">
            <span className="text-center opacity-70 font-caveat text-xl">Upload a memory</span>
          </div>
        )}
      </div>
      
      <div className="polaroid-caption mt-6 mb-2 px-2">
        <textarea
          value={caption}
          onChange={(e) => onCaptionChange(e.target.value)}
          placeholder="Write your caption here..."
          className={`w-full p-2 text-center bg-transparent border-none focus:outline-none resize-none ${captionStyle}`}
          style={{
            fontSize: '1.2rem',
            lineHeight: '1.2',
          }}
          rows={2}
        />
      </div>
      
      {/* Date stamp in the corner */}
      <div className="absolute bottom-2 right-2 text-xs text-vintage-brown opacity-70 font-mono">
        {new Date().toLocaleDateString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' })}
      </div>
    </div>
  );
};

export default PolaroidFrame;
