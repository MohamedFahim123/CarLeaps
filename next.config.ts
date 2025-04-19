import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.carleaps.com",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "admin.carleaps.com",
        pathname: "/admin/img/default/**",
      },
    ],
  },
  experimental: {
    turbo: {},
  },
};
export default nextConfig;
