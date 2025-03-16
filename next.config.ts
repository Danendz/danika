import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.MINIO_ENDPOINT!
      }
    ]
  }
};

export default nextConfig;
