import { Button } from "@repo/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function HomePage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-12 p-8">
            <div className="absolute right-4 top-4">
                <ThemeToggle />
            </div>

            <div className="flex flex-col items-center gap-6">
                <h1 className="text-2xl font-bold">Hello</h1>
                <p className="text-muted-foreground">Portfolio under construction</p>

                <div className="flex flex-wrap justify-center gap-3">
                    <Button>Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="tertiary">Tertiary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                    <Button variant="destructive">Destructive</Button>
                </div>

                <div className="flex flex-wrap justify-center gap-3">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                </div>
            </div>
        </main>
    );
}
