/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Opcional: si se usara basePath en deployment
  // basePath: '',
  // assetPrefix: '',
}

module.exports = nextConfig;