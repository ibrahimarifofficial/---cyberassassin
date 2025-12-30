const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: 'madebydesignesia.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
    domains: ['localhost', 'res.cloudinary.com'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    unoptimized: false,
  },
  
  // Compression
  compress: true,
  
  // Security headers
  poweredByHeader: false,
  
  // Minification
  swcMinify: true,
  
  // Production optimizations
  productionBrowserSourceMaps: false,
  
  // Performance optimizations
  experimental: {
    // optimizeCss: true, // Disabled - requires critters package
  },
  
  // Webpack configuration for path aliases and optimizations
  webpack: (config, { dev, isServer }) => {
    const alias = config.resolve.alias || {}
    alias['@'] = path.resolve(__dirname)
    config.resolve.alias = alias
    
    // Production optimizations
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: 10,
              reuseExistingChunk: true,
            },
          },
        },
      }
    }
    
    return config
  },
}

module.exports = nextConfig

