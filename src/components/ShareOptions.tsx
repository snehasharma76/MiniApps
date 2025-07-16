"use client";

import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import Image from 'next/image';
import { prepareImageForFarcaster, isInFarcasterFrame } from '../utils/farcaster';
import { createFallbackPolaroidImage } from '../utils/imageUtils';
import FarcasterFrame from './FarcasterFrame';

interface ShareOptionsProps {
  carouselRef: React.RefObject<HTMLDivElement | null>;
}

const ShareOptions: React.FC<ShareOptionsProps> = ({ carouselRef }) => {
  const [polaroidImage, setPolaroidImage] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState(false);
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
    setIsSharing(true);
    if (!carouselRef.current) return;
    
    try {
      // Create a simplified clone of the carousel for html2canvas to avoid CSS color function issues
      const clonedElement = carouselRef.current.cloneNode(true) as HTMLElement;
      clonedElement.style.position = 'absolute';
      clonedElement.style.left = '-9999px';
      clonedElement.style.top = '-9999px';
      document.body.appendChild(clonedElement);
      
      // Remove any problematic CSS that might cause issues with html2canvas
      const problematicElements = clonedElement.querySelectorAll('[style*="lab"], [style*="lch"]');
      problematicElements.forEach(el => {
        (el as HTMLElement).style.background = '#ffffff';
      });
      
      // Use simplified options for html2canvas
      const canvas = await html2canvas(clonedElement, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        ignoreElements: (element) => {
          // Ignore elements with complex CSS that might cause issues
          const computedStyle = window.getComputedStyle(element);
          return computedStyle.background?.includes('lab') || 
                 computedStyle.background?.includes('lch') ||
                 computedStyle.color?.includes('lab') ||
                 computedStyle.color?.includes('lch');
        }
      });
      
      // Clean up the cloned element
      document.body.removeChild(clonedElement);
      
      const image = canvas.toDataURL('image/png');
      setPolaroidImage(image);
      
      // Check if we're in a Farcaster frame context
      if (isInFarcasterFrame()) {
        // If we're in a Farcaster frame, we'll use the Frame protocol
        const processedImage = prepareImageForFarcaster(image);
        
        // Create frame action URL with the image
        const frameActionUrl = new URL(window.location.href);
        frameActionUrl.searchParams.set('img', processedImage);
        
        // In a real implementation, you would post this to the Farcaster API
        // For now, we'll just show a success message
        alert('Your Polaroid is ready to share on Farcaster!');
      } else {
        // If we're not in a Farcaster frame, we'll provide instructions
        // for sharing manually
        const shareUrl = `${window.location.origin}/share?img=${encodeURIComponent(image)}`;
        
        // Create a temporary input to copy the URL
        const tempInput = document.createElement('input');
        document.body.appendChild(tempInput);
        tempInput.value = shareUrl;
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        
        alert('Share URL copied to clipboard! You can paste this in Farcaster to share your Polaroid.');
      }
    } catch (error) {
      console.error('Error sharing to Farcaster:', error);
      
      // Use fallback image generation if html2canvas fails
      try {
        console.log('Attempting to use fallback image generation...');
        
        // Try to get caption text from the carousel
        let caption = 'Polaroid Memory';
        const captionElement = carouselRef.current?.querySelector('.polaroid-caption');
        if (captionElement && captionElement.textContent) {
          caption = captionElement.textContent;
        }
        
        // Get current theme
        let theme = 'vintage';
        const themeAttribute = carouselRef.current?.getAttribute('data-theme');
        if (themeAttribute) {
          theme = themeAttribute;
        }
        
        // Generate fallback image
        const fallbackImage = await createFallbackPolaroidImage(caption, theme);
        setPolaroidImage(fallbackImage);
        
        // Continue with sharing using the fallback image
        if (isInFarcasterFrame()) {
          const processedImage = prepareImageForFarcaster(fallbackImage);
          const frameActionUrl = new URL(window.location.href);
          frameActionUrl.searchParams.set('img', processedImage);
          alert('Your Polaroid is ready to share on Farcaster!');
        } else {
          const shareUrl = `${window.location.origin}/share?img=${encodeURIComponent(fallbackImage)}`;
          const tempInput = document.createElement('input');
          document.body.appendChild(tempInput);
          tempInput.value = shareUrl;
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
          alert('Share URL copied to clipboard! You can paste this in Farcaster to share your Polaroid.');
        }
      } catch (fallbackError) {
        console.error('Fallback image generation failed:', fallbackError);
        alert('Unable to generate image for sharing. Please try again later.');
      }
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <>
      <div className="share-options flex flex-wrap gap-3 mt-4">
        <button
          onClick={handleDownloadImage}
          className="flex items-center gap-2 font-retro-bold text-lg py-2 px-4 rounded-lg btn-retro relative overflow-hidden group"
          disabled={isSharing}
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
          disabled={isSharing}
        >
          <span className="relative z-10 flex items-center gap-2">
            {isSharing ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <div className="relative w-4 h-4">
                <Image src="/sparkle.svg" width={16} height={16} alt="" className="animate-twinkle" priority />
              </div>
            )}
            {isSharing ? 'Processing...' : 'Share to Farcaster'}
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-700 opacity-0 group-hover:opacity-100 transition-opacity"></span>
        </button>
      </div>
      
      {/* Farcaster Frame integration */}
      {polaroidImage && (
        <FarcasterFrame 
          imageUrl={polaroidImage} 
          onShare={handleShareToFarcaster} 
        />
      )}
    </>
  );
};

export default ShareOptions;
