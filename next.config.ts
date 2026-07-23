import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "api.dicebear.com" },
      // Azure Blob Storage — wildcard so any storage account under this subscription works.
      { protocol: "https", hostname: "*.blob.core.windows.net" },
    ],
  },
};

export default nextConfig;
