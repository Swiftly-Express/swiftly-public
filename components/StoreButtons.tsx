"use client"

import React from 'react'
import Link from 'next/link'

type Props = { className?: string }

export default function StoreButtons({ className = '' }: Props) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Link href="#" className="inline-flex items-center gap-2 px-3 py-2 bg-black text-white rounded-lg">
        <span className="w-5 h-5 bg-white/10 rounded-sm" />
        <span className="text-xs">App Store</span>
      </Link>
      <Link href="#" className="inline-flex items-center gap-2 px-3 py-2 bg-black text-white rounded-lg">
        <span className="w-5 h-5 bg-white/10 rounded-sm" />
        <span className="text-xs">Google Play</span>
      </Link>
    </div>
  )
}
