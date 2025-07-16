"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { isInFarcasterFrame, getFarcasterUser } from '../../utils/farcaster';
import Link from 'next/link';

export default function SharePage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isFarcaster, setIsFarcaster] = useState(false);
  const [userInfo, setUserInfo] = useState<{ fid?: string; username?: string }>({});
  
  useEffect(() => {
    // Check if we're in a Farcaster frame context
    setIsFarcaster(isInFarcasterFrame());
    setUserInfo(getFarcasterUser());
    
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
        } catch (error) {
          console.error('Error decoding image:', error);
        }
      }
    }
  }, []);

  // Frame metadata for Farcaster
  const frameMetadata = {
    buttons: [
      {
        label: 'Create Your Own',
        action: 'post',
      },
      {
        label: 'Download',
        action: 'post_redirect',
      }
    ],
    image: imageUrl || '/vintage-polaroid.jpg',
    title: 'Polaroid Carousel',
    description: 'Create and share vintage Polaroid memories'
  };

  // Add frame metadata to head
  useEffect(() => {
    if (typeof document !== 'undefined') {
      // Add frame metadata for Farcaster
      const meta = document.createElement('meta');
      meta.name = 'fc:frame';
      meta.content = 'vNext';
      document.head.appendChild(meta);
      
      // Add frame image
      const imgMeta = document.createElement('meta');
      imgMeta.name = 'fc:frame:image';
      imgMeta.content = frameMetadata.image;
      document.head.appendChild(imgMeta);
      
      // Add frame title
      const titleMeta = document.createElement('meta');
      titleMeta.name = 'fc:frame:title';
      titleMeta.content = frameMetadata.title;
      document.head.appendChild(titleMeta);
      
      // Add frame description
      const descMeta = document.createElement('meta');
      descMeta.name = 'fc:frame:description';
      descMeta.content = frameMetadata.description;
      document.head.appendChild(descMeta);
      
      // Add button 1
      const btn1Meta = document.createElement('meta');
      btn1Meta.name = 'fc:frame:button:1';
      btn1Meta.content = frameMetadata.buttons[0].label;
      document.head.appendChild(btn1Meta);
      
      // Add button 1 action
      const btn1ActionMeta = document.createElement('meta');
      btn1ActionMeta.name = 'fc:frame:button:1:action';
      btn1ActionMeta.content = frameMetadata.buttons[0].action;
      document.head.appendChild(btn1ActionMeta);
      
      // Add button 2
      const btn2Meta = document.createElement('meta');
      btn2Meta.name = 'fc:frame:button:2';
      btn2Meta.content = frameMetadata.buttons[1].label;
      document.head.appendChild(btn2Meta);
      
      // Add button 2 action
      const btn2ActionMeta = document.createElement('meta');
      btn2ActionMeta.name = 'fc:frame:button:2:action';
      btn2ActionMeta.content = frameMetadata.buttons[1].action;
      document.head.appendChild(btn2ActionMeta);
      
      // Add post URL for button 1
      const postUrlMeta = document.createElement('meta');
      postUrlMeta.name = 'fc:frame:post_url';
      postUrlMeta.content = `${window.location.origin}/api/frame`;
      document.head.appendChild(postUrlMeta);
      
      // Add redirect URL for button 2
      const redirectUrlMeta = document.createElement('meta');
      redirectUrlMeta.name = 'fc:frame:button:2:target';
      redirectUrlMeta.content = `${window.location.origin}/download?img=${encodeURIComponent(imageUrl || '')}`;
      document.head.appendChild(redirectUrlMeta);
    }
  }, [imageUrl]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-amber-50">
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 border-2 border-amber-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16">
          <Image src="/sparkle.svg" alt="" width={64} height={64} className="animate-twinkle" priority />
        </div>
        
        <h1 className="font-retro-bold text-2xl mb-4 text-center text-amber-800 rotate-[-2deg]">
          Polaroid Carousel
        </h1>
        
        {imageUrl ? (
          <div className="polaroid-frame mb-6 mx-auto">
            <div className="relative w-full max-w-xs mx-auto">
              <Image 
                src={imageUrl} 
                alt="Shared Polaroid" 
                width={300} 
                height={350} 
                className="rounded shadow-lg"
              />
            </div>
          </div>
        ) : (
          <div className="bg-gray-100 h-64 flex items-center justify-center rounded mb-6">
            <p className="text-gray-500 font-retro-bold">Image not available</p>
          </div>
        )}
        
        <div className="flex flex-col gap-4 mt-6">
          <Link href="/" className="btn-retro py-2 px-4 rounded text-center font-retro-bold">
            <span className="relative z-10">Create Your Own</span>
          </Link>
          
          {imageUrl && (
            <a 
              href={imageUrl} 
              download="polaroid-memory.png"
              className="btn-retro py-2 px-4 rounded text-center font-retro-bold"
            >
              <span className="relative z-10">Download</span>
            </a>
          )}
        </div>
        
        <p className="text-xs text-center mt-6 text-amber-700">
          A vintage Polaroid experience
        </p>
      </div>
    </main>
  );
}
