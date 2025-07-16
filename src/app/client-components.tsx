"use client";

import dynamic from 'next/dynamic';
import BaseConnection from '@/components/BaseConnection';

// Use dynamic import with SSR disabled for html2canvas compatibility
export const CarouselClient = dynamic(() => import('@/components/Carousel'), { ssr: false });

// Export BaseConnection component
export { BaseConnection };
