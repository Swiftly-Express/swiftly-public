import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Smart Ride - On-Demand Delivery & Ride Services',
  description: 'Experience Smart Ride by Swiftly Express: on-demand delivery, ride-hailing, and logistics solutions. Fast, efficient, and technology-driven transportation services.',
  keywords: ['smart ride', 'on-demand delivery', 'ride hailing', 'logistics', 'transportation service', 'courier on demand'],
  openGraph: {
    title: 'Smart Ride - Swiftly Express',
    description: 'On-demand delivery and ride services powered by smart technology. Fast, efficient, and reliable.',
    url: 'https://swiftlyxpress.com/smartride',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smart Ride - Swiftly Express',
    description: 'On-demand delivery and ride services powered by smart technology.',
  },
}

export default function SmartRideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
