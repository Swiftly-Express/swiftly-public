import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How It Works - Simple 6-Step Delivery Process',
  description: 'Learn how Swiftly Express works: Create account, enter package details, choose pickup/delivery, secure payment, real-time GPS tracking, and delivery confirmation. Simple, transparent, reliable.',
  keywords: ['how it works', 'delivery process', 'package tracking', 'GPS tracking', 'delivery steps', 'shipping guide'],
  openGraph: {
    title: 'How It Works - Swiftly Express',
    description: 'Six simple steps from booking to delivery. Track your package every step of the way with real-time GPS.',
    url: 'https://swiftlyxpress.com/howitworks',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How It Works - Swiftly Express',
    description: 'Six simple steps from booking to delivery with real-time tracking.',
  },
}

export default function HowItWorksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
