import type { NextConfig } from "next";
import path from "path";

const withPWA = require("@ducanh2912/next-pwa").default({
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    register: true,
    skipWaiting: true,
});

const nextConfig: NextConfig = {
    transpilePackages: ["@repo/ui"],
    outputFileTracingRoot: path.join(process.cwd(), "../.."),
    devIndicators: false,
};

export default withPWA(nextConfig);
