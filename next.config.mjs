/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Gelato CDN — update domain if needed after checking their actual image host
      {
        protocol: 'https',
        hostname: '**.gelatocdn.com',
      },
      // Printify image CDN
      {
        protocol: 'https',
        hostname: 'images.printify.com',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
      // Placeholder images during development
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
}

export default nextConfig
