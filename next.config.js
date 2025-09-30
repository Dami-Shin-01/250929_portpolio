/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 15+ 이미지 최적화 설정
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  // React 19 호환성
  reactStrictMode: true,
  // Turbopack 지원 (Next.js 15)
  experimental: {
    turbo: {
      resolveAlias: {
        '@': './src',
      },
    },
  },
}

module.exports = nextConfig
