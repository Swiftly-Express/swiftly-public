/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true
  },
  // Expose base URL to client-side via NEXT_PUBLIC_BASE_URL
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'https://swiftlyxpress.com',
  },
  // Simple redirect so `/search` on this app forwards users to the public site search
  async redirects() {
    // Only add the redirect in production builds. During local development we
    // want `/search` to remain local so developers can test the app.
    if (process.env.NODE_ENV !== 'production') return [];
    const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://swiftlyxpress.com'
    return [
      {
        source: '/search',
        destination: `${base}/search`,
        permanent: true,
      },
    ];
  },
  images: {
    // Allow SVG files to be used with next/image
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    
    // Optional: Add formats for better optimization
    formats: ['image/avif', 'image/webp'],
    
    // Optional: Configure image domains if you're using external images
    // domains: ['example.com'],
    
    // Optional: Disable static imports if you want to use only dynamic imports
    // disableStaticImages: false,
  },
}

module.exports = nextConfig;