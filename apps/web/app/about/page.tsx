import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { Badge } from "@repo/ui/badge";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Navbar } from "@/components/navbar";
import { aboutData } from "@/data/about";

export const metadata = {
    title: "About",
};

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <main>
                <Section>
                    <Container>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">About</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {aboutData.intro}
                                </p>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {aboutData.role}
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                    {aboutData.stack.map((tech) => (
                                        <Badge
                                            key={tech}
                                            variant="secondary"
                                            className="text-xs font-normal"
                                        >
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>
                                <div className="space-y-2 pt-2">
                                    <span className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
                                        Personal
                                    </span>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        {aboutData.personal.athletics}{" "}
                                        {aboutData.personal.interests}
                                    </p>
                                </div>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {aboutData.philosophy}
                                </p>
                                {/* Internal link encourages conversation while keeping navigation within the portfolio. */}
                                <p className="text-muted-foreground pt-2 text-sm leading-relaxed">
                                    <Link
                                        href="/contact"
                                        className="text-foreground underline decoration-muted-foreground/50 underline-offset-2 transition-colors hover:decoration-foreground"
                                    >
                                        I&apos;m always happy to talk.
                                    </Link>
                                </p>
                            </CardContent>
                        </Card>
                    </Container>
                </Section>
            </main>
        </>
    );
}
