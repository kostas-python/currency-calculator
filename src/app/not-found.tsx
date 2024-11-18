'use client'
import Header from './components/header';  // header component
import Link from 'next/link';     // Link for links in next js
import Image from 'next/image';   // image optimisation



// Not found page

export default function NotFound() {
    return (
      <>
        <Header />
        <main className="relative isolate h-screen">

          {/* Image background section */}
          
          <Image
            alt=""
            src="/image5.jpg"
            width={1000}
            height={1000}
            className="absolute inset-0 -z-10 mt-32 py-32 object-contain object-left "
          />

          {/* The rest of the content */}

          <div className="mx-auto max-w-7xl px-6 py-32 text-center mt-32 sm:py-40 lg:px-8">
            <p className="text-lg font-semibold text-white">404</p>
            <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl">
              Page not found
            </h1>
            <p className="mt-6 text-pretty text-lg font-medium text-white sm:text-xl/8">
              Sorry, we couldn’t find the page you’re looking for.
            </p>
            <div className="mt-10 flex justify-center">
              <Link href="/" className="text-lg font-semibold text-white">
                <span aria-hidden="true">&larr;</span> Back to home
              </Link>
            </div>
          </div>
        </main>
      </>
    )
  }
  