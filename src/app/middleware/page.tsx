import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';


// Middleware function to authenticate API requests

export function authMiddleware(req: NextRequest) {

  // Retrieve the Authorization header from the request and extract the token

  // The header should be in the form of 'Bearer <token>'

  const token = req.headers.get('Authorization')?.split(' ')[1]; // Bearer <token>

  // If no token is provided, return a 401 Unauthorized response
  
  if (!token) {
    return NextResponse.json({ message: 'Authorization required' }, { status: 401 });
  }

  try {

    // Verify the JWT token using the secret stored in the environment variable
    
    // If valid, the request will proceed to the next middleware or handler

    jwt.verify(token, process.env.JWT_SECRET as string);
    
    // If the token is valid, allow the request to proceed

    return NextResponse.next();
  } catch (err) {

    // If the token is invalid or expired, return a 401 Unauthorized response

    return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
  }
}
