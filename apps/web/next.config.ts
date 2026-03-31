import type { NextConfig } from "next";
import path from "path";
import withPWAInit from "@ducanh2912/next-pwa";
import { withSentryConfig } from "@sentry/nextjs";

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

const sentryWebpackPluginOptions = {
    org: process.env.SENTRY_ORG || "uz6r",
    project: process.env.SENTRY_PROJECT || "web",
    silent: !process.env.CI,
    widenClientFileUpload: true,
    hideSourceMaps: true,
    debug: false,
};

const withSentry = withSentryConfig(nextConfig, sentryWebpackPluginOptions);

export default withPWA(withSentry);
