"use client";

import React, { useState } from 'react';
import Image from 'next/image';

interface PolaroidFrameProps {
  imageUrl: string | null;
  caption: string;
  theme: string;
  onCaptionChange: (caption: string) => void;
}

const PolaroidFrame: React.FC<PolaroidFrameProps> = ({
  imageUrl,
  caption,
  theme,
  onCaptionChange,
}) => {
  // Theme colors based on ecosystem
  const themeColors = {
    base: 'bg-blue-100 border-blue-300',
    monad: 'bg-purple-100 border-purple-300',
    arbitrum: 'bg-blue-200 border-blue-400',
    coinbase: 'bg-blue-500 border-blue-700',
    default: 'bg-gray-100 border-gray-300',
  };

  const themeColor = themeColors[theme as keyof typeof themeColors] || themeColors.default;

  return (
    <div className={`polaroid-frame ${themeColor} border-8 p-2 rounded-sm shadow-xl max-w-xs mx-auto`}>
      <div className="polaroid-image-container relative w-full h-64 bg-black">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="Polaroid image"
            fill
            style={{ objectFit: 'contain' }}
            className="rounded-sm"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white">
            No image uploaded
          </div>
        )}
      </div>
      <div className="polaroid-caption mt-4 mb-2 px-2">
        <textarea
          value={caption}
          onChange={(e) => onCaptionChange(e.target.value)}
          placeholder="Write your caption here..."
          className="w-full p-2 text-center bg-transparent border-none focus:outline-none resize-none"
          rows={2}
        />
      </div>
    </div>
  );
};

export default PolaroidFrame;
