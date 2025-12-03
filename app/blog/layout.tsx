import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - Delivery Tips, News & Industry Insights',
  description: 'Read the latest from Swiftly Express: delivery tips, shipping guides, industry news, logistics insights, and updates on our services.',
  keywords: ['blog', 'delivery tips', 'shipping news', 'logistics blog', 'industry insights', 'delivery guides'],
  openGraph: {
    title: 'Blog - Swiftly Express',
    description: 'Delivery tips, shipping guides, and industry insights from Swiftly Express.',
    url: 'https://swiftlyxpress.com/blog',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Swiftly Express',
    description: 'Delivery tips, shipping guides, and industry insights.',
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
