"use client";

import dynamic from 'next/dynamic';

// Use dynamic import with SSR disabled for html2canvas compatibility
export const CarouselClient = dynamic(() => import('@/components/Carousel'), { ssr: false });
