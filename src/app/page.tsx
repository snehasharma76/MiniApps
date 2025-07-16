"use client";

import dynamic from 'next/dynamic';

const LandingPageClient = dynamic(
  () => import('@/components/LandingPage'),
  { ssr: false }
);

export default function Home() {
  return <LandingPageClient />;
}
