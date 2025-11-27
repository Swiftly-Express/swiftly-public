import Link from 'next/link'
import React from 'react'

export default function Footer() {
  const links = [
    { href: '/careers', label: 'Careers' },
    { href: '/blog', label: 'Blog' },
    { href: '/cookie-policy', label: 'Cookie Policy' },
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms-of-service', label: 'Terms of Service' },
  ]

  return (
    <footer className="bg-brand-black text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8 grid md:flex md:items-center md:justify-between">
        <div>
          <div className="text-lg font-bold">Swiftly Express</div>
          <div className="text-sm text-brand-black-light text-white/70">Fast and reliable deliveries.</div>
        </div>
        <div className="mt-4 md:mt-0 flex flex-wrap gap-4">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-white/80 hover:text-white">{l.label}</Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
