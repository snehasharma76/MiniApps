"use client";

import React from 'react';
import html2canvas from 'html2canvas';
import Image from 'next/image';

interface ShareOptionsProps {
  carouselRef: React.RefObject<HTMLDivElement | null>;
}

const ShareOptions: React.FC<ShareOptionsProps> = ({ carouselRef }) => {
  const handleDownloadImage = async () => {
    if (!carouselRef.current) return;
    
    try {
      const canvas = await html2canvas(carouselRef.current, {
        scale: 2, // Higher quality
        backgroundColor: null,
        logging: false,
      });
      
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'polaroid-carousel.png';
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Failed to generate image. Please try again.');
    }
  };

  const handleShareToFarcaster = async () => {
    if (!carouselRef.current) return;
    
    try {
      const canvas = await html2canvas(carouselRef.current, {
        scale: 2,
        backgroundColor: null,
        logging: false,
      });
      
      const image = canvas.toDataURL('image/png');
      
      // For MVP, we'll just simulate Farcaster sharing
      // In a real implementation, you would use the Farcaster API
      alert('Farcaster integration will be implemented in the next version. For now, you can download the image and share it manually.');
      
      // Future implementation would look something like:
      // await farcasterClient.publishCast({
      //   text: 'Check out my Polaroid creation!',
      //   embeds: [{ image }],
      // });
    } catch (error) {
      console.error('Error sharing to Farcaster:', error);
      alert('Failed to share to Farcaster. Please try again.');
    }
  };

  return (
    <div className="share-options flex flex-wrap gap-3 mt-4">
      <button
        onClick={handleDownloadImage}
        className="flex items-center gap-2 font-retro-bold text-lg py-2 px-4 rounded-lg btn-retro relative overflow-hidden group"
      >
        <span className="relative z-10 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="animate-bounce">
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
          </svg>
          Download Memory
        </span>
        <span className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-700 opacity-0 group-hover:opacity-100 transition-opacity"></span>
      </button>
      <button
        onClick={handleShareToFarcaster}
        className="flex items-center gap-2 font-retro-bold text-lg py-2 px-4 rounded-lg btn-retro relative overflow-hidden group"
      >
        <span className="relative z-10 flex items-center gap-2">
          <div className="relative w-4 h-4">
            <Image src="/sparkle.svg" width={16} height={16} alt="" className="animate-twinkle" priority />
          </div>
          Share to Farcaster
        </span>
        <span className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-700 opacity-0 group-hover:opacity-100 transition-opacity"></span>
      </button>
    </div>
  );
};

export default ShareOptions;
