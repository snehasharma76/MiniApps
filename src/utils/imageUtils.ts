/**
 * Utility functions for image handling
 */

/**
 * Creates a simplified Polaroid image for sharing when html2canvas fails
 * @param caption The caption text for the Polaroid
 * @param theme The theme to apply to the Polaroid
 * @returns A Promise that resolves to a data URL of the generated image
 */
export const createFallbackPolaroidImage = (
  caption: string = 'Polaroid Memory',
  theme: string = 'vintage'
): Promise<string> => {
  return new Promise((resolve) => {
    // Create a canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      resolve(''); // Fallback if canvas context is not available
      return;
    }
    
    // Set canvas dimensions for a Polaroid-like ratio
    canvas.width = 300;
    canvas.height = 350;
    
    // Fill background based on theme
    let bgColor = '#ffffff';
    let borderColor = '#eeeeee';
    let textColor = '#333333';
    
    switch (theme) {
      case 'sepia':
        bgColor = '#f5e8c9';
        borderColor = '#d9c7a7';
        textColor = '#8b4513';
        break;
      case 'monochrome':
        bgColor = '#f0f0f0';
        borderColor = '#d0d0d0';
        textColor = '#333333';
        break;
      case 'vintage':
        bgColor = '#f9e8d2';
        borderColor = '#e6c9a8';
        textColor = '#8b4513';
        break;
      case 'classic':
        bgColor = '#e8f0f9';
        borderColor = '#c9d8e6';
        textColor = '#2c3e50';
        break;
    }
    
    // Draw Polaroid frame
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw border
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 8;
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
    
    // Draw image placeholder area
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(20, 20, canvas.width - 40, canvas.height - 80);
    
    // Draw text for placeholder
    ctx.fillStyle = '#999999';
    ctx.font = '16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Polaroid Carousel', canvas.width / 2, canvas.height / 2);
    
    // Draw caption area
    ctx.fillStyle = bgColor;
    ctx.fillRect(20, canvas.height - 60, canvas.width - 40, 40);
    
    // Draw caption text
    ctx.fillStyle = textColor;
    ctx.font = '18px cursive';
    ctx.textAlign = 'center';
    ctx.fillText(caption || 'Polaroid Memory', canvas.width / 2, canvas.height - 30);
    
    // Convert to data URL
    const dataUrl = canvas.toDataURL('image/png');
    resolve(dataUrl);
  });
};
