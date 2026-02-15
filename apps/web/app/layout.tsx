import type { Metadata } from "next";
import { ToastProvider } from "@/components/ui/toast";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

// Metadata is written for technical positioning.
// Focus is on backend systems, workflows, and server-side architecture,
// not generic frontend portfolio phrasing.
export const metadata: Metadata = {
    title: "Uzair Zahari",
    description:
        "Backend-focused software engineer: APIs, services, and server-side systems. Portfolio of production systems, workflows, and architecture work.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
              (function() {
                const v = localStorage.getItem('theme');
                const m = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const dark = v === 'dark' || (!v && m);
                if (dark) document.documentElement.classList.add('dark');
                else document.documentElement.classList.remove('dark');
              })();
            `,
                    }}
                />
            </head>
            <body className="root antialiased safe-area-insets">
                <ToastProvider>
                    {children}
                    <Footer />
                </ToastProvider>
            </body>
        </html>
    );
}
