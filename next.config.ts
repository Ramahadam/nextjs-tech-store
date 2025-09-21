import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dbzs4nok9/image/upload/**", // 👈 match only your folder
      },
    ],
  },
};

export default nextConfig;
