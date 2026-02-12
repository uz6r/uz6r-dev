import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
    transpilePackages: ["@repo/ui"],
    outputFileTracingRoot: path.join(process.cwd(), "../.."),
};

export default nextConfig;
