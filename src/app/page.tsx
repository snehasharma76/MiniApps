"use client";

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';

const LandingPageClient = dynamic(
  () => import('@/components/LandingPage'),
  { ssr: false }
);

export default function Home() {
  const { setFrameReady, isFrameReady } = useMiniKit();

  // Set the frame as ready when the app is loaded
  useEffect(() => {
    if (!isFrameReady) {
      // Short timeout to ensure components are loaded
      const timer = setTimeout(() => {
        setFrameReady();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [setFrameReady, isFrameReady]);

  return <LandingPageClient />;
}
