import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - Delivery Tips, News & Industry Insights',
  description: 'Read the latest from Swiftly Xpress: delivery tips, shipping guides, industry news, logistics insights, and updates on our services.',
  keywords: ['blog', 'delivery tips', 'shipping news', 'logistics blog', 'industry insights', 'delivery guides'],
  openGraph: {
    title: 'Blog - Swiftly Xpress',
    description: 'Delivery tips, shipping guides, and industry insights from Swiftly Xpress.',
    url: 'https://swiftlyxpress.com/blog',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Swiftly Xpress',
    description: 'Delivery tips, shipping guides, and industry insights.',
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
