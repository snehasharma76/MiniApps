import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware ensures proper handling of .well-known routes
export function middleware(request: NextRequest) {
  // Add CORS headers for .well-known routes
  if (request.nextUrl.pathname.startsWith('/.well-known/')) {
    const response = NextResponse.next();
    
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    
    return response;
  }
  
  return NextResponse.next();
}

// Configure which paths this middleware will run on
export const config = {
  matcher: [
    '/.well-known/:path*',
  ],
};
