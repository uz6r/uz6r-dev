import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { Badge } from "@repo/ui/badge";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Navbar } from "@/components/navbar";
import { aboutData } from "@/data/about";

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
                                {aboutData.role && (
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        {aboutData.role}
                                    </p>
                                )}
                                {aboutData.stack.length > 0 && (
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
                                )}
                                {aboutData.interests?.length ? (
                                    <div className="pt-2">
                                        <span className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
                                            Interests
                                        </span>
                                        <p className="text-muted-foreground mt-1 text-sm">
                                            {aboutData.interests.join(", ")}.
                                        </p>
                                    </div>
                                ) : null}
                            </CardContent>
                        </Card>
                    </Container>
                </Section>
            </main>
        </>
    );
}
