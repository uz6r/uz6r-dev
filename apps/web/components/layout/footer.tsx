import Link from "next/link";
import { Github, Instagram, Music, Twitter } from "lucide-react";
import { Separator } from "@repo/ui/separator";
import { Container } from "@/components/layout/container";

// Footer intentionally minimal.
// Portfolio prioritises content signal over promotional UI elements.

const BUY_ME_A_COFFEE_URL = "https://buymeacoffee.com/uzer";

const SOCIAL_LINKS = [
    { href: "https://github.com/uz6r", label: "GitHub", icon: Github },
    { href: "https://www.instagram.com/uzairzahari/", label: "Instagram", icon: Instagram },
    { href: "https://x.com/uzairzahari", label: "X (Twitter)", icon: Twitter },
    { href: "https://www.tiktok.com/@uzair.zahari", label: "TikTok", icon: Music },
] as const;

export function Footer() {
    return (
        <footer className="py-6">
            <Separator className="mb-6" />
            <Container className="flex flex-col items-center gap-4 text-center text-sm text-muted-foreground sm:flex-row sm:justify-between sm:text-left">
                <span>Uzair Zahari 2026</span>
                <div className="flex items-center gap-4">
                    {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
                        <Link
                            key={href}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground transition-colors hover:text-foreground"
                            aria-label={label}
                        >
                            <Icon className="size-[18px]" aria-hidden />
                        </Link>
                    ))}
                    <Link
                        href={BUY_ME_A_COFFEE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-foreground underline-offset-2 hover:underline"
                    >
                        Buy Me A Coffee
                    </Link>
                </div>
            </Container>
        </footer>
    );
}
