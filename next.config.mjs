/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // If your GitHub Pages site is hosted at username.github.io/portfolio
  // uncomment the line below and replace 'portfolio' with your repo name
  basePath: '/Portfolio-Ausaaf',
  assetPrefix: '/Portfolio-Ausaaf/',
  trailingSlash: true,
}

export default nextConfig
