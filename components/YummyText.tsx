"use client"

import React from 'react'

type Props = {
  children: React.ReactNode
  className?: string
}

export function YummyText({ children, className = '' }: Props) {
  const base = 'bricolage-font'
  return <div className={`${base} ${className}`.trim()}>{children}</div>
}

export default YummyText
