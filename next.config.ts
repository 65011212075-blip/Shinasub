import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Keeps filesystem/page route matching case-sensitive too (belt-and-braces
  // alongside the exact-match legacy redirects in src/proxy.ts).
  experimental: {
    caseSensitiveRoutes: true,
  },
  // three.js add-ons (drei, postprocessing, etc.) ship ESM that Next.js
  // won't transpile by default — required for the 3D hero/rack-view/HQ
  // marker scenes under src/components/three/.
  transpilePackages: ["three"],
};

export default withNextIntl(nextConfig);
