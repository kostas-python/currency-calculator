'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'



export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-gray-900">
      <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
        {/* Container for the logo, centered */}
        <div className="flex flex-1 justify-center">
          <Link href="/" className="-m-1.5 p-1.5">
            <h1 className="text-center  text-xl font-bold">TECH4SOLUTIONS CURRENCY CALCULATOR</h1>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>

        {/* Right-aligned content for larger screens */}
        
      </nav>

      {/* Mobile menu */}
{/* Mobile menu */}
{/* Mobile menu */}
<Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
  <div className="fixed inset-0 z-10" />
  <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
    <div className="flex flex-col justify-center items-center space-y-6 h-full"> {/* Full-height flex container for vertical centering */}
      <Link href="/" className="p-1.5">
        <h1 className="text-center text-xl font-bold text-white">
          TECH4SOLUTIONS CURRENCY CALCULATOR
        </h1>
      </Link>

      {/* Close Button */}
      <button
        type="button"
        onClick={() => setMobileMenuOpen(false)}
        className="-m-2.5 rounded-md p-2.5 text-gray-100"
      >
        <span className="sr-only">Close menu</span>
        <XMarkIcon aria-hidden="true" className="size-6" />
      </button>

      {/* Login Button */}
      <div className="flex justify-center items-center mt-6"> {/* Ensure flexbox layout to center */}
        <Link 
          href='/pages/login' 
          className="inline-block px-5 py-3 overflow-hidden font-bold rounded-full group relative"
        >
          <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
          <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
          <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">User login</span>
          <span className="absolute inset-0 border-2 border-white rounded-full"></span>
        </Link>
      </div>
    </div>
  </DialogPanel>
</Dialog>



    </header>
  )
}
