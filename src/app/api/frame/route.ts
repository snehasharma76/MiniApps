import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Parse the incoming request body
    const body = await request.json();
    
    // Extract the Farcaster frame data
    const { untrustedData } = body;
    
    // Log the frame interaction (in a real app, you might want to store this)
    console.log('Frame interaction:', untrustedData);
    
    // Determine which button was pressed
    const buttonIndex = untrustedData?.buttonIndex || 1;
    
    // Create the response based on the button pressed
    if (buttonIndex === 1) {
      // Button 1: Create Your Own - redirect to the main app
      return NextResponse.json({
        status: 'success',
        message: 'Redirecting to create page',
        location: '/'
      });
    } else if (buttonIndex === 2) {
      // Button 2: Download - this is handled by the fc:frame:button:2:target
      return NextResponse.json({
        status: 'success',
        message: 'Downloading image'
      });
    }
    
    // Default response
    return NextResponse.json({
      status: 'success',
      message: 'Frame interaction received'
    });
  } catch (error) {
    console.error('Error processing frame interaction:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Failed to process frame interaction'
    }, { status: 500 });
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
