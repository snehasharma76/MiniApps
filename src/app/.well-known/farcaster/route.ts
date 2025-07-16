import { NextResponse } from 'next/server';

/**
 * Filter out undefined or empty properties from an object
 */
function withValidProperties(
  properties: Record<string, undefined | string | string[] | null>
) {
  return Object.fromEntries(
    Object.entries(properties).filter(([_, value]) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return value !== undefined && value !== null && value !== '';
    })
  );
}

/**
 * GET handler for the .well-known/farcaster endpoint
 * This provides metadata for Farcaster clients about this mini-app
 */
export async function GET() {
  const URL = process.env.NEXT_PUBLIC_URL || 'https://polaroid-carousel.vercel.app';
  
  // Create the response object with the required Farcaster manifest format
  const response = {
    accountAssociation: withValidProperties({
      header: process.env.FARCASTER_HEADER || '',
      payload: process.env.FARCASTER_PAYLOAD || '',
      signature: process.env.FARCASTER_SIGNATURE || '',
    }),
    frame: withValidProperties({
      version: "1",
      name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || 'Polaroid Carousel',
      subtitle: process.env.NEXT_PUBLIC_APP_SUBTITLE || 'Create and share vintage Polaroid memories',
      description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'A retro-style Polaroid image creator with vintage filters and sharing capabilities',
      screenshotUrls: [],
      iconUrl: process.env.NEXT_PUBLIC_APP_ICON || `${URL}/icon.png`,
      splashImageUrl: process.env.NEXT_PUBLIC_APP_SPLASH_IMAGE || `${URL}/splash.png`,
      splashBackgroundColor: process.env.NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR || '#f9e8d2',
      homeUrl: URL,
      webhookUrl: `${URL}/api/webhook`,
      primaryCategory: process.env.NEXT_PUBLIC_APP_PRIMARY_CATEGORY || 'social',
      tags: ['polaroid', 'retro', 'vintage', 'photos', 'memories'],
      heroImageUrl: process.env.NEXT_PUBLIC_APP_HERO_IMAGE || `${URL}/og-image.png`,
      tagline: process.env.NEXT_PUBLIC_APP_TAGLINE || 'Capture memories in vintage Polaroid style',
      ogTitle: process.env.NEXT_PUBLIC_APP_OG_TITLE || 'Polaroid Carousel - Vintage Photo Creator',
      ogDescription: process.env.NEXT_PUBLIC_APP_OG_DESCRIPTION || 'Create and share beautiful vintage Polaroid-style photos with friends',
      ogImageUrl: process.env.NEXT_PUBLIC_APP_OG_IMAGE || `${URL}/og-image.png`,
    }),
  };
  
  // Return the response with proper headers
  return NextResponse.json(response, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json'
    }
  });
}

// Handle OPTIONS requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
