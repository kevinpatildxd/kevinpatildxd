import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/kevinpatildxd',
  assetPrefix: '/kevinpatildxd/',
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
  trailingSlash: true,
};

export default nextConfig;
