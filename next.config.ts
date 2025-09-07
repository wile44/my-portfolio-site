import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8055',
        pathname: '/assets/**',
      },
      {
        protocol: 'https',
        hostname: '*.directus.app',
        port: '',
        pathname: '/assets/**',
      },
      {
        protocol: 'https',
        hostname: 'cms.goodluck.it.com',
        port: '',
        pathname: '/assets/**',
      },
    ],
  },
};

export default nextConfig;
