import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Delivery Services - Same Day, Next Day & International Shipping',
  description: 'Explore our comprehensive delivery services: same-day express, next-day delivery, scheduled shipping, international courier, secure delivery, and business solutions. Reliable, affordable, and tracked.',
  keywords: ['delivery services', 'same day delivery', 'next day shipping', 'international shipping', 'courier service', 'package delivery', 'business delivery solutions'],
  openGraph: {
    title: 'Delivery Services - Swiftly Express',
    description: 'Same-day delivery, next-day shipping, international courier, and business solutions. Choose the service that fits your needs.',
    url: 'https://swiftlyxpress.com/services',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Delivery Services - Swiftly Express',
    description: 'Same-day delivery, next-day shipping, international courier, and business solutions.',
  },
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
