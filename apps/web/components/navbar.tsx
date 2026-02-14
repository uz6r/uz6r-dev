import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
] as const;

export function Navbar() {
    return (
        <header className="animate-fade-in border-b opacity-0">
            <Container className="flex items-center justify-between py-3">
                <nav className="flex gap-6 text-sm">
                    {links.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
                        >
                            {label}
                        </Link>
                    ))}
                </nav>
                <ThemeToggle />
            </Container>
        </header>
    );
}
