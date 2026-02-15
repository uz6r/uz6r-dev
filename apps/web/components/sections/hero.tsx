import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

interface HeroProps {
    title: string;
    headline: string;
    bio: string;
}

export function Hero({ title, headline, bio }: HeroProps) {
    return (
        <Section className="border-b">
            <Container>
                <div className="flex flex-col gap-2">
                    <h1
                        className="animate-fade-in-up flex items-center gap-2 text-2xl font-semibold tracking-tight opacity-0 md:text-3xl"
                        style={{ animationDelay: "100ms" }}
                    >
                        <span aria-hidden>👋</span>
                        {title}
                    </h1>
                    <p
                        className="animate-fade-in-up text-muted-foreground text-lg opacity-0"
                        style={{ animationDelay: "200ms" }}
                    >
                        {headline}
                    </p>
                    <p
                        className="animate-fade-in-up text-muted-foreground mt-2 max-w-xl text-sm leading-relaxed opacity-0"
                        style={{ animationDelay: "300ms" }}
                    >
                        {bio}
                    </p>
                </div>
            </Container>
        </Section>
    );
}
