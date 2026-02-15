"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Container } from "@/components/layout/container";
import { ThemeToggle } from "@/components/theme-toggle";
import { CommandPaletteTrigger } from "@/components/command-palette-trigger";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@repo/ui/drawer";
import { useState } from "react";

const links = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
] as const;

export function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="animate-fade-in border-b opacity-0">
            <Container className="flex items-center justify-between gap-4 py-3">
                {/* Site name (top left, mobile only) */}
                <Link
                    href="/"
                    className="text-foreground md:hidden shrink-0 text-lg font-semibold tracking-tight transition-colors hover:opacity-80"
                    aria-label="Home"
                >
                    Uzair Zahari
                </Link>

                {/* Desktop: horizontal nav + command palette */}
                <nav className="hidden flex-1 items-center gap-6 text-sm md:flex">
                    {links.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
                        >
                            {label}
                        </Link>
                    ))}
                    {/* Spacer; suppressHydrationWarning: browser extensions (e.g. Bitwarden) can inject attributes here. */}
                    <div className="flex-1" suppressHydrationWarning />
                    <CommandPaletteTrigger />
                </nav>

                {/* Mobile: hamburger + theme toggle */}
                <div className="flex flex-1 items-center justify-end gap-2 md:hidden">
                    <button
                        type="button"
                        onClick={() => setMenuOpen(true)}
                        className="text-muted-foreground hover:text-foreground inline-flex size-9 items-center justify-center rounded-md transition-colors"
                        aria-label="Open menu"
                    >
                        <Menu className="size-5" aria-hidden />
                    </button>
                    <ThemeToggle />
                </div>

                {/* Desktop: theme toggle (right) */}
                <div className="hidden md:block">
                    <ThemeToggle />
                </div>
            </Container>

            {/* Mobile nav menu (drawer from left) */}
            <Drawer open={menuOpen} onOpenChange={setMenuOpen} direction="left">
                <DrawerContent className="max-h-full w-[min(100vw-2rem,280px)]">
                    <DrawerHeader>
                        <DrawerTitle>Menu</DrawerTitle>
                    </DrawerHeader>
                    <nav className="flex flex-col gap-1 px-4 pb-6">
                        {links.map(({ href, label }) => (
                            <Link
                                key={href}
                                href={href}
                                onClick={() => setMenuOpen(false)}
                                className="text-muted-foreground hover:text-foreground hover:bg-accent rounded-md px-3 py-2 text-sm font-medium transition-colors"
                            >
                                {label}
                            </Link>
                        ))}
                        <div className="mt-4 border-t border-border pt-4">
                            <CommandPaletteTrigger />
                        </div>
                    </nav>
                    <div className="mt-auto border-t border-border p-4">
                        <DrawerClose className="text-muted-foreground hover:text-foreground w-full rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent">
                            Close
                        </DrawerClose>
                    </div>
                </DrawerContent>
            </Drawer>
        </header>
    );
}
