"use client"

import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

type NavBarProps = {
  className?: string
}

const PUBLIC_BASE = process.env.NEXT_PUBLIC_BASE_URL || ''

const LINKS: { href: string; label: string }[] = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/howitworks', label: 'How It Works' },
  { href: '/smartride', label: 'Smart Ride' },
  { href: '/contact', label: 'Contact' },
  // Public search should open the hosted public site search
  { href: `${PUBLIC_BASE}/search`, label: 'Search' },
]

export default function NavBar({ className = '' }: NavBarProps) {
  const pathname = usePathname() || '/'

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/'
    return pathname === path || pathname.startsWith(path + '/')
  }

  return (
    <nav className={`flex gap-10 items-center justify-between px-6 py-2 bg-white ${className}`}>
      <div className="flex items-center gap-4">
        
        <div className="hidden md:flex items-center gap-6">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`${isActive(l.href) ? 'text-[#00B75A]' : 'text-gray-700'} font-sm text-sm hover:text-[#059669] transition-colors`}
              aria-current={isActive(l.href) ? 'page' : undefined}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      {/* <div className="flex items-center px-4 gap-3">
        <Link href="/auth/customer/signup" className="inline-block px-4 py-2 bg-[#10b981] text-white rounded-md text-sm">
          Book a delivery
        </Link>
        <Link href="/auth/role-select" className="inline-block px-4 py-2 border border-gray-200 rounded-md text-sm">
          Get Started
        </Link>
      </div> */}
    </nav>
  )
}
