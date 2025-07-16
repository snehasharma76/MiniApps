import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Parse the incoming webhook data
    const body = await request.json();
    
    // Log the webhook data for debugging
    console.log('Received webhook data:', body);
    
    // Process different webhook event types
    const { type, data } = body;
    
    switch (type) {
      case 'frame_action':
        // Handle frame actions (button clicks, etc.)
        return handleFrameAction(data);
      
      case 'app_open':
        // Handle app open events
        return handleAppOpen(data);
      
      default:
        return NextResponse.json({ 
          success: true, 
          message: `Received webhook of type: ${type}` 
        });
    }
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to process webhook' 
    }, { status: 500 });
  }
}

// Handle frame action events (button clicks)
function handleFrameAction(data: any) {
  const { buttonIndex, castId, frameUrl } = data;
  
  console.log(`Frame action: Button ${buttonIndex} clicked for cast ${castId} on frame ${frameUrl}`);
  
  return NextResponse.json({
    success: true,
    message: 'Frame action processed'
  });
}

// Handle app open events
function handleAppOpen(data: any) {
  const { fid, username } = data;
  
  console.log(`App opened by user ${username} (FID: ${fid})`);
  
  return NextResponse.json({
    success: true,
    message: 'App open event processed'
  });
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
