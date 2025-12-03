import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Careers - Join the Swiftly Express Team',
  description: 'Explore career opportunities at Swiftly Express. We\'re hiring drivers, logistics coordinators, customer support agents, and tech professionals. Join our growing team.',
  keywords: ['careers', 'jobs', 'hiring', 'employment', 'driver jobs', 'logistics jobs', 'delivery jobs', 'work with us'],
  openGraph: {
    title: 'Careers - Swiftly Express',
    description: 'Join our team. Explore career opportunities in delivery, logistics, customer support, and technology.',
    url: 'https://swiftlyxpress.com/careers',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Careers - Swiftly Express',
    description: 'Join our team. Explore career opportunities at Swiftly Express.',
  },
}

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
