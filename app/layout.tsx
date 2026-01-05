import '../styles/globals.css'
import React from 'react'
import Layout from '../components/Layout'

export const metadata = {
  metadataBase: new URL('https://swiftlyxpress.com'),
  title: {
    default: 'Swiftly Xpress - Fast, Reliable Delivery Services',
    template: '%s | Swiftly Xpress'
  },
  description: 'Swiftly Xpress offers same-day delivery, next-day shipping, and international courier services. Track your packages in real-time with our reliable delivery solutions.',
  keywords: ['delivery service', 'courier', 'same-day delivery', 'package tracking', 'shipping', 'express delivery', 'international shipping', 'logistics'],
  authors: [{ name: 'Swiftly Xpress' }],
  creator: 'Swiftly Xpress',
  publisher: 'Swiftly Xpress',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Swiftly Xpress - Fast, Reliable Delivery Services',
    description: 'Same-day delivery, next-day shipping, and international courier services. Track your packages in real-time.',
    url: 'https://swiftlyxpress.com',
    siteName: 'Swiftly Xpress',
    images: [
      {
        url: 'https://swiftlyxpress.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Swiftly Xpress Delivery Services',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Swiftly Xpress - Fast, Reliable Delivery Services',
    description: 'Same-day delivery, next-day shipping, and international courier services.',
    images: ['https://swiftlyxpress.com/og-image.png'],
    creator: '@swiftlyxpress',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className="bricolage-font overflow-x-hidden">
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
