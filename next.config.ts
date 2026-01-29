import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/harle-devidson",
  assetPrefix: "/harle-devidson/",
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: "/harle-devidson",
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
