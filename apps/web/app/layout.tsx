import type { Metadata } from "next";
import Script from "next/script";
import { CommandPaletteProvider } from "@/components/command-palette-context";
import { ToastProvider } from "@/components/ui/toast";
import { Footer } from "@/components/layout/footer";
import { A2HSBanner } from "@/components/a2hs-banner";
import { PageCommandPalette } from "@/components/page-command-palette";
import "./globals.css";

// Metadata is written for technical positioning.
// Focus is on backend systems, workflows, and server-side architecture,
// not generic frontend portfolio phrasing.
export const metadata: Metadata = {
    // template automatically prefixes page titles.
    // keeps metadata consistent across routes.
    title: {
        default: "Uzair Zahari",
        template: "%s | Uzair Zahari",
    },
    description:
        "Backend-focused software engineer: APIs, services, and server-side systems. Portfolio of production systems, workflows, and architecture work.",
    manifest: "/manifest.json",
    icons: {
        icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
        apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
    },
    // themeColor keeps mobile browser chrome and status bar consistent with light/dark theme. avoids mismatched top bar.
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "oklch(0.98 0.002 0)" },
        { media: "(prefers-color-scheme: dark)", color: "oklch(0.18 0.008 0)" },
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                {/* External script: same output on server and client, no dangerouslySetInnerHTML hydration mismatch. */}
                <Script src="/theme-init.js" strategy="beforeInteractive" />
            </head>
            {/* suppressHydrationWarning: ignores attributes added by browser extensions (e.g. bis_skin_checked). */}
            <body
                className="root antialiased safe-area-insets bg-background text-foreground"
                suppressHydrationWarning
            >
                <div className="bg-background flex min-h-dvh flex-col" suppressHydrationWarning>
                    <CommandPaletteProvider>
                        <ToastProvider>
                            <div className="min-h-0 flex-1" suppressHydrationWarning>
                                {children}
                            </div>
                            <Footer />
                            <PageCommandPalette />
                            <A2HSBanner />
                        </ToastProvider>
                    </CommandPaletteProvider>
                </div>
            </body>
        </html>
    );
}
