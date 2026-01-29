import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/harle-devidson",
  assetPrefix: "/harle-devidson/",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
