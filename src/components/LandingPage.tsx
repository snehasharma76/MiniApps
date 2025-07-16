"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const [loading, setLoading] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setLoading(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleEnterApp = () => {
    router.push('/carousel');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-vintage-cream p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8 relative">
          <div className="polaroid-container animate-float">
            <div className="polaroid-frame">
              <div className="polaroid-image">
                <Image 
                  src="/vintage-polaroid.jpg" 
                  alt="Vintage Polaroid Camera" 
                  width={400}
                  height={400}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-2 -right-2">
                <Image src="/sparkle.svg" width={24} height={24} alt="sparkle" className="animate-twinkle" priority />
              </div>
              <div className="absolute -bottom-3 -left-1">
                <Image src="/sparkle.svg" width={16} height={16} alt="sparkle" className="animate-twinkle delay-300" priority />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <div className="w-full bg-amber-100 rounded-md h-6 mb-2 overflow-hidden border-2 border-amber-700 relative" style={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)' }}>
            <div 
              className="bg-vintage-amber h-full transition-all duration-300 ease-out relative"
              style={{ width: `${loading}%` }}
            >
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-amber-400 to-transparent opacity-50"></div>
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                {loading > 30 && (
                  <div className="flex space-x-1">
                    {Array.from({length: Math.floor(loading/20)}).map((_, i) => (
                      <div key={i} className="w-1 h-3 bg-white opacity-70 animate-pulse" style={{ animationDelay: `${i * 100}ms` }}></div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="text-center">
            <span className="retro-text-bg">
              <p className="font-retro-bold text-xl mb-0">Loading your memories... {loading}%</p>
            </span>
          </div>
        </div>
        
        {loading === 100 && (
          <button
            onClick={handleEnterApp}
            className="px-8 py-3 text-white rounded-lg font-retro-bold text-2xl relative overflow-hidden group btn-retro"
          >
            <span className="relative z-10 block py-1 text-white" style={{ textShadow: '2px 2px 0 #5c2c0d' }}>CAST YOUR MOMENTS ONCHAIN</span>
            <span className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-700 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute top-0 left-1/4">
                <Image src="/sparkle.svg" width={16} height={16} alt="sparkle" className="animate-twinkle" priority />
              </div>
              <div className="absolute bottom-1 right-1/4">
                <Image src="/sparkle.svg" width={12} height={12} alt="sparkle" className="animate-twinkle delay-500" priority />
              </div>
              <div className="absolute top-1/2 right-1/3">
                <Image src="/sparkle.svg" width={10} height={10} alt="sparkle" className="animate-twinkle delay-700" priority />
              </div>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
