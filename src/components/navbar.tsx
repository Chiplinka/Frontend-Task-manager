import Link from 'next/link'
import ButtonLogOut from '@/components/logout'
import React from 'react'

const Navbar = () => {
  const navElCss =
    'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xl font-medium'
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-white text-3xl font-semibold">InnoTask</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link className={navElCss} href={'/'}>
                Home
              </Link>
              <Link className={navElCss} href={'/tasks'}>
                Task
              </Link>
              <Link className={navElCss} href={'/about'}>
                About
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
