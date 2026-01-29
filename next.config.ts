import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Apex1",
  assetPrefix: "/Apex1/",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
