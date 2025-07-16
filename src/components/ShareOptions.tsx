"use client";

import React, { useState } from 'react';

interface ShareOptionsProps {
  carouselRef: React.RefObject<HTMLDivElement | null>;
}

const ShareOptions: React.FC<ShareOptionsProps> = ({ carouselRef }) => {
  const [polaroidImage, setPolaroidImage] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState(false);

  // Handle downloading the polaroid image
  const handleDownloadImage = async () => {
    if (!carouselRef.current) return;
    setIsSharing(true);
    
    try {
      // Generate the polaroid image using our shared function
      const imageUrl = await generatePolaroidImage();
      
      if (!imageUrl) {
        throw new Error('Failed to generate image');
      }
      
      // Create download link
      const downloadLink = document.createElement('a');
      downloadLink.href = imageUrl;
      downloadLink.download = 'polaroid-memory.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      // Store the image for potential sharing
      setPolaroidImage(imageUrl);
    } catch (error) {
      console.error('Error generating image for download:', error);
      alert('Failed to generate image. Please try again.');
    } finally {
      setIsSharing(false);
    }
  };
  
  // Generate a Polaroid image for sharing or downloading
  const generatePolaroidImage = async (): Promise<string | null> => {
    if (!carouselRef.current) return null;
    
    try {
      // Find the actual image in the carousel
      const actualImageElement = carouselRef.current.querySelector('img');
      
      if (!actualImageElement) {
        throw new Error('Could not find image in carousel');
      }
      
      // Create canvas for the Polaroid
      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 500;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('Could not get canvas context');
      }
      
      // Get caption text if available
      let caption = 'Polaroid Memory';
      const captionElement = carouselRef.current.querySelector('.polaroid-caption');
      if (captionElement && captionElement.textContent) {
        caption = captionElement.textContent;
      }
      
      // Draw the Polaroid frame
      // White background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 400, 500);
      
      // Border
      ctx.strokeStyle = '#dddddd';
      ctx.lineWidth = 2;
      ctx.strokeRect(10, 10, 380, 480);
      
      // Create a temporary image to draw the actual image
      return new Promise((resolve) => {
        const tempImg = new Image();
        tempImg.crossOrigin = 'anonymous'; // Try to handle CORS
        
        // Set up the onload handler before setting the src
        tempImg.onload = () => {
          try {
            // Draw the actual image in the Polaroid frame
            // Calculate dimensions to maintain aspect ratio
            const imgWidth = tempImg.width;
            const imgHeight = tempImg.height;
            let drawWidth = 340;
            let drawHeight = 340;
            
            if (imgWidth > imgHeight) {
              // Landscape image
              drawHeight = (imgHeight / imgWidth) * drawWidth;
            } else {
              // Portrait or square image
              drawWidth = (imgWidth / imgHeight) * drawHeight;
            }
            
            // Center the image in the frame
            const offsetX = 30 + (340 - drawWidth) / 2;
            const offsetY = 30 + (340 - drawHeight) / 2;
            
            // Draw image with proper dimensions
            ctx.drawImage(tempImg, offsetX, offsetY, drawWidth, drawHeight);
            
            // Add a subtle vignette effect
            const radialGradient = ctx.createRadialGradient(200, 200, 100, 200, 200, 200);
            radialGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
            radialGradient.addColorStop(1, 'rgba(0, 0, 0, 0.2)');
            ctx.fillStyle = radialGradient;
            ctx.fillRect(30, 30, 340, 340);
            
            // Caption text
            ctx.fillStyle = '#333333';
            ctx.font = '24px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(caption, 200, 420);
            
            // App name
            ctx.fillStyle = '#777777';
            ctx.font = '16px Arial';
            ctx.fillText('Polaroid Carousel', 200, 450);
            
            // Add a small shadow at the bottom to give it depth
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(10, 480, 380, 10);
            
            // Convert to PNG and return the data URL
            const pngUrl = canvas.toDataURL('image/png');
            resolve(pngUrl);
          } catch (drawError) {
            console.error('Error drawing image:', drawError);
            resolve(createFallbackPolaroidImage(caption));
          }
        };
        
        // Handle errors loading the image
        tempImg.onerror = () => {
          console.error('Error loading image');
          resolve(createFallbackPolaroidImage(caption));
        };
        
        // Set the source to the actual image
        tempImg.src = actualImageElement.src;
        
        // If the image is already loaded or cached, the onload might not fire
        // Add a timeout as a fallback
        setTimeout(() => {
          if (!tempImg.complete) {
            console.log('Image loading timeout, using fallback');
            resolve(createFallbackPolaroidImage(caption));
          }
        }, 3000);
      });
    } catch (error) {
      console.error('Error generating image:', error);
      return null;
    }
  };
  
  // Create a fallback polaroid image as a data URL
  const createFallbackPolaroidImage = (caption: string): string => {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 500;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      return '';
    }
    
    // Image area background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 400, 500);
    
    // Border
    ctx.strokeStyle = '#dddddd';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, 380, 480);
    
    // Create a simple gradient background
    const gradient = ctx.createLinearGradient(30, 30, 370, 370);
    gradient.addColorStop(0, '#f8e9d1');   // Vintage warm tone
    gradient.addColorStop(1, '#e6c9a8');   // Vintage sepia tone
    ctx.fillStyle = gradient;
    ctx.fillRect(30, 30, 340, 340);
    
    // Add some decorative elements to make it look like a photo
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.beginPath();
    ctx.arc(200, 150, 60, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fillRect(30, 200, 340, 170);
    
    // Caption text
    ctx.fillStyle = '#333333';
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(caption, 200, 420);
    
    // App name
    ctx.fillStyle = '#777777';
    ctx.font = '16px Arial';
    ctx.fillText('Polaroid Carousel', 200, 450);
    
    return canvas.toDataURL('image/png');
  };
  
  // Helper function to create a fallback polaroid if image loading fails
  const createFallbackPolaroid = (ctx: CanvasRenderingContext2D, caption: string): void => {
    try {
      // Image area background
      ctx.fillStyle = '#f5f5f5';
      ctx.fillRect(30, 30, 340, 340);
      
      // Create a simple gradient background
      const gradient = ctx.createLinearGradient(30, 30, 370, 370);
      gradient.addColorStop(0, '#f8e9d1');   // Vintage warm tone
      gradient.addColorStop(1, '#e6c9a8');   // Vintage sepia tone
      ctx.fillStyle = gradient;
      ctx.fillRect(30, 30, 340, 340);
      
      // Add some decorative elements to make it look like a photo
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.beginPath();
      ctx.arc(200, 150, 60, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.fillRect(30, 200, 340, 170);
      
      // Caption text
      ctx.fillStyle = '#333333';
      ctx.font = '24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(caption, 200, 420);
      
      // App name
      ctx.fillStyle = '#777777';
      ctx.font = '16px Arial';
      ctx.fillText('Polaroid Carousel', 200, 450);
      
      // Convert to PNG and download
      const pngUrl = ctx.canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = 'polaroid-memory.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      // Store the image for potential sharing
      setPolaroidImage(pngUrl);
      setIsSharing(false);
    } catch (fallbackError) {
      console.error('Fallback polaroid creation failed:', fallbackError);
      alert('Failed to generate image. Please try again.');
      setIsSharing(false);
    }
  };

  // Handle sharing to Farcaster
  const handleShareToFarcaster = async () => {
    setIsSharing(true);
    if (!carouselRef.current) {
      setIsSharing(false);
      return;
    }
    
    // Set a timeout to ensure we don't get stuck in processing state
    const processingTimeout = setTimeout(() => {
      setIsSharing(false);
    }, 10000); // 10 seconds max processing time
    
    try {
      // First, generate an image of the current Polaroid for sharing
      const imageUrl = await generatePolaroidImage();
      
      // Get caption text if available
      let caption = 'Polaroid Memory';
      const captionElement = carouselRef.current.querySelector('.polaroid-caption');
      if (captionElement && captionElement.textContent) {
        caption = captionElement.textContent;
      }
      
      // Create a shareable message
      const shareText = `Check out my vintage ${caption} on Polaroid Carousel!`;
      
      // When running as a mini app inside Farcaster, we need to use the native Farcaster cast API
      // Check if we're in Farcaster environment
      if (window.parent !== window) {
        // We're in an iframe, likely a Farcaster Frame
        try {
          // Store the image for display in the UI
          if (imageUrl) {
            setPolaroidImage(imageUrl);
          }
          
          // For Farcaster Frames, we use the postMessage API to communicate with the parent frame
          // This is the proper way to cast from within a mini app
          window.parent.postMessage({
            type: 'FRAME_ACTION',
            action: 'CAST',
            text: shareText,
            embeds: [window.location.origin],
            // If we had a hosted image URL, we would include it here
            // images: [hostedImageUrl],
          }, '*');
          
          console.log('Cast message sent to Farcaster parent frame');
        } catch (frameError) {
          console.error('Error using Farcaster Frame API:', frameError);
          throw frameError; // Re-throw to use fallback
        }
      } else {
        // We're not in a Farcaster Frame, use direct Warpcast URL
        let warpcastUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(shareText)}`;
        
        // Add the app URL as an embed
        warpcastUrl += `&embeds[]=${encodeURIComponent(window.location.origin)}`;
        
        // If we had a hosted image URL, we would add it here
        // if (hostedImageUrl) {
        //   warpcastUrl += `&embeds[]=${encodeURIComponent(hostedImageUrl)}`;
        // }
        
        // Open Warpcast in a new tab
        window.open(warpcastUrl, '_blank');
      }
      
      // Clear the timeout since we're about to finish processing
      clearTimeout(processingTimeout);
      
      // Reset sharing state
      setIsSharing(false);
    } catch (error) {
      console.error('Error sharing to Farcaster:', error);
      
      // Try fallback approach - copy to clipboard
      try {
        // Create a simple share message with the app URL
        const appUrl = window.location.origin;
        const shareText = `Check out my vintage Polaroid Memory on Polaroid Carousel!`;
        
        // Copy to clipboard as fallback
        const tempInput = document.createElement('input');
        document.body.appendChild(tempInput);
        tempInput.value = `${shareText} ${appUrl}`;
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        
        alert('Share text copied to clipboard! You can paste this in Farcaster to share your Polaroid.');
      } catch (fallbackError) {
        console.error('Fallback sharing failed:', fallbackError);
        alert('Unable to share. Please try again later.');
      }
    } finally {
      // Clear the timeout in case it hasn't fired yet
      clearTimeout(processingTimeout);
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
                <img src="/sparkle.svg" width={16} height={16} alt="" className="animate-twinkle" />
              </div>
            )}
            {isSharing ? 'Processing...' : 'Share to Farcaster'}
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-700 opacity-0 group-hover:opacity-100 transition-opacity"></span>
        </button>
      </div>
      
      {/* Don't render FarcasterFrame component to avoid popup */}
    </>
  );
};

export default ShareOptions;
