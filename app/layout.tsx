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
      <body className="bricolage-font">
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
