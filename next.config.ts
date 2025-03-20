import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
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
};
export default nextConfig;