import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  devIndicators: false,
  images: {
    domains: ["https://qncwyrdvyqvijlkojljm.supabase.co"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qncwyrdvyqvijlkojljm.supabase.co",
        port: "",
        pathname: "/images/*",
      },
    ],
  },
};

export default nextConfig;
