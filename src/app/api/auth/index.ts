import User from '@/app/models/user';  
import bcrypt from 'bcryptjs';  
import jwt from 'jsonwebtoken';  
import { NextResponse } from 'next/server'; 


{/* 
  ******* Register a new user for future if needed ******

export async function POST(req: Request) {
  // Extract username and password from the request body
  const { username, password } = await req.json();


  try {
    // Hash the password using bcrypt with a salt rounds of 10
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create a new user with the hashed password
    const user = await User.create({ username, password: hashedPassword });
    
    // Return a success message if the user was created successfully
    return NextResponse.json({ message: 'User registered successfully' });
  } catch (err: unknown) {

    // Handle errors, asserting err as an instance of Error
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    } else {
        
      // In case err is not an instance of Error, return a generic error message
      return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
    }
  }
}
*/}

// Login and return a JWT
export async function POST(req: Request) {

  // Extract username and password from the request body
  const { username, password } = await req.json();

  try {
    // Find the user by their username
    const user = await User.findOne({ where: { username } });
    
    // If the user does not exist or the password is incorrect, return an error
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Generate a JWT token using the user's id and a secret stored in the environment variables
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: '1h', // Token expires in 1 hour
    });

    // Return the generated token
    return NextResponse.json({ token });
  } catch (err: unknown) {

    // Handle errors, asserting err as an instance of Error
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    } else {

      // In case err is not an instance of Error, return a generic error message
      return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
    }
  }
}

