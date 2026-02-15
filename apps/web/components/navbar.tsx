import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ThemeToggle } from "@/components/theme-toggle";
import { CommandPaletteTrigger } from "@/components/command-palette-trigger";

const links = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
] as const;

export function Navbar() {
    return (
        <header className="animate-fade-in border-b opacity-0">
            <Container className="flex items-center justify-between gap-4 py-3">
                <nav className="flex flex-1 items-center gap-6 text-sm">
                    {links.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
                        >
                            {label}
                        </Link>
                    ))}
                    <div className="hidden flex-1 sm:block" />
                    <CommandPaletteTrigger />
                </nav>
                <ThemeToggle />
            </Container>
        </header>
    );
}
