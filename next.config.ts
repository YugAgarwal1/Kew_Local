import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kewelectricals.com',
      },
    ],
  },
};

export default nextConfig;
