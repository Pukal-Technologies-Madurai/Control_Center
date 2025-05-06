/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // distDir: "data",
  reactStrictMode: true,
  // output: "export", // Add this for static exports
  images: {
    unoptimized: true, // Required for static exports
    minimumCacheTTL: 60, // Recommended to have some caching
    remotePatterns: [
      {
        protocol: process.env.IMG_PROTOCOL || 'http',
        hostname: process.env.IMG_HOST || 'localhost',
        port: process.env.IMG_PORT || '3001',
        pathname: '/**',
      }
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, 
  },
  trailingSlash: true,
  // Optional: Consider using these for runtime configuration
  // publicRuntimeConfig: {
  //   apiUrl: process.env.NODE_ENV === 'development'
  //     ? "http://localhost:3001"
  //     : process.env.API_URL,
  // }
}

module.exports = nextConfig;