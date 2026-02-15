import Link from "next/link";
import { Separator } from "@repo/ui/separator";
import { Container } from "@/components/layout/container";

// Footer intentionally minimal.
// Portfolio prioritises content signal over promotional UI elements.

const BUY_ME_A_COFFEE_URL = "https://buymeacoffee.com/uzer";

export function Footer() {
    return (
        <footer className="py-6">
            <Separator className="mb-6" />
            <Container className="flex flex-col items-center gap-2 text-center text-sm text-muted-foreground sm:flex-row sm:justify-between sm:text-left">
                <span>Uzair Zahari 2026</span>
                <Link
                    href={BUY_ME_A_COFFEE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-foreground underline-offset-2 hover:underline"
                >
                    Buy Me A Coffee
                </Link>
            </Container>
        </footer>
    );
}
