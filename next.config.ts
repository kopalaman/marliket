import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        hostname: "randomuser.me",
      },
      {
        hostname: "s3.amazonaws.com",
      },
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "assets.aceternity.com",
      },
      {
        hostname: "picsum.photos",
      },
    ],
  },
}

export default nextConfig
