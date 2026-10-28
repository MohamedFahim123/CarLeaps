import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
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
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/**",
      },
    ],
  },
};
export default nextConfig;
