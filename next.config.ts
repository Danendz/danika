import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.APP_ENV !== "production",
})

const nextConfig = withSerwist({
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.MINIO_ENDPOINT!
      }
    ]
  }
});

export default nextConfig;
