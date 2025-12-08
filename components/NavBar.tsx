"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

type NavBarProps = {
  className?: string
}

const PUBLIC_BASE = process.env.NEXT_PUBLIC_BASE_URL || ''

const LINKS_LOCAL: { href: string; label: string }[] = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/howitworks', label: 'How It Works' },
  { href: '/smartride', label: 'Smart Ride' },
  { href: '/contact', label: 'Contact' },
]

const LINKS_PUBLIC: { href: string; label: string }[] = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/howitworks', label: 'How It Works' },
  { href: '/smartride', label: 'Smart Ride' },
  { href: '/contact', label: 'Contact' },
  
]

export default function NavBar({ className = '' }: NavBarProps) {
  const pathname = usePathname() || '/'
  const [origin, setOrigin] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') setOrigin(window.location.origin)
  }, [])

  const isLocalOrigin = (origin || '').includes('localhost') || (origin || '').includes('127.0.0.1') || process.env.NODE_ENV !== 'production'
  const usePublic = Boolean(origin && PUBLIC_BASE && origin !== PUBLIC_BASE && !isLocalOrigin && process.env.NODE_ENV === 'production')

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/'
    return pathname === path || pathname.startsWith(path + '/')
  }

  return (
    <nav className={`flex gap-10 items-center justify-between px-6 py-2 bg-white ${className}`}>
      <div className="flex items-center gap-4">
        
        <div className="hidden md:flex items-center gap-6">
          {(usePublic
            ? LINKS_PUBLIC.map((l) => ({ href: `${PUBLIC_BASE}${l.href}`, label: l.label }))
            : LINKS_LOCAL
          ).map((l) => {
            const rawHref = l.href
            const key = rawHref
            // If href is absolute (starts with http) render anchor, else use Next Link
            const isExternal = rawHref.startsWith('http')
            if (isExternal) {
              return (
                <a
                  key={key}
                  href={rawHref}
                  className={`${isActive(rawHref.replace(PUBLIC_BASE, '') ) ? 'text-[#00B75A]' : 'text-gray-700'} font-sm text-sm hover:text-[#059669] transition-colors`}
                >
                  {l.label}
                </a>
              )
            }

            return (
              <Link
                key={key}
                href={rawHref}
                className={`${isActive(rawHref) ? 'text-[#00B75A]' : 'text-gray-700'} font-sm text-sm hover:text-[#059669] transition-colors`}
                aria-current={isActive(rawHref) ? 'page' : undefined}
              >
                {l.label}
              </Link>
            )
          })}
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
