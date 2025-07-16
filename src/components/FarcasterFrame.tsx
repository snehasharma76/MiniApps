"use client";

import React, { useEffect, useState } from 'react';
import { isInFarcasterFrame, getFarcasterUser } from '../utils/farcaster';
import Image from 'next/image';

interface FarcasterFrameProps {
  imageUrl: string | null;
  onShare: () => void;
}

const FarcasterFrame: React.FC<FarcasterFrameProps> = ({ imageUrl, onShare }) => {
  const [isFarcaster, setIsFarcaster] = useState(false);
  const [userInfo, setUserInfo] = useState<{ fid?: string; username?: string }>({});
  
  useEffect(() => {
    // Check if we're in a Farcaster frame context
    setIsFarcaster(isInFarcasterFrame());
    setUserInfo(getFarcasterUser());
  }, []);

  if (!isFarcaster) {
    return null; // Don't render anything if not in Farcaster
  }

  return (
    <div className="farcaster-frame p-4 bg-vintage-amber/20 rounded-lg border-2 border-amber-200 mt-4">
      <div className="flex flex-col items-center gap-3">
        {userInfo.username && (
          <p className="font-retro-bold text-lg">
            Hello, {userInfo.username}! 👋
          </p>
        )}
        
        {imageUrl ? (
          <div className="relative w-full max-w-xs mx-auto">
            <Image 
              src={imageUrl} 
              alt="Your Polaroid" 
              width={300} 
              height={350} 
              className="rounded shadow-lg"
            />
          </div>
        ) : (
          <p className="text-center font-retro-bold">Create your vintage Polaroid!</p>
        )}
        
        <button
          onClick={onShare}
          className="px-6 py-3 rounded-md font-retro-bold text-xl flex items-center justify-center gap-2 btn-retro relative overflow-hidden group"
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
    </div>
  );
};

export default FarcasterFrame;
