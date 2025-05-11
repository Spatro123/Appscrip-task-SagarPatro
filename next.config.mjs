/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['appscrip-task-Sagar_Patro.netlify.app'],
    unoptimized: true,
  },
  output: 'export',
};

// Use ES module export syntax instead of CommonJS
export default nextConfig;
