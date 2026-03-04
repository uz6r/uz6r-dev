import type { NextConfig } from "next";
import path from "path";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    register: true,
    workboxOptions: {
        skipWaiting: true,
    },
});

const nextConfig: NextConfig = {
    transpilePackages: ["@repo/ui"],
    outputFileTracingRoot: path.join(process.cwd(), "../.."),
    devIndicators: false,
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "cdn-images-1.medium.com" },
            { protocol: "https", hostname: "miro.medium.com" },
        ],
    },
};

export default withPWA(nextConfig);
