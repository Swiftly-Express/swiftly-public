import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us - Get in Touch with Swiftly Express',
  description: 'Contact Swiftly Express for delivery inquiries, customer support, or business partnerships. Reach us via email, phone, or our contact form. We\'re here to help 24/7.',
  keywords: ['contact', 'customer support', 'contact form', 'get in touch', 'help', 'customer service'],
  openGraph: {
    title: 'Contact Us - Swiftly Express',
    description: 'Get in touch with our support team. We\'re here to help with your delivery needs.',
    url: 'https://swiftlyxpress.com/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Contact Us - Swiftly Express',
    description: 'Get in touch with our support team.',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
