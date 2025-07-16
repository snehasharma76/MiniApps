import { NextRequest, NextResponse } from 'next/server';

interface FrameRequest {
  untrustedData: {
    buttonIndex: number;
    fid: string;
    timestamp: number;
    castId: {
      fid: string;
      hash: string;
    };
    state?: string;
  };
  trustedData?: {
    messageBytes: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    // Parse the incoming request body
    const body = await request.json() as FrameRequest;
    
    // Extract the Farcaster frame data
    const { untrustedData } = body;
    
    // Log the frame interaction (in a real app, you might want to store this)
    console.log('Frame interaction:', untrustedData);
    
    // Parse the state if it exists
    let state = {};
    if (untrustedData?.state) {
      try {
        state = JSON.parse(untrustedData.state);
      } catch (e) {
        console.error('Error parsing state:', e);
      }
    }
    
    // Get the image URL from state
    const imageUrl = (state as any).imageUrl;
    
    // Determine which button was pressed
    const buttonIndex = untrustedData?.buttonIndex || 1;
    
    // Create the response based on the button pressed
    if (buttonIndex === 1) {
      // Button 1: Create Your Own - redirect to the main app
      return NextResponse.json({
        frameMetadata: {
          image: imageUrl || '/vintage-polaroid.jpg',
          title: 'Polaroid Carousel',
          description: 'Create your own vintage Polaroid memories!',
          buttons: [
            {
              label: 'Go to App',
              action: 'post_redirect',
              target: '/'
            }
          ]
        }
      });
    } else if (buttonIndex === 2) {
      // Button 2: Download - this is handled by the fc:frame:button:2:target
      return NextResponse.json({
        frameMetadata: {
          image: imageUrl || '/vintage-polaroid.jpg',
          title: 'Downloading...',
          description: 'Your Polaroid memory is being downloaded!',
          buttons: [
            {
              label: 'Create Another',
              action: 'post_redirect',
              target: '/'
            }
          ]
        }
      });
    }
    
    // Default response
    return NextResponse.json({
      frameMetadata: {
        image: imageUrl || '/vintage-polaroid.jpg',
        title: 'Polaroid Carousel',
        description: 'Create and share vintage Polaroid memories',
        buttons: [
          {
            label: 'Create Your Own',
            action: 'post_redirect',
            target: '/'
          }
        ]
      }
    });
  } catch (error) {
    console.error('Error processing frame interaction:', error);
    return NextResponse.json({
      frameMetadata: {
        image: '/vintage-polaroid.jpg',
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        buttons: [
          {
            label: 'Try Again',
            action: 'post_redirect',
            target: '/'
          }
        ]
      }
    });
  }
}

// Handle OPTIONS requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}
