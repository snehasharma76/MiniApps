// Farcaster integration utilities

/**
 * Prepares and validates image data for Farcaster sharing
 * @param imageData Base64 image data
 * @returns Processed image data ready for Farcaster
 */
export const prepareImageForFarcaster = (imageData: string): string => {
  // Remove the data URL prefix if present
  const processedImage = imageData.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
  return processedImage;
};

/**
 * Checks if the app is running within a Farcaster Frame context
 */
export const isInFarcasterFrame = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Check for Farcaster user agent or frame parameters
  const userAgent = window.navigator.userAgent.toLowerCase();
  const urlParams = new URLSearchParams(window.location.search);
  
  return (
    userAgent.includes('farcaster') || 
    urlParams.has('fc') || 
    urlParams.has('farcaster') ||
    window.location.href.includes('warpcast')
  );
};

/**
 * Gets the Farcaster user information if available
 */
export const getFarcasterUser = (): { fid?: string; username?: string } => {
  if (typeof window === 'undefined') return {};
  
  const urlParams = new URLSearchParams(window.location.search);
  return {
    fid: urlParams.get('fid') || undefined,
    username: urlParams.get('username') || undefined
  };
};
