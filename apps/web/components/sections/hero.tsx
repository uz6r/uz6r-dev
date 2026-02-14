import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

interface HeroProps {
    name: string;
    headline: string;
    bio: string;
}

export function Hero({ name, headline, bio }: HeroProps) {
    return (
        <Section className="border-b">
            <Container>
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">{name}</h1>
                    <p className="text-muted-foreground text-lg">{headline}</p>
                    <p className="text-muted-foreground mt-2 max-w-xl text-sm leading-relaxed">
                        {bio}
                    </p>
                </div>
            </Container>
        </Section>
    );
}
