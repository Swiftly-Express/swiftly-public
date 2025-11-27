"use client"

import React from 'react'

type Props = {
  children: React.ReactNode
  className?: string
}

export default function PageWrapper({ children, className = '' }: Props) {
  return <div className={`max-w-7xl mx-auto ${className}`}>{children}</div>
}
