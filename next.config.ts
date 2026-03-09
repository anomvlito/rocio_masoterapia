import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Fix: multiple package-lock.json files confuse Next.js workspace detection
  outputFileTracingRoot: path.join(__dirname),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
