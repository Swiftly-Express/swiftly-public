import '../styles/globals.css'
import React from 'react'
import Layout from '../components/Layout'

export const metadata = {
  title: 'Swiftly Express',
  description: 'Swiftly Express public site',
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
