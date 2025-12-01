"use client"

import React from 'react'

type Props = {
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'dark' | 'light'
  onClick?: () => void
}

export default function Button({ children, className = '', variant = 'primary', onClick }: Props) {
  const base = 'inline-flex items-center justify-center rounded-full'
  const variants: Record<string, string> = {
    primary: 'bg-[#00B75A] text-white',
    dark: 'bg-[#111111] text-white',
    light: 'bg-white text-[#00B75A] border border-gray-200',
  }

  return (
    <button onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  )
}
