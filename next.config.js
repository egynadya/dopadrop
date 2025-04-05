/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/dopadrop' : '',
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/dopadrop' : '',
  trailingSlash: true,
}

module.exports = nextConfig 