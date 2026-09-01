import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Recommended by Microsoft for Azure Static Web Apps' hybrid Next.js deploy
  // (https://learn.microsoft.com/azure/static-web-apps/deploy-nextjs-hybrid#enable-standalone-feature) —
  // packages a trimmed, self-contained server bundle for the managed Functions
  // backend instead of shipping the full node_modules tree.
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "api.dicebear.com" },
      // Azure Blob Storage — wildcard so any storage account under this subscription works.
      { protocol: "https", hostname: "*.blob.core.windows.net" },
    ],
  },
};

export default nextConfig;
