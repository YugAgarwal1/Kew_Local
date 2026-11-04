import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  compress: true,
  productionBrowserSourceMaps: false,
};

export default nextConfig;
