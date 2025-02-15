'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import bcrypt from 'bcryptjs'; 
import Header from "@/app/components/header";
import Link from 'next/link';


export default function LoginPage() {
  // Initialize the App Router's router
  const router = useRouter();


  // State to store form data and errors
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});


  // Admin credentials (hashed password for 'password')
  const adminCredentials = {
    email: process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? '', 
    passwordHash: "$2a$12$fGNaerNxxk2CvneNAitmNumXCIHaowckFULABCLQeIXFiPuz0ERja"
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({});

    // Validate form fields
    const newErrors: { email?: string; password?: string } = {};

    // Validate email
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Validate password
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    // If there are errors, set them in state
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

        // Simulate login logic with the hashed password
    if (email === adminCredentials.email) {
      const isPasswordValid = bcrypt.compareSync(password, adminCredentials.passwordHash);

      if (isPasswordValid) {
        console.log("Login successful! Redirecting to dashboard...");
        
        // Store a valid JWT token in localStorage after successful login
        const token = "yxTKA4Cthn0WUC4fsdyQzqTwZPrHbR8TQop4pgszziM=";  // Replace this with an actual JWT token, if you are getting it from the backend
        localStorage.setItem("authToken", token);  // Save the token with the key "authToken"

        // Redirect to the dashboard page
        router.push('/pages/dashboard');
      } else {
        setErrors({ email: "Invalid email or password" });
      }
    } else {
      setErrors({ email: "Invalid email or password" });
    }
      };

  return (
    <>
      <Header />

      <div className="flex min-h-full h-screen bg-gradient-to-b from-gray-100 via-gray-200 to-gray-500 flex-col justify-start items-center px-6 py-12 lg:px-8">
  
        {/* Link button centered horizontally and positioned at the top */}
        <Link 
          href='/' 
          className="absolute top-28 left-1/2 transform -translate-x-1/2 items-center inline-block px-5 py-3 overflow-hidden font-bold rounded-full group"
        >
          <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-black opacity-[3%]"></span>
          <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-gray-700 opacity-100 group-hover:-translate-x-8"></span>
          <span className="relative w-full text-left text-black transition-colors duration-200 ease-in-out group-hover:text-white">Go To Homepage</span>
          <span className="absolute inset-0 border-2 border-black rounded-full"></span>     
        </Link>

        {/* Form content */}
        <div className="mt-80 sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm ${
                    errors.email ? 'ring-red-500' : ''
                  }`}
                />

                {/* Display error message if validation fails */}
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Password input */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm ${
                    errors.password ? 'ring-red-500' : ''
                  }`}
                />
                
                {/* Display error message if validation fails */}
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>
            </div>

            {/* Submit button */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
