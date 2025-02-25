import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "validcars.valureach.com",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "validcars.valureach.com",
        pathname: "/admin/img/default/**",
      },
    ],
  },
};
export default nextConfig;