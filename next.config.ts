import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Apex1",
  assetPrefix: "/Apex1/",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
