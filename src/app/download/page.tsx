"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function DownloadPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  
  useEffect(() => {
    // Get image from URL parameters
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const imgParam = urlParams.get('img');
      if (imgParam) {
        try {
          // If it's base64 encoded, decode it
          if (imgParam.startsWith('data:image')) {
            setImageUrl(imgParam);
          } else {
            // Try to decode if it's a base64 string without the data URL prefix
            setImageUrl(`data:image/png;base64,${imgParam}`);
          }
          
          // Automatically trigger download
          if (imgParam) {
            const link = document.createElement('a');
            link.href = imgParam.startsWith('data:image') ? imgParam : `data:image/png;base64,${imgParam}`;
            link.download = 'polaroid-memory.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        } catch (error) {
          console.error('Error decoding image:', error);
        }
      }
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-amber-50">
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 border-2 border-amber-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16">
          <Image src="/sparkle.svg" alt="" width={64} height={64} className="animate-twinkle" priority />
        </div>
        
        <h1 className="font-retro-bold text-2xl mb-4 text-center text-amber-800 rotate-[-2deg]">
          Download Your Memory
        </h1>
        
        {imageUrl ? (
          <div className="polaroid-frame mb-6 mx-auto">
            <div className="relative w-full max-w-xs mx-auto">
              <Image 
                src={imageUrl} 
                alt="Your Polaroid" 
                width={300} 
                height={350} 
                className="rounded shadow-lg"
              />
            </div>
            <p className="text-center mt-4 font-retro-bold text-amber-800">
              Your download should start automatically
            </p>
          </div>
        ) : (
          <div className="bg-gray-100 h-64 flex items-center justify-center rounded mb-6">
            <p className="text-gray-500 font-retro-bold">Image not available</p>
          </div>
        )}
        
        <div className="flex flex-col gap-4 mt-6">
          <Link href="/" className="btn-retro py-2 px-4 rounded text-center font-retro-bold">
            <span className="relative z-10">Back to Polaroid Carousel</span>
          </Link>
          
          {imageUrl && (
            <a 
              href={imageUrl} 
              download="polaroid-memory.png"
              className="btn-retro py-2 px-4 rounded text-center font-retro-bold"
            >
              <span className="relative z-10">Download Again</span>
            </a>
          )}
        </div>
      </div>
    </main>
  );
}
