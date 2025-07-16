"use client";

import React from 'react';
import html2canvas from 'html2canvas';

interface ShareOptionsProps {
  carouselRef: React.RefObject<HTMLDivElement>;
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
    <div className="share-options flex gap-3 mt-6">
      <button
        onClick={handleDownloadImage}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow transition-colors"
      >
        Download Image
      </button>
      <button
        onClick={handleShareToFarcaster}
        className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg shadow transition-colors"
      >
        Share to Farcaster
      </button>
    </div>
  );
};

export default ShareOptions;
