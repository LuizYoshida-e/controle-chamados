import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Turbopack's ESM interop breaks mongodb-connection-string-url, which the Mongo runtime imports.
  serverExternalPackages: ["@prisma/orm-mongo"],
};

export default nextConfig;
