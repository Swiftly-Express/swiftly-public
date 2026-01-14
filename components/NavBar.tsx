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
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') setOrigin(window.location.origin)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const isLocalOrigin = (origin || '').includes('localhost') || (origin || '').includes('127.0.0.1') || process.env.NODE_ENV !== 'production'
  const usePublic = Boolean(origin && PUBLIC_BASE && origin !== PUBLIC_BASE && !isLocalOrigin && process.env.NODE_ENV === 'production')

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/'
    return pathname === path || pathname.startsWith(path + '/')
  }

  return (
    <>
      <nav className={`relative flex items-center justify-between px-4 md:px-6 py-0 h-14 md:h-16 bg-white ${className}`}>
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link href="/" className="inline-block -ml-8 md:ml-0">
            <img src="/swiftly-logo.svg" alt="Swiftly" className="h-36 md:h-16 lg:h-40 object-contain" />
          </Link>
        </div>

        {/* Center: Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {(usePublic
            ? LINKS_PUBLIC.map((l) => ({ href: `${PUBLIC_BASE}${l.href}`, label: l.label }))
            : LINKS_LOCAL
          ).map((l) => {
            const rawHref = l.href
            const key = rawHref
            const isExternal = rawHref.startsWith('http')
            if (isExternal) {
              return (
                <a
                  key={key}
                  href={rawHref}
                  className={`${isActive(rawHref.replace(PUBLIC_BASE, '')) ? 'text-[#00B75A]' : 'text-gray-700'} font-sm text-sm hover:text-[#059669] transition-colors`}
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

        {/* Right: Hamburger (mobile) - fixed to viewport right edge */}
        <div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden fixed right-4 top-3 flex flex-col justify-center items-center w-8 h-8 z-50 ${isMenuOpen ? 'invisible' : ''}`}
            aria-label="Toggle menu"
          >
            <span className="block w-8 h-0.5 bg-[#1E1E1E] font-semibold"></span>
            <span className="block w-8 h-0.5 bg-[#1E1E1E] font-semibold my-1.5"></span>
            <span className="block w-8 h-0.5 bg-[#1E1E1E] font-semibold"></span>
          </button>
        </div>
      </nav>

      {/* Mobile Full-Screen Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white z-40 md:hidden transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full pt-20 px-6">
          {/* Logo and Close button in overlay */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-end px-6 py-4 border-b border-gray-100">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="flex flex-col justify-center items-center w-8 h-8"
              aria-label="Close menu"
            >
              <span className="block w-6 h-0.5 bg-[#1E1E1E] rotate-45 translate-y-0.5"></span>
              <span className="block w-6 h-0.5 bg-[#1E1E1E] -rotate-45 -translate-y-0.5"></span>
            </button>
          </div>

          {/* Nav Links */}
          <div className="flex flex-col gap-6 mb-auto">
            {(usePublic
              ? LINKS_PUBLIC.map((l) => ({ href: `${PUBLIC_BASE}${l.href}`, label: l.label }))
              : LINKS_LOCAL
            ).map((l) => {
              const rawHref = l.href
              const key = rawHref
              const isExternal = rawHref.startsWith('http')

              if (isExternal) {
                return (
                  <a
                    key={key}
                    href={rawHref}
                    onClick={() => setIsMenuOpen(false)}
                    className={`${isActive(rawHref.replace(PUBLIC_BASE, '')) ? 'text-[#00B75A]' : 'text-gray-700'} text-lg font-medium hover:text-[#059669] transition-colors py-2`}
                  >
                    {l.label}
                  </a>
                )
              }

              return (
                <Link
                  key={key}
                  href={rawHref}
                  onClick={() => setIsMenuOpen(false)}
                  className={`${isActive(rawHref) ? 'text-[#00B75A]' : 'text-gray-700'} text-lg font-medium hover:text-[#059669] transition-colors py-2`}
                  aria-current={isActive(rawHref) ? 'page' : undefined}
                >
                  {l.label}
                </Link>
              )
            })}
          </div>

          {/* Buttons at Bottom */}
          <div className="flex flex-col gap-3 pb-8">
            <button
              onClick={() => {
                setIsMenuOpen(false)
                if (typeof window !== 'undefined' && (window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1') || process.env.NODE_ENV !== 'production')) {
                  window.location.href = '/'
                  return
                }
                window.location.href = 'https://dashboard.swiftlyxpress.com/auth/customer/signup'
              }}
              className="w-full px-6 py-4 bg-[#00B75A] text-white rounded-full text-base font-medium hover:bg-[#059669] transition-colors"
            >
              Book a delivery
            </button>
            <button
              onClick={() => {
                setIsMenuOpen(false)
                if (typeof window !== 'undefined' && (window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1') || process.env.NODE_ENV !== 'production')) {
                  window.location.href = '/'
                  return
                }
                window.location.href = 'https://dashboard.swiftlyxpress.com/auth/role-select'
              }}
              className="w-full px-6 py-4 bg-black text-white rounded-full text-base font-medium hover:bg-gray-800 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
