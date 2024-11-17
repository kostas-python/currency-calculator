import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';



// Middleware to authenticate API requests
export function authMiddleware(req: NextRequest) {

  // Extract the token from the Authorization header (format: Bearer <token>)
  const token = req.headers.get('Authorization')?.split(' ')[1]; 


  // If no token is provided, return a 401 Unauthorized response
  if (!token) {
    
    return NextResponse.json({ message: 'Authorization required' }, { status: 401 });
  }

  try {
    // Verify the JWT token using the secret stored in the environment variable
    jwt.verify(token, process.env.JWT_SECRET as string);

    // If the token is valid, allow the request to proceed
    return NextResponse.next();
  } catch (error) {
    // Handle different errors (e.g., expired or invalid token)
    if (error instanceof jwt.TokenExpiredError) {
      return NextResponse.json({ message: 'Token expired' }, { status: 401 });
    }
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }
}

// Configuration to apply the middleware only to certain paths
export const config = {
  matcher: ['/dashboard/:path*', '/api/protected/:path*'],
};

