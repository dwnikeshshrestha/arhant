import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  serverExternalPackages: ["mssql", "msnodesqlv8"],
};

export default nextConfig;
