import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // basePath: '/kevinpatildxd', // Uncomment for GitHub Pages deployment
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
  trailingSlash: true,
};

export default nextConfig;
