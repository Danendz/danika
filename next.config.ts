import withSerwistInit from "@serwist/next";
import {env} from "@/env/server";

const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  disable: env.APP_ENV !== "production",
})

const nextConfig = withSerwist({
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: env.MINIO_ENDPOINT
      }
    ]
  }
});

export default nextConfig;
