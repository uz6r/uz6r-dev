"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, FolderOpen, Home, Mail, User } from "lucide-react";
import {
    CommandDialog,
    CommandInput,
    CommandList,
    CommandGroup,
    CommandItem,
    CommandEmpty,
} from "@repo/ui/command";
import { useCommandPalette } from "@/components/command-palette-context";

const PAGE_LINKS = [
    { href: "/", label: "Home", icon: Home },
    { href: "/projects", label: "Projects", icon: FolderOpen },
    { href: "/blog", label: "Blog", icon: BookOpen },
    { href: "/about", label: "About", icon: User },
    { href: "/contact", label: "Contact", icon: Mail },
] as const;

export function PageCommandPalette() {
    const ctx = useCommandPalette();
    const router = useRouter();

    useEffect(() => {
        if (!ctx) return;
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                ctx.setOpen((o) => !o);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [ctx]);

    if (!ctx) return null;

    const run = (href: string) => {
        router.push(href);
        ctx.setOpen(false);
    };

    return (
        <CommandDialog
            open={ctx.open}
            onOpenChange={ctx.setOpen}
            title="Go to page"
            className="page-command-palette border-0 shadow-none"
        >
            <CommandInput placeholder="Search pages…" />
            <CommandList>
                <CommandEmpty>No page found.</CommandEmpty>
                <CommandGroup heading="Pages">
                    {PAGE_LINKS.map(({ href, label, icon: Icon }) => (
                        <CommandItem key={href} value={label} onSelect={() => run(href)}>
                            <Icon className="size-4" aria-hidden />
                            {label}
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
}
